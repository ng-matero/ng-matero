const { src, dest, series } = require('gulp');
const each = require('gulp-each');

const pkg = require('./package.json');

const DEST = 'dist/schematics';
const NG_ADD = DEST + '/ng-add';
const FILES = NG_ADD + '/files/common-files';

// .vscode
function copyDotVscode() {
  return src(['.vscode/*']).pipe(dest(`${FILES}/.vscode`));
}

// root
function copyRoot() {
  return src([
    '.prettierignore',
    '.prettierrc',
    '.stylelintrc',
    'eslint.config.js',
    'LICENSE',
    'proxy.config.js',
    'tsconfig.json',
  ]).pipe(dest(`${FILES}/`));
}

// src/
function copySrcRoot() {
  return src(['src/styles.scss', 'src/typings.d.ts']).pipe(dest(`${FILES}/src`));
}

// src/assets
function copyAssets() {
  return src(
    [
      'public/**/*',
      '!public/favicon.ico',
      '!public/data/menu.json',
      '!public/images/heros/**',
      '!public/images/pixabay/**',
    ],
    { encoding: false }
  ).pipe(dest(`${FILES}/public`));
}

// src/styles
function copyStyles() {
  return src(['src/styles/**/*', '!src/styles/_themes.scss']).pipe(dest(`${FILES}/src/styles`));
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
    '!src/app/shared/in-mem/**',
    '!src/app/theme/admin-layout/*.html',
    '!src/app/app.config.ts',
    '!src/app/app.routes.ts',
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
          '@angular/animations',
          '@angular/cdk',
          '@angular/material',
          '@angular/material-date-fns-adapter',
          '@ng-matero/extensions',
          '@ng-matero/extensions-date-fns-adapter',
          '@ngx-formly/core',
          '@ngx-formly/material',
          '@ngx-translate/core',
          '@ngx-translate/http-loader',
          'date-fns',
          'ngx-permissions',
          'ngx-progressbar',
          'ngx-toastr',
          'photoviewer',
          'screenfull',
          'angular-eslint',
          'eslint',
          'parse5',
          'prettier',
          'stylelint',
          'stylelint-config-recess-order',
          'stylelint-config-recommended-scss',
          'stylelint-config-standard',
          'typescript-eslint',
        ].forEach(name => {
          if (!pkg.dependencies[name] && !pkg.devDependencies[name]) {
            cb(`${name} not found!`);
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
