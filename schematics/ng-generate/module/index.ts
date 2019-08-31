import {
  Rule,
  Tree,
  SchematicsException,
  apply,
  url,
  move,
  chain,
  mergeWith,
  template,
  noop,
} from '@angular-devkit/schematics';

import { strings, normalize, Path } from '@angular-devkit/core';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  addImportToModule,
  addRouteDeclarationToModule,
} from '@schematics/angular/utility/ast-utils';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';

import { Schema as ModuleOptions, RoutingScope } from './schema';
import { InsertChange } from '@schematics/angular/utility/change';

function buildRelativeModulePath(options: ModuleOptions, modulePath: string): string {
  const importModulePath = normalize(
    `/${options.path}/` +
      (options.flat ? '' : strings.dasherize(options.name) + '/') +
      strings.dasherize(options.name) +
      '.module'
  );
  return buildRelativePath(modulePath, importModulePath);
}

function addDeclarationToNgModule(options: ModuleOptions): Rule {
  return (host: Tree) => {
    if (!options.module) {
      return host;
    }

    const modulePath = options.module;

    const text = host.read(modulePath);

    if (text === null) {
      throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString();
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const relativePath = buildRelativeModulePath(options, modulePath);
    const changes = addImportToModule(
      source,
      modulePath,
      strings.classify(`${options.name}Module`),
      relativePath
    );

    const recorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);

    return host;
  };
}

function buildRoute(options: ModuleOptions, modulePath: string) {
  const relativeModulePath = buildRelativeModulePath(options, modulePath);
  const moduleName = `${strings.classify(options.name)}Module`;
  const loadChildren = `() => import('${relativeModulePath}').then(m => m.${moduleName})`;

  return `{ path: '${options.route}', loadChildren: ${loadChildren} }`;
}

function addRouteDeclarationToNgModule(
  options: ModuleOptions,
  routingModulePath: Path | undefined
): Rule {
  return (host: Tree) => {
    if (!options.route) {
      return host;
    }
    if (!options.module) {
      throw new Error('Module option required when creating a lazy loaded routing module.');
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

    const sourceText = text.toString();
    const addDeclaration = addRouteDeclarationToModule(
      ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true),
      path,
      buildRoute(options, options.module)
    ) as InsertChange;
    // console.log(addDeclaration);
    const recorder = host.beginUpdate(path);
    recorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
    host.commitUpdate(recorder);

    return host;
  };
}

function getRoutingModulePath(host: Tree, options: ModuleOptions): Path | undefined {
  let path: Path | undefined;
  const modulePath = options.module as string;

  // Fix modulePath `/src/app/*/*-routing.module.ts` -> `/*/*-routing.module.ts`
  let routingModuleName = modulePath.split('.')[0] + '-routing';
  if (options.path) {
    routingModuleName = routingModuleName.replace(options.path, '');
  }
  const { module, ...rest } = options;

  try {
    path = findModuleFromOptions(host, { module: routingModuleName, ...rest });
  } catch {}

  return path;
}

export default function(options: ModuleOptions): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    // As following, the modulePath has become 'src/app/...'
    if (options.module) {
      options.module = findModuleFromOptions(host, options);
    }

    // Set default route
    options.route = options.route || options.name;
    let routingModulePath: Path | undefined;
    const isLazyLoadedModuleGen = options.route && options.module;
    if (isLazyLoadedModuleGen) {
      options.routingScope = RoutingScope.Child;
      routingModulePath = getRoutingModulePath(host, options);
    }

    // Set default path
    options.path = options.path + '/routes';
    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./files'), [
      // options.routing || (isLazyLoadedModuleGen && !!routingModulePath)
      //   ? noop()
      //   : filter(path => !path.endsWith('-routing.module.ts.template')),
      template({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        // lazyRoute: isLazyLoadedModuleGen,
        // lazyRouteWithoutRouteModule: isLazyLoadedModuleGen && !routingModulePath,
        // lazyRouteWithRouteModule: isLazyLoadedModuleGen && routingModulePath,
        ...options,
      }),
      move(parsedPath.path),
    ]);
    // const moduleDasherized = strings.dasherize(options.name);
    // const modulePath = `${
    //   !options.flat ? moduleDasherized + '/' : ''
    // }${moduleDasherized}.module.ts`;

    return chain([
      !isLazyLoadedModuleGen ? addDeclarationToNgModule(options) : noop(),
      addRouteDeclarationToNgModule(options, routingModulePath),
      mergeWith(templateSource),
    ]);
  };
}
