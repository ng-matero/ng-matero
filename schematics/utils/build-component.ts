import { strings, template as interpolateTemplate, Path } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { FileSystemSchematicContext } from '@angular-devkit/schematics/tools';
import { Schema, Style } from '@schematics/angular/component/schema';
import {
  insertAfterLastOccurrence,
  insertImport,
  findNode,
  addRouteDeclarationToModule,
  addExportToModule,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector } from '@schematics/angular/utility/validation';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { readFileSync, statSync } from 'fs';
import { dirname, join, resolve } from 'path';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { getDefaultComponentOptions, getProjectFromWorkspace } from '@angular/cdk/schematics';

export interface ComponentOptions extends Schema {
  entryComponent?: any;
  moduleRoot?: string;
  pageName: string;
}

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
function buildDefaultPath(project: ProjectDefinition): string {
  const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`;
  const projectDirName = project.extensions.projectType === ProjectType.Application ? 'app' : 'lib';
  return `${root}${projectDirName}`;
}

/**
 * List of style extensions which are CSS compatible. All supported CLI style extensions can be
 * found here: angular/angular-cli/master/packages/schematics/angular/ng-new/schema.json#L118-L122
 */
const supportedCssExtensions = ['css', 'scss', 'less'];

function buildRelativeComponentPath(options: ComponentOptions, modulePath: string): string {
  const componentPath =
    `/${options.path}/` +
    (options.flat ? '' : strings.dasherize(options.name) + '/') +
    strings.dasherize(options.name) +
    '.component';

  return buildRelativePath(modulePath, componentPath);
}

function readIntoSourceFile(host: Tree, modulePath: string) {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }

  return ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
}

/**
 * Add a new component to a declaration array (e.g. `COMPONENTS`)
 */
function addComponent(host: Tree, modulePath: string, fileName: string, symbolName: string) {
  const source = readIntoSourceFile(host, modulePath);

  const node = findNode(source, ts.SyntaxKind.Identifier, symbolName);
  if (!node) {
    throw new Error(`Couldn't find a ${symbolName} declaration in '${modulePath}'.`);
  }
  const nodeArr = (node.parent as any).initializer as ts.ArrayLiteralExpression;

  // Whether the declaration added needs a comma...
  const occurencesCount = nodeArr.elements.length;
  const text = node.getFullText(source);

  let componentName: string = fileName;
  if (occurencesCount > 0) {
    const identation = text.match(/\r?\n(\r?)\s*/) || [];
    componentName = `,${identation[0] || ' '}${fileName}`;
  }

  const addDeclaration = insertAfterLastOccurrence(
    nodeArr.elements as unknown as ts.Node[],
    componentName,
    modulePath,
    nodeArr.elements.pos,
    ts.SyntaxKind.Identifier
  ) as InsertChange;

  const record = host.beginUpdate(modulePath);
  record.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
  host.commitUpdate(record);
}

/**
 * Add a import declaration (i.e. insert `import ... from ...`)
 */
function addImportDeclaration(host: Tree, modulePath: string, fileName: string, filePath: string) {
  const source = readIntoSourceFile(host, modulePath);
  const changes = insertImport(source as any, modulePath, fileName, filePath);
  const declarationRecorder = host.beginUpdate(modulePath);

  if (changes instanceof InsertChange) {
    declarationRecorder.insertLeft(changes.pos, changes.toAdd);
  }

  host.commitUpdate(declarationRecorder);
}

/**
 * Add export declaration
 */
function addExportToNgModule(host: Tree, modulePath: string, fileName: string, filePath: string) {
  // Need to refresh the AST because we overwrote the file in the host.
  const source = readIntoSourceFile(host, modulePath);

  const exportRecorder = host.beginUpdate(modulePath);
  const exportChanges = addExportToModule(source, modulePath, fileName, filePath);

  for (const change of exportChanges) {
    if (change instanceof InsertChange) {
      exportRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(exportRecorder);
}

/**
 * build selector with page name
 */
function buildSelector(options: ComponentOptions, projectPrefix?: string) {
  let selector = options.pageName;
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  } else if (options.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}

/**
 * Build page name with module and name
 */
function buildPageName(options: ComponentOptions) {
  const tempNameArr = [];
  if (options.module) {
    tempNameArr.push(options.module);
  }
  tempNameArr.push(...options.name.split('/'));
  return tempNameArr.join('-');
}

/**
 * Add declarations to module
 */
function addDeclarationToNgModule(options: ComponentOptions): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module) {
      return host;
    }

    const modulePath = options.module;
    const relativePath = buildRelativeComponentPath(options, modulePath);
    const classifiedName = strings.classify(`${options.pageName}Component`);

    addImportDeclaration(host, modulePath, classifiedName, relativePath);

    if (!options.entryComponent) {
      addComponent(host, modulePath, classifiedName, 'COMPONENTS');
    } else {
      addComponent(host, modulePath, classifiedName, 'COMPONENTS_DYNAMIC');
    }

    if (options.export) {
      addExportToNgModule(host, modulePath, classifiedName, relativePath);
    }

    return host;
  };
}

/**
 * Add a new component route declaration
 */
function addRouteDeclarationToNgModule(options: ComponentOptions, routingModulePath: Path): Rule {
  return (host: Tree) => {
    if (!options.module) {
      throw new Error('Module option required.');
    }

    let path: string;
    if (routingModulePath) {
      path = routingModulePath;
    } else {
      path = options.module;
    }

    const text = host.read(path);
    if (!text) {
      throw new Error(`Couldn't find the module nor its routing module.`);
    }

    const relativePath = buildRelativeComponentPath(options, routingModulePath);
    const classifiedName = strings.classify(`${options.pageName}Component`);

    if (!options.entryComponent) {
      addImportDeclaration(host, routingModulePath, classifiedName, relativePath);

      // Update component routes array
      const source = readIntoSourceFile(host, routingModulePath);
      const componentRoute = `{ path: '${options.name}', component: ${classifiedName} }`;
      const addDeclaration = addRouteDeclarationToModule(
        source,
        path,
        componentRoute
      ) as InsertChange;

      const recorder = host.beginUpdate(path);
      recorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
      host.commitUpdate(recorder);
    }

    return host;
  };
}

/**
 * Indents the text content with the amount of specified spaces. The spaces will be added after
 * every line-break. This utility function can be used inside of EJS templates to properly
 * include the additional files.
 */
function indentTextContent(text: string, numSpaces: number): string {
  // In the Material project there should be only LF line-endings, but the schematic files
  // are not being linted and therefore there can be also CRLF or just CR line-endings.
  return text.replace(/(\r\n|\r|\n)/g, `$1${' '.repeat(numSpaces)}`);
}

/**
 * Rule that copies and interpolates the files that belong to this schematic context. Additionally
 * a list of file paths can be passed to this rule in order to expose them inside the EJS
 * template context.
 *
 * This allows inlining the external template or stylesheet files in EJS without having
 * to manually duplicate the file content.
 */
export function buildComponent(
  options: ComponentOptions | any,
  additionalFiles: { [key: string]: string } = {}
): Rule {
  return async (host: Tree, context: FileSystemSchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const defaultComponentOptions: any = getDefaultComponentOptions(project);

    // TODO(devversion): Remove if we drop support for older CLI versions.
    // This handles an unreported breaking change from the @angular-devkit/schematics. Previously
    // the description path resolved to the factory file, but starting from 6.2.0, it resolves
    // to the factory directory.
    const schematicPath = statSync(context.schematic.description.path).isDirectory()
      ? context.schematic.description.path
      : dirname(context.schematic.description.path);

    const schematicFilesUrl = './files';
    const schematicFilesPath = resolve(schematicPath, schematicFilesUrl);

    // Add the default component option values to the options if an option is not explicitly
    // specified but a default component option is available.
    Object.keys(options)
      .filter(optionName => options[optionName] == null && defaultComponentOptions[optionName])
      .forEach(optionName => (options[optionName] = defaultComponentOptions[optionName]));

    if (options.path === undefined) {
      // TODO(jelbourn): figure out if the need for this `as any` is a bug due to two different
      // incompatible `WorkspaceProject` classes in @angular-devkit
      options.path = buildDefaultPath(project as any);
      // Fix default path (i.e. `src/app/routes/{{modulePath}}`)
      options.path += `/${options.moduleRoot}/` + options.module;
    }

    options.pageName = buildPageName(options) || '';

    options.module = findModuleFromOptions(host, options);

    // Route module path
    const routingModulePath = options.module.replace('.module', '-routing.module');

    const parsedPath = parseName(options.path!, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector = options.selector || buildSelector(options, project.prefix);

    validateHtmlSelector(options.selector!);

    // In case the specified style extension is not part of the supported CSS supersets,
    // we generate the stylesheets with the "css" extension. This ensures that we don't
    // accidentally generate invalid stylesheets (e.g. drag-drop-comp.styl) which will
    // break the Angular CLI project. See: https://github.com/angular/components/issues/15164
    if (!supportedCssExtensions.includes(options.style!)) {
      // TODO: Cast is necessary as we can't use the Style enum which has been introduced
      // within CLI v7.3.0-rc.0. This would break the schematic for older CLI versions.
      options.style = 'css' as Style;
    }

    // Object that will be used as context for the EJS templates.
    const baseTemplateContext = {
      ...strings,
      'if-flat': (s: string) => (options.flat ? '' : s),
      ...options,
    };

    // Key-value object that includes the specified additional files with their loaded content.
    // The resolved contents can be used inside EJS templates.
    const resolvedFiles: any = {};

    for (const key in additionalFiles) {
      if (additionalFiles[key]) {
        const fileContent = readFileSync(join(schematicFilesPath, additionalFiles[key]), 'utf-8');

        // Interpolate the additional files with the base EJS template context.
        resolvedFiles[key] = interpolateTemplate(fileContent)(baseTemplateContext);
      }
    }

    const templateSource = apply(url(schematicFilesUrl), [
      options.skipTests ? filter(path => !path.endsWith('.spec.ts.template')) : noop(),
      options.inlineStyle ? filter(path => !path.endsWith('.__style__.template')) : noop(),
      options.inlineTemplate ? filter(path => !path.endsWith('.html.template')) : noop(),
      // Treat the template options as any, because the type definition for the template options
      // is made unnecessarily explicit. Every type of object can be used in the EJS template.
      applyTemplates({ indentTextContent, resolvedFiles, ...baseTemplateContext } as any),
      // TODO(devversion): figure out why we cannot just remove the first parameter
      // See for example: angular-cli#schematics/angular/component/index.ts#L160
      move(null as any, parsedPath.path),
    ]);

    return () =>
      chain([
        branchAndMerge(
          chain([
            addDeclarationToNgModule(options),
            addRouteDeclarationToNgModule(options, routingModulePath),
            mergeWith(templateSource),
          ])
        ),
      ])(host, context);
  };
}
