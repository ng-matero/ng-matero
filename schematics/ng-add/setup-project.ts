import { strings } from '@angular-devkit/core';
import {
  chain,
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
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema } from './schema';
import { addThemeStyleToTarget } from './theming';
import { addFontsToIndex } from './material-fonts';
import { addLoaderToIndex } from './global-loader';
import { addScriptToPackageJson } from './package-config';
import { add3rdPkgsToPackageJson } from './packages';

/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';

/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Starter files to root
 *  - Add Scripts to `package.json`
 *  - Add proxy to `angular.json`
 *  - Add style to `angular.json`
 *  - Add Browser Animation to app.module
 *  - Add Fonts & Icons to `index.html`
 *  - Add Preloader to `index.html`
 *  - Add Packages to `package.json`
 */
export default function (options: Schema): Rule {
  return chain([
    deleteExsitingFiles(),
    addStarterFiles(options),
    addScriptsToPackageJson(),
    addESLintToAngularJson(),
    addProxyToAngularJson(),
    addStyleToAngularJson(options),
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
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (options.animations) {
      // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
      // message that makes the user aware of the fact that we won't automatically set up
      // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
      // is already configured, we would cause unexpected behavior and runtime exceptions.
      if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
        context.logger.error(
          `Could not set up "${browserAnimationsModuleName}" ` +
            `because "${noopAnimationsModuleName}" is already imported.`
        );
        context.logger.info(`Please manually set up browser animations.`);
        return;
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
  };
}

/** delete exsiting files to be overwrite */
function deleteExsitingFiles() {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace);

    [
      `${project.root}/.vscode/extensions.json`,
      `${project.root}/.vscode/settings.json`,
      `${project.root}/tsconfig.json`,
      `${project.root}/tsconfig.app.json`,
      `${project.root}/tsconfig.base.json`,
      `${project.root}/tsconfig.spec.json`,
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

/** Add scripts to `package.json` */
function addScriptsToPackageJson() {
  return (host: Tree) => {
    addScriptToPackageJson(host, 'build:prod', 'ng build --prod');
    addScriptToPackageJson(host, 'lint', `npm run lint:ts && npm run lint:scss`);
    addScriptToPackageJson(host, 'lint:ts', `eslint "src/**/*.ts" --fix`);
    addScriptToPackageJson(host, 'lint:scss', `stylelint "src/**/*.scss" --fix`);
    addScriptToPackageJson(host, 'hmr', `ng serve --hmr --disable-host-check`);
  };
}

/** Add ESLint to `angular.json` */
function addESLintToAngularJson(): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace);

    let lintFilePatternsRoot = '';

    // Default Angular CLI project at the root of the workspace
    if (project.root === '') {
      lintFilePatternsRoot = 'src';
    } else {
      lintFilePatternsRoot = project.root;
    }

    const eslintTargetConfig = {
      builder: '@angular-eslint/builder:lint',
      options: {
        lintFilePatterns: [`${lintFilePatternsRoot}/**/*.ts`, `${lintFilePatternsRoot}/**/*.html`],
      },
    };

    project.targets.set('lint', eslintTargetConfig);
  });
}

/** Add proxy to `angular.json` */
function addProxyToAngularJson() {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace);
    const targetServeConfig = project.targets?.get('serve')?.configurations as any;

    if (targetServeConfig.options) {
      targetServeConfig.options.proxyConfig = 'proxy.config.js';
    } else {
      targetServeConfig.options = {
        proxyConfig: 'proxy.config.js',
      };
    }
  });
}

/** Add style to `angular.json` */
function addStyleToAngularJson(options: Schema): Rule {
  return (_host: Tree, context: SchematicContext) => {
    // Path needs to be always relative to the `package.json` or workspace root.
    const themePath = `src/styles.scss`;

    return chain([
      addThemeStyleToTarget(options.project, 'build', themePath, context.logger),
      addThemeStyleToTarget(options.project, 'test', themePath, context.logger),
    ]);
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
    // Add 3rd packages
    add3rdPkgsToPackageJson(host);

    context.addTask(new NodePackageInstallTask());
  };
}
