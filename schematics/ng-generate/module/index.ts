import {
  Rule,
  Tree,
  apply,
  url,
  move,
  chain,
  mergeWith,
  applyTemplates,
} from '@angular-devkit/schematics';
import { strings, normalize, Path } from '@angular-devkit/core';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';
import { InsertChange } from '@schematics/angular/utility/change';

import { Schema as ModuleOptions, RoutingScope } from './schema';

import { addRouteDeclarationToModule } from '../../utils';

function buildRelativeModulePath(options: ModuleOptions, modulePath: string): string {
  const importModulePath = normalize(
    `/${options.path}/` +
      (options.flat ? '' : strings.dasherize(options.name) + '/') +
      strings.dasherize(options.name) +
      '.module'
  );
  return buildRelativePath(modulePath, importModulePath);
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

    const recorder = host.beginUpdate(path);
    recorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
    host.commitUpdate(recorder);

    return host;
  };
}

function getRoutingModulePath(host: Tree, options: ModuleOptions): Path | undefined {
  let path: Path | undefined;
  const modulePath = options.module as string;
  let routingModuleName = modulePath.split('.')[0] + '-routing';
  // Fix routingModuleName
  // (i.e. `/src/app/module/module-routing.module.ts` -> `/module/module-routing.module.ts`)
  if (options.path) {
    routingModuleName = routingModuleName.replace(options.path, '');
  }
  const { module, ...rest } = options;

  try {
    path = findModuleFromOptions(host, { module: routingModuleName, ...rest });
  } catch {
    /** */
  }

  return path;
}

export default function (options: ModuleOptions): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    // Set default path
    options.path = options.path + `/${options.moduleRoot}`;
    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    if (!options.module) {
      options.module = options.moduleRoot;
    }
    // As following, the modulePath has become 'src/app/...'
    options.module = findModuleFromOptions(host, options);

    // Set default route
    options.route = options.route || options.name;
    let routingModulePath: Path | undefined;
    const isLazyLoadedModuleGen = options.route && options.module; // must be true
    if (isLazyLoadedModuleGen) {
      options.routingScope = RoutingScope.Child;
      routingModulePath = getRoutingModulePath(host, options);
    }

    const templateSource = apply(url('./files'), [
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
