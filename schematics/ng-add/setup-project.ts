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
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
} from '@angular/cdk/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import chalk from 'chalk';
import { Schema } from './schema';
import { addHammerJsToMain } from './hammerjs-import';
import { addFontsToIndex } from './material-fonts';
import { addLoaderToIndex } from './global-loader';
import { addScriptToPackageJson } from './package-config';
import { add3rdPkgsToPackageJson } from './packages';
import { addThemeStyleToTarget } from '../utils';

/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';

/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Starter files to root
 *  - Add Scripts to package.json
 *  - Add Hmr & style & proxy to angular.json
 *  - Add Hammer.js
 *  - Add Browser Animation to app.module
 *  - Add Fonts & Icons to index.html
 *  - Add Preloader to index.html
 *  - Add Packages to package.json
 */
export default function(options: Schema): Rule {
  return chain([
    deleteExsitingFiles(),
    addStarterFiles(options),
    addScriptsToPackageJson(),
    addHmrToAngularJson(),
    addStyleToAngularJson(),
    addProxyToAngularJson(),
    options && options.gestures ? addHammerJsToMain(options) : noop(),
    addAnimationsModule(options),
    addFontsToIndex(options),
    addLoaderToIndex(options),
    installPackages(options),
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
          chalk.red(
            `Could not set up "${chalk.bold(browserAnimationsModuleName)}" ` +
              `because "${chalk.bold(noopAnimationsModuleName)}" is already imported. Please ` +
              `manually set up browser animations.`
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
      `${project.root}/tsconfig.json`,
      `${project.root}/tslint.json`,
      `${project.sourceRoot}/app/app-routing.module.ts`,
      `${project.sourceRoot}/app/app.module.ts`,
      `${project.sourceRoot}/app/app.component.spec.ts`,
      `${project.sourceRoot}/app/app.component.ts`,
      `${project.sourceRoot}/app/app.component.html`,
      `${project.sourceRoot}/app/app.component.scss`,
      `${project.sourceRoot}/environments/environment.prod.ts`,
      `${project.sourceRoot}/environments/environment.ts`,
      `${project.sourceRoot}/styles.scss`,
    ]
      .filter(p => host.exists(p))
      .forEach(p => host.delete(p));
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

/** Add style to angular.json */
function addStyleToAngularJson() {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const ngJson = Object.assign(workspace);
    const project = ngJson.projects[ngJson.defaultProject];

    const themePath = `src/styles.scss`;

    addThemeStyleToTarget(project, 'build', host, themePath, workspace);
    addThemeStyleToTarget(project, 'test', host, themePath, workspace);
  };
}

/** Add proxy to angular.json */
function addProxyToAngularJson() {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const ngJson = Object.assign(workspace);
    const project = ngJson.projects[ngJson.defaultProject];

    project.architect.serve.options.proxyConfig = 'proxy.config.js';

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
function installPackages(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    // Add 3rd packages
    add3rdPkgsToPackageJson(host, options);

    context.addTask(new NodePackageInstallTask());
    return host;
  };
}
