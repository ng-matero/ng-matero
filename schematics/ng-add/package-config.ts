/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key: string) => (result[key] = obj[key]) && result, {});
}

/** The shortcut of `addPackageToPackageJson` */
export function addPackage(host: Tree, pkgverion: string, type = '') {
  const pos = pkgverion.lastIndexOf('@');
  const pkg = pkgverion.substring(0, pos);
  const verstion = pkgverion.substring(pos + 1);
  type === 'dev'
    ? addPackageToPackageJson(host, pkg, verstion, 'devDependencies')
    : addPackageToPackageJson(host, pkg, verstion);
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string,
  type: 'dependencies' | 'devDependencies' = 'dependencies'
): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json[type]) {
      json[type] = {};
    }

    if (!json[type][pkg]) {
      json[type][pkg] = version;
      json[type] = sortObjectByKeys(json[type]);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

/** Gets the version of the specified package by looking at the package.json in the given tree. */
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.dependencies && packageJson.dependencies[name]) {
    return packageJson.dependencies[name];
  }

  return null;
}

/** Adds scripts to the package.json */
export function addScriptToPackageJson(host: Tree, name: string, value: string): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.scripts) {
      json.scripts = {};
    }

    if (!json.scripts[name]) {
      json.scripts[name] = value;
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}
