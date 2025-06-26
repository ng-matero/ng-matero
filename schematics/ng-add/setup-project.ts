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
  getProjectFromWorkspace,
  getProjectMainFile,
  isStandaloneApp,
} from '@angular/cdk/schematics';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
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
 *  - Add fileReplacements to `angular.json`
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
    addFileReplacementsToAngularJson(options),
    addFontsToIndex(options),
    addLoaderToIndex(options),
    installPackages(),
  ]);
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
      `${project.sourceRoot}/app/app-routing-module.ts`,
      `${project.sourceRoot}/app/app-module.ts`,
      `${project.sourceRoot}/app/app.config.ts`,
      `${project.sourceRoot}/app/app.routes.ts`,
      `${project.sourceRoot}/app/app.spec.ts`,
      `${project.sourceRoot}/app/app.ts`,
      `${project.sourceRoot}/app/app.html`,
      `${project.sourceRoot}/app/app.scss`,
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
    addScriptToPackageJson(host, 'lint', `ng lint --fix && npm run lint:scss`);
    addScriptToPackageJson(host, 'lint:ts', `eslint "src/**/*.ts" --fix`);
    addScriptToPackageJson(host, 'lint:scss', `stylelint "src/**/*.scss" --fix`);
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

/** Add fileReplacements to 'angular.json' */
function addFileReplacementsToAngularJson(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetBuildConfig = project.targets.get('build')!;
    // The previous environment file has been deleted
    const replace = {
      replace: 'src/environments/environment.ts',
      with: 'src/environments/environment.prod.ts',
    };
    const production = targetBuildConfig.configurations!.production!;
    // Add file replacement option entry for the configuration environment file
    const replacements = production.fileReplacements as (typeof replace)[] | undefined;

    if (replacements === undefined) {
      production.fileReplacements = [replace];
    } else {
      const existing = replacements.find(value => value.replace === replace.replace);
      if (existing) {
        if (existing.with !== replace.with) {
          existing.with = replace.with;
        }
      } else {
        replacements.push(replace);
      }
    }
  });
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
