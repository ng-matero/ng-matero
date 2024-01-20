import { strings } from '@angular-devkit/core';
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  isStandaloneApp,
} from '@angular/cdk/schematics';
import {
  addFunctionalProvidersToStandaloneBootstrap,
  callsProvidersFunction,
  importsProvidersFrom,
} from '@schematics/angular/private/components';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  ProjectDefinition,
  getWorkspace,
  updateWorkspace,
} from '@schematics/angular/utility/workspace';
import { addLoaderToIndex } from './global-loader';
import { addFontsToIndex } from './material-fonts';
import { addScriptToPackageJson } from './package-config';
import { add3rdPkgsToPackageJson } from './packages';
import { Schema } from './schema';
import { addThemeStyleToTarget } from './theming';

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
    deleteExsitingFiles(options),
    addStarterFiles(options),
    addScriptsToPackageJson(),
    addESLintToAngularJson(options),
    addProxyToAngularJson(options),
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
    const mainFilePath = getProjectMainFile(project);

    if (isStandaloneApp(host, mainFilePath)) {
      addAnimationsToStandaloneApp(host, mainFilePath, context, options);
    } else {
      addAnimationsToNonStandaloneApp(host, project, mainFilePath, context, options);
    }
  };
}

/** Adds the animations module to an app that is bootstrap using the standalone component APIs. */
function addAnimationsToStandaloneApp(
  host: Tree,
  mainFile: string,
  context: SchematicContext,
  options: Schema
) {
  const animationsFunction = 'provideAnimations';
  const noopAnimationsFunction = 'provideNoopAnimations';

  if (options.animations === 'enabled') {
    // In case the project explicitly uses provideNoopAnimations, we should print a warning
    // message that makes the user aware of the fact that we won't automatically set up
    // animations. If we would add provideAnimations while provideNoopAnimations
    // is already configured, we would cause unexpected behavior and runtime exceptions.
    if (callsProvidersFunction(host, mainFile, noopAnimationsFunction)) {
      context.logger.error(
        `Could not add "${animationsFunction}" ` +
          `because "${noopAnimationsFunction}" is already provided.`
      );
      context.logger.info(`Please manually set up browser animations.`);
    } else {
      addFunctionalProvidersToStandaloneBootstrap(
        host,
        mainFile,
        animationsFunction,
        '@angular/platform-browser/animations'
      );
    }
  } else if (
    options.animations === 'disabled' &&
    !importsProvidersFrom(host, mainFile, animationsFunction)
  ) {
    // Do not add the provideNoopAnimations if the project already explicitly uses
    // the provideAnimations.
    addFunctionalProvidersToStandaloneBootstrap(
      host,
      mainFile,
      noopAnimationsFunction,
      '@angular/platform-browser/animations'
    );
  }
}

/**
 * Adds the animations module to an app that is bootstrap
 * using the non-standalone component APIs.
 */
function addAnimationsToNonStandaloneApp(
  host: Tree,
  project: ProjectDefinition,
  mainFile: string,
  context: SchematicContext,
  options: Schema
) {
  const browserAnimationsModuleName = 'BrowserAnimationsModule';
  const noopAnimationsModuleName = 'NoopAnimationsModule';
  const appModulePath = getAppModulePath(host, mainFile);

  if (options.animations === 'enabled') {
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
    } else {
      addModuleImportToRootModule(
        host,
        browserAnimationsModuleName,
        '@angular/platform-browser/animations',
        project
      );
    }
  } else if (
    options.animations === 'disabled' &&
    !hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)
  ) {
    // Do not add the NoopAnimationsModule module if the project already explicitly uses
    // the BrowserAnimationsModule.
    addModuleImportToRootModule(
      host,
      noopAnimationsModuleName,
      '@angular/platform-browser/animations',
      project
    );
  }
}

/** delete exsiting files to be overwrite */
function deleteExsitingFiles(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    [
      `${project.root}/.vscode/extensions.json`,
      `${project.root}/.vscode/settings.json`,
      `${project.root}/tsconfig.json`,
      `${project.root}/tsconfig.app.json`,
      `${project.root}/tsconfig.base.json`,
      `${project.root}/tsconfig.spec.json`,
      `${project.sourceRoot}/app/app-routing.module.ts`,
      `${project.sourceRoot}/app/app.module.ts`,
      `${project.sourceRoot}/app/app.config.ts`,
      `${project.sourceRoot}/app/app.routes.ts`,
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
function addESLintToAngularJson(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, options.project);

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
function addProxyToAngularJson(options: Schema) {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetServeConfig = project.targets.get('serve')!;

    if (targetServeConfig.options) {
      targetServeConfig.options.buildTarget = `${options.project}:build`;
      targetServeConfig.options.proxyConfig = 'proxy.config.js';
    } else {
      targetServeConfig.options = {
        buildTarget: `${options.project}:build`,
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
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFilePath = getProjectMainFile(project);

    return chain([
      mergeWith(
        apply(url('./files/common-files'), [
          template({
            ...strings,
            ...options,
          }),
        ])
      ),
      mergeWith(
        apply(
          url(
            isStandaloneApp(host, mainFilePath)
              ? './files/standalone-files'
              : './files/module-files'
          ),
          [
            template({
              ...strings,
              ...options,
            }),
            move('./src'),
          ]
        ),
        MergeStrategy.Overwrite
      ),
    ]);
  };
}

/** Install packages */
function installPackages() {
  return (host: Tree, context: SchematicContext) => {
    // Add 3rd packages
    add3rdPkgsToPackageJson(host);

    context.addTask(new NodePackageInstallTask());
  };
}
