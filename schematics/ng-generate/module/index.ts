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

import { strings, normalize, experimental, Path } from '@angular-devkit/core';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  addImportToModule,
  addRouteDeclarationToModule,
} from '@schematics/angular/utility/ast-utils';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';

import { Schema as ModuleOptions } from './schema';
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

export default function(options: ModuleOptions): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    if (options.module) {
      options.module = findModuleFromOptions(host, options);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    // let routingModulePath: Path | undefined;
    // const isLazyLoadedModuleGen = options.route && options.module;
    // if (isLazyLoadedModuleGen) {
    //   options.routingScope = RoutingScope.Child;
    //   routingModulePath = getRoutingModulePath(host, options);
    // }

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
    const moduleDasherized = strings.dasherize(options.name);
    const modulePath = `${
      !options.flat ? moduleDasherized + '/' : ''
    }${moduleDasherized}.module.ts`;

    const isLazyLoadedModuleGen = false;

    return chain([
      !isLazyLoadedModuleGen ? addDeclarationToNgModule(options) : noop(),
      mergeWith(templateSource),
    ]);
  };
}
