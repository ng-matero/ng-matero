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
import { addHammerJsToMain } from './hammerjs-import';
import { addFontsToIndex } from './material-fonts';
import { addLoaderToIndex } from './global-loader';
import {
  addScriptToPackageJson,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  addModuleImportToRootModule,
  addPackage,
} from '../utils';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const VERSION = require('../package.json').version;

const { red, bold, italic } = chalk;

/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';

/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Starter files to root
 *  - Add Packages to package.json
 *  - Add Scripts to package.json
 *  - Add Hmr to angular.json
 *  - Add Hammer.js
 *  - Add Browser Animation to app.module
 *  - Add Fonts & Icons to index.html
 *  - Add Preloader to index.html
 */
export default function(options: Schema): Rule {
  return chain([
    deleteExsitingFiles(),
    addStarterFiles(options),
    addPackagesToPackageJson(options),
    addScriptsToPackageJson(),
    addHmrToAngularJson(),
    options && options.gestures ? addHammerJsToMain(options) : noop(),
    addAnimationsModule(options),
    addFontsToIndex(options),
    addLoaderToIndex(options),
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
      `${project.root}/tsconfig.json`,
      `${project.sourceRoot}/app/app-routing.module.ts`,
      `${project.sourceRoot}/app/app.module.ts`,
      `${project.sourceRoot}/app/app.component.spec.ts`,
      `${project.sourceRoot}/app/app.component.ts`,
      `${project.sourceRoot}/app/app.component.html`,
      `${project.sourceRoot}/app/app.component.scss`,
      `${project.sourceRoot}/environments/environment.prod.ts`,
      `${project.sourceRoot}/environments/environment.ts`,
      `${project.sourceRoot}/main.ts`,
      `${project.sourceRoot}/styles.scss`,
    ]
      .filter(p => host.exists(p))
      .forEach(p => host.delete(p));
  };
}

/** Add dependencies to package.json */
function addPackagesToPackageJson(options: Schema) {
  return (host: Tree) => {
    // TODO:
    addPackage(host, `ng-matero@~${VERSION}`);
    // In order to align the Material and CDK version with the other Angular dependencies,
    // we use tilde instead of caret. This is default for Angular dependencies in new CLI projects.
    addPackage(host, '@angular/cdk@0.0.0-PLACEHOLDER');
    addPackage(host, '@angular/material@0.0.0-PLACEHOLDER');
    addPackage(host, '@angular/flex-layout@0.0.0-PLACEHOLDER');

    if (options.gestures) {
      addPackage(host, 'hammerjs@0.0.0-PLACEHOLDER');
    }

    // 3rd lib
    addPackage(host, '@ngx-formly/core@0.0.0-PLACEHOLDER');
    addPackage(host, '@ngx-formly/material@0.0.0-PLACEHOLDER');
    addPackage(host, '@ngx-progressbar/core@0.0.0-PLACEHOLDER');
    addPackage(host, '@ngx-progressbar/router@0.0.0-PLACEHOLDER');
    addPackage(host, '@ngx-translate/core@0.0.0-PLACEHOLDER');
    addPackage(host, '@ngx-translate/http-loader@0.0.0-PLACEHOLDER');
    addPackage(host, '@ng-select/ng-select@0.0.0-PLACEHOLDER');
    addPackage(host, 'ngx-toastr@0.0.0-PLACEHOLDER');
    addPackage(host, 'screenfull@0.0.0-PLACEHOLDER');

    // Dev
    addPackage(host, '@angularclass/hmr@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'husky@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'prettier@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'prettier-stylelint@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'stylelint@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'stylelint-config-recommended-scss@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'stylelint-config-standard@0.0.0-PLACEHOLDER', 'dev');
    addPackage(host, 'stylelint-scss@0.0.0-PLACEHOLDER', 'dev');
  };
}

/** Add scripts to package.json */
function addScriptsToPackageJson() {
  return (host: Tree) => {
    addScriptToPackageJson(host, 'build:prod', 'ng build --prod --build-optimizer');
    addScriptToPackageJson(
      host,
      'lint:ts',
      `tslint -p src/tsconfig.app.json -c tslint.json 'src/**/*.ts'`
    );
    addScriptToPackageJson(host, 'lint:scss', `stylelint --syntax scss 'src/**/*.scss' --fix'`);
    addScriptToPackageJson(host, 'hmr', `ng serve -c=hmr --disable-host-check`);
  };
}

/** Add hmr to angular.json */
function addHmrToAngularJson() {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const ngJson = Object.assign(workspace);
    const project = ngJson.projects[ngJson.defaultProject];

    // build
    project.architect.build.configurations.hmr = {
      fileReplacements: [
        {
          replace: `${project.sourceRoot}/environments/environment.ts`,
          with: `${project.sourceRoot}/environments/environment.hmr.ts`,
        },
      ],
    };
    // serve
    project.architect.serve.configurations.hmr = {
      browserTarget: `${workspace.defaultProject}:build:hmr`,
      hmr: true,
    };

    host.overwrite('angular.json', JSON.stringify(ngJson, null, 2));
  };
}

/** Add starter files to root */
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

/** Install packages */
function installPackages() {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}
