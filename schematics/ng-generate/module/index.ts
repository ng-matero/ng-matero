import { normalize, Path, strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {
  getProjectFromWorkspace,
  getProjectMainFile,
  isStandaloneApp,
} from '@angular/cdk/schematics';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { createDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';
import { addRouteDeclarationToModule } from '../../utils';
import { Schema as ModuleOptions, RoutingScope } from './schema';

function buildRelativeModulePath(options: ModuleOptions, modulePath: string): string {
  const importModulePath = normalize(
    `/${options.path}/` +
      (options.flat ? '' : strings.dasherize(options.name) + '/') +
      strings.dasherize(options.name) +
      (options.standalone ? '.routes' : options.typeSeparator + 'module')
  );
  return buildRelativePath(modulePath, importModulePath);
}

function buildRoute(options: ModuleOptions, modulePath: string) {
  const relativeModulePath = buildRelativeModulePath(options, modulePath);
  const moduleName = options.standalone ? `routes` : `${strings.classify(options.name)}Module`;
  const loadChildren = `() => import('${relativeModulePath}').then(m => m.${moduleName})`;

  return `    { path: '${options.route}', loadChildren: ${loadChildren} }`;
}

function addRouteDeclarationToNgModule(options: ModuleOptions, routingModulePath?: Path): Rule {
  return (host: Tree) => {
    if (!options.route) {
      return host;
    }
    if (!options.module) {
      throw new Error('Module option required when creating a lazy loaded routing module.');
    }

    let filePath: string;
    if (routingModulePath) {
      filePath = routingModulePath;
    } else {
      filePath = options.module;
    }

    const text = host.read(filePath);
    if (!text) {
      throw new Error(`Couldn't find the module nor its routing module.`);
    }

    const sourceText = text.toString();
    const addDeclaration = addRouteDeclarationToModule(
      ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true),
      filePath,
      buildRoute(options, options.module),
      options.standalone
    ) as InsertChange;

    const recorder = host.beginUpdate(filePath);
    recorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
    host.commitUpdate(recorder);

    return host;
  };
}

function getRoutingModulePath(host: Tree, options: ModuleOptions): Path | undefined {
  let path: Path | undefined;
  let routingModuleName = options.module!.split(options.typeSeparator!)[0] + '-routing';
  // Fix `routingModuleName`
  // (i.e. `/src/app/module/module-routing.module.ts` -> `/module/module-routing.module.ts`)
  if (options.path) {
    routingModuleName = routingModuleName.replace(options.path, '');
  }
  const { module, ...rest } = options;

  try {
    path = findModuleFromOptions(host, { module: routingModuleName, ...rest });
  } catch (e) {
    console.error(e);
  }

  return path;
}

export default function (options: ModuleOptions): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFilePath = getProjectMainFile(project);

    options.standalone = isStandaloneApp(host, mainFilePath);

    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    const appPath = options.path;

    // Set default path
    options.path = `${appPath}/${options.moduleRoot}`;
    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    // Set default route and module
    options.route = options.route || options.name;
    options.module = options.module || options.moduleRoot;

    if (options.standalone) {
      options.module = appPath + '/app.routes.ts';

      return chain([
        addRouteDeclarationToNgModule(options),
        mergeWith(
          apply(url('./files/standalone-files'), [
            applyTemplates({
              ...strings,
              'if-flat': (s: string) => (options.flat ? '' : s),
              ...options,
            }),
            move(parsedPath.path),
          ])
        ),
      ]);
    }

    // As following, the modulePath has become `src/app/...`
    options.module = findModuleFromOptions(host, options);

    let routingModulePath: Path | undefined;
    const isLazyLoadedModuleGen = options.route && options.module; // must be true
    if (isLazyLoadedModuleGen) {
      options.routingScope = RoutingScope.Child;
      routingModulePath = getRoutingModulePath(host, options);
    }

    const templateSource = apply(url('./files/module-files'), [
      // options.routing || (isLazyLoadedModuleGen && !!routingModulePath)
      //   ? noop()
      //   : filter(path => !path.endsWith('-routing.module.ts.template')),
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        // lazyRoute: isLazyLoadedModuleGen,
        // lazyRouteWithoutRouteModule: isLazyLoadedModuleGen && !routingModulePath,
        // lazyRouteWithRouteModule: isLazyLoadedModuleGen && routingModulePath,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    return chain([
      addRouteDeclarationToNgModule(options, routingModulePath),
      mergeWith(templateSource),
    ]);
  };
}
