/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { strings, normalize, experimental } from '@angular-devkit/core';
import {
  chain,
  noop,
  Rule,
  Tree,
  mergeWith,
  apply,
  url,
  template,
  SchematicContext,
} from '@angular-devkit/schematics';
import chalk from 'chalk';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema } from './schema';
import { addFontsToIndex } from './fonts/material-fonts';
import { addHammerJsToMain } from './gestures/hammerjs-import';
import {
  getPackageVersionFromPackageJson,
  addPackageToPackageJson,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  addModuleImportToRootModule,
  requiredAngularVersionRange,
  materialVersion,
  hammerjsVersion,
} from '../utils';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const { red, bold, italic } = chalk;

/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';

/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Starter files to root
 *  - Add Packages to package.json
 *  - Add Hammer.js
 *  - Add Browser Animation to app.module
 *  - Add Fonts & Icons to index.html
 */
export default function(options: Schema): Rule {
  return chain([
    deleteExsitingFiles(),
    addStarterFiles(options),
    updatePackageJson(options),
    // updateAngularJson(options),
    options && options.gestures ? addHammerJsToMain(options) : noop(),
    addAnimationsModule(options),
    addFontsToIndex(options),
    installPackages(),
  ]);
}

/**
 * Adds an animation module to the root module of the specified project. In case the "animations"
 * option is set to false, we still add the `NoopAnimationsModule` because otherwise various
 * components of Angular Material will throw an exception.
 */
function addAnimationsModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (options.animations) {
      // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
      // message that makes the user aware of the fact that we won't automatically set up
      // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
      // is already configured, we would cause unexpected behavior and runtime exceptions.
      if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
        return console.warn(
          red(
            `Could not set up "${bold(browserAnimationsModuleName)}" ` +
              `because "${bold(noopAnimationsModuleName)}" is already imported. Please manually ` +
              `set up browser animations.`
          )
        );
      }

      addModuleImportToRootModule(
        host,
        browserAnimationsModuleName,
        '@angular/platform-browser/animations',
        project
      );
    } else if (!hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
      // Do not add the NoopAnimationsModule module if the project already explicitly uses
      // the BrowserAnimationsModule.
      addModuleImportToRootModule(
        host,
        noopAnimationsModuleName,
        '@angular/platform-browser/animations',
        project
      );
    }

    return host;
  };
}

/** delete exsiting files to be overwrite */
function deleteExsitingFiles() {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace);

    [
      `${project.root}/README.md`,
      `${project.sourceRoot}/app/app-routing.module.ts`,
      `${project.sourceRoot}/app/app.module.ts`,
      `${project.sourceRoot}/app/app.component.spec.ts`,
      `${project.sourceRoot}/app/app.component.ts`,
      `${project.sourceRoot}/app/app.component.html`,
      `${project.sourceRoot}/app/app.component.scss`,
      `${project.sourceRoot}/environments/environment.prod.ts`,
      `${project.sourceRoot}/environments/environment.ts`,
      // `${project.sourceRoot}/index.html`,
      `${project.sourceRoot}/main.ts`,
      `${project.sourceRoot}/styles.scss`,
    ]
      .filter(p => host.exists(p))
      .forEach(p => host.delete(p));
  };
}

// Update package.json
function updatePackageJson(options: Schema) {
  return (host: Tree) => {
    // Version tag of the `@angular/core` dependency that has been loaded from the `package.json`
    // of the CLI project. This tag should be preferred because all Angular dependencies should
    // have the same version tag if possible.
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
    const angularDependencyVersion = ngCoreVersionTag || requiredAngularVersionRange;

    // In order to align the Material and CDK version with the other Angular dependencies,
    // we use tilde instead of caret. This is default for Angular dependencies in new CLI projects.
    addPackageToPackageJson(host, '@angular/cdk', `~${materialVersion}`);
    addPackageToPackageJson(host, '@angular/material', `~${materialVersion}`);
    addPackageToPackageJson(host, '@angular/forms', angularDependencyVersion);
    addPackageToPackageJson(host, '@angular/animations', angularDependencyVersion);

    if (options.gestures) {
      addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
    }

    addPackageToPackageJson(host, '@angular/flex-layout', '~8.0.0-beta.26');
    addPackageToPackageJson(host, 'ng-matero', '0.1.0');

    // 3rd lib
    addPackageToPackageJson(host, '@ngx-formly/core', '~5.0.0');
    addPackageToPackageJson(host, '@ngx-formly/material', '~5.0.0');
    addPackageToPackageJson(host, '@ngx-progressbar/core', '~5.3.2');
    addPackageToPackageJson(host, '@ngx-progressbar/router', '~5.3.2');
    addPackageToPackageJson(host, '@ngx-translate/core', '~11.0.1');
    addPackageToPackageJson(host, '@ngx-translate/http-loader', '~4.0.0');
    addPackageToPackageJson(host, '@ng-select/ng-select', '~2.20.3');
    addPackageToPackageJson(host, 'ngx-toastr', '~10.0.4');
    addPackageToPackageJson(host, 'screenfull', '~4.2.1');

    // Dev
    addPackageToPackageJson(host, '@angularclass/hmr', '~2.1.3', 'devDependencies');
    addPackageToPackageJson(host, 'husky', '~3.0.1', 'devDependencies');
    addPackageToPackageJson(host, 'prettier', '~1.18.2', 'devDependencies');
    addPackageToPackageJson(host, 'prettier-stylelint', '~0.4.2', 'devDependencies');
    addPackageToPackageJson(host, 'stylelint', '~10.1.0', 'devDependencies');
    addPackageToPackageJson(host, 'stylelint-config-recommended-scss', '~3.3.0', 'devDependencies');
    addPackageToPackageJson(host, 'stylelint-config-standard', '~18.3.0', 'devDependencies');
    addPackageToPackageJson(host, 'stylelint-scss', '~3.9.2', 'devDependencies');
  };
}

// Update angular.json
// function updateAngularJson(options: Schema) {
//   return (host: Tree) => {};
// }

// Add starter files to root
function addStarterFiles(options: Schema) {
  return chain([
    mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
        }),
      ])
    ),
  ]);
}

function installPackages() {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}
