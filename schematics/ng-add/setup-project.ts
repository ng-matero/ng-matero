import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  getProjectFromWorkspace,
  getProjectMainFile,
  isStandaloneApp,
} from '@angular/cdk/schematics';
import { isZonelessApp } from '@schematics/angular/utility/project-targets';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { applyEdits, modify, parse } from 'jsonc-parser';
import { addLoaderToIndex } from './global-loader';
import { addFontsToIndex } from './material-fonts';
import { addScriptToPackageJson } from './package-config';
import { add3rdPkgsToPackageJson } from './packages';
import { Schema } from './schema';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Starter files to root
 *  - Add Scripts to `package.json`
 *  - Add proxy to `angular.json`
 *  - Add fileReplacements to `angular.json`
 *  - Add paths to `tsconfig.json`
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
    addFileReplacementsToAngularJson(options),
    addPathsToTsconfig(options),
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

/** Add paths to `tsconfig.json` */
function addPathsToTsconfig(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    const fileName = 'tsconfig.json';
    const formattingOptions = { insertSpaces: true, tabSize: 2 };

    let fileContent = host.read(fileName)!.toString();
    let edits = modify(fileContent, ['compilerOptions', 'baseUrl'], './', {
      formattingOptions,
    });
    fileContent = applyEdits(fileContent, edits);

    const currentJson = parse(fileContent);
    const currentPaths = currentJson.compilerOptions.paths || {};

    const pathsToUpdate: Record<string, string> = {
      '@core': `${project.sourceRoot}/app/core`,
      '@core/*': `${project.sourceRoot}/app/core/*`,
      '@shared': `${project.sourceRoot}/app/shared`,
      '@shared/*': `${project.sourceRoot}/app/shared/*`,
      '@theme': `${project.sourceRoot}/app/theme`,
      '@theme/*': `${project.sourceRoot}/app/theme/*`,
      '@env': `${project.sourceRoot}/environments`,
      '@env/*': `${project.sourceRoot}/environments/*`,
    };
    Object.keys(pathsToUpdate).forEach(key => {
      const newPath = pathsToUpdate[key];
      const existingPaths = Array.isArray(currentPaths[key]) ? currentPaths[key] : [];
      const updatedPaths = Array.from(new Set([...existingPaths, newPath]));

      edits = modify(fileContent, ['compilerOptions', 'paths', key], updatedPaths, {
        formattingOptions,
      });
      fileContent = applyEdits(fileContent, edits);
    });

    host.overwrite(fileName, fileContent);
  };
}

/** Add starter files to root */
function addStarterFiles(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFilePath = getProjectMainFile(project);

    options.zoneless = isZonelessApp(project);

    return chain([
      mergeWith(
        apply(url('./files/root-files'), [
          template({
            ...strings,
            ...options,
          }),
        ]),
        MergeStrategy.Overwrite
      ),
      mergeWith(
        apply(url('./files/common-files'), [
          template({
            ...strings,
            ...options,
          }),
          move(project.root!),
        ]),
        MergeStrategy.Overwrite
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
            move(project.sourceRoot!),
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
