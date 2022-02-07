const { src, dest, series } = require('gulp');
const each = require('gulp-each');

const pkg = require('./package.json');

const DEST = 'dist/schematics';
const NG_ADD = DEST + '/ng-add';
const FILES = NG_ADD + '/files';

// .vscode
function copyDotVscode() {
  return src(['.vscode/*']).pipe(dest(`${FILES}/.vscode`));
}

// root
function copyRoot() {
  return src([
    '.eslintrc.json',
    '.prettierignore',
    '.prettierrc',
    '.stylelintrc',
    'LICENSE',
    'proxy.config.js',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.spec.json',
  ]).pipe(dest(`${FILES}/`));
}

// src/
function copySrcRoot() {
  return src(['src/.eslintrc.json', 'src/styles.scss', 'src/typings.d.ts']).pipe(dest(`${FILES}/src`));
}

// src/assets
function copyAssets() {
  return src([
    'src/assets/**/*',
    '!src/assets/data/menu.json',
    '!src/assets/images/avatars/**',
    '!src/assets/images/pixabay/**',
  ]).pipe(dest(`${FILES}/src/assets`));
}

// src/styles
function copyStyles() {
  return src(['src/styles/**/*', '!src/styles/_app-theme.scss', '!src/styles/_themes.scss']).pipe(
    dest(`${FILES}/src/styles`)
  );
}

// src/environments
function copyEnvironments() {
  return src(['src/environments/*']).pipe(dest(`${FILES}/src/environments`));
}

// src/app/
function copySrcApp() {
  return src([
    'src/app/**/*',
    '!src/app/core/settings.ts',
    '!src/app/routes/**/*',
    '!src/app/shared/shared.module.ts',
    '!src/app/theme/admin-layout/*.html',
    '!src/app/theme/header/*.html',
    '!src/app/theme/header/github.*',
    '!src/app/theme/customizer/**',
    '!src/app/theme/theme.module.ts',
    '!src/app/app.module.ts',
  ]).pipe(dest(`${FILES}/src/app`));
}

// src/app/routes
function copySrcAppRoutes() {
  return src(['src/app/routes/sessions/**/*']).pipe(dest(`${FILES}/src/app/routes/sessions`));
}

// Replace version placeholder
function updateVersions(cb) {
  return src([`${NG_ADD}/packages.js`, `${NG_ADD}/packages.ts`])
    .pipe(
      each(function (content, file, callback) {
        [
          '@angular/cdk',
          '@angular/flex-layout',
          '@angular/material',
          '@angular/material-moment-adapter',
          '@ng-matero/extensions',
          '@ng-matero/extensions-moment-adapter',
          '@ngx-formly/core',
          '@ngx-formly/material',
          '@ngx-translate/core',
          '@ngx-translate/http-loader',
          'moment',
          'ngx-permissions',
          'ngx-progressbar',
          'ngx-toastr',
          'photoviewer',
          'screenfull',
          '@angular-eslint/builder',
          '@angular-eslint/eslint-plugin',
          '@angular-eslint/eslint-plugin-template',
          '@angular-eslint/schematics',
          '@angular-eslint/template-parser',
          '@typescript-eslint/eslint-plugin',
          '@typescript-eslint/parser',
          'eslint',
          'parse5',
          'prettier',
          'stylelint',
          'stylelint-config-rational-order',
          'stylelint-config-recommended-scss',
          'stylelint-config-standard',
          'stylelint-order',
          'stylelint-scss',
        ].forEach(name => {
          if (!pkg.dependencies[name] && !pkg.devDependencies[name]) {
            cb(`${name} not found！`);
          }
          content = content.replace(
            `${name}@0.0.0-PLACEHOLDER`,
            `${name}@${pkg.dependencies[name] || pkg.devDependencies[name]}`
          );
        });
        callback(null, content);
      })
    )
    .pipe(dest(NG_ADD));
}

exports.default = series(
  copyDotVscode,
  copyRoot,
  copySrcRoot,
  copyAssets,
  copyStyles,
  copyEnvironments,
  copySrcApp,
  copySrcAppRoutes,
  updateVersions
);
