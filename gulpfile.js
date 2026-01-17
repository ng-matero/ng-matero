const { src, dest, series } = require('gulp');
const each = require('gulp-each');

const pkg = require('./package.json');

const DEST = 'dist/schematics';
const NG_ADD = DEST + '/ng-add';
const ROOT_FILES = NG_ADD + '/files/root-files';
const COMMON_FILES = NG_ADD + '/files/common-files';

// .vscode
function copyDotVscode() {
  return src(['.vscode/*']).pipe(dest(`${ROOT_FILES}/.vscode`));
}

// root
function copyRoot() {
  return src([
    '.prettierrc',
    '.stylelintrc',
    'eslint.config.js',
    'LICENSE',
    'proxy.config.js',
  ]).pipe(dest(`${ROOT_FILES}/`));
}

// public/
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
  ).pipe(dest(`${COMMON_FILES}/public`));
}

// src/
function copySrcRoot() {
  return src(['src/styles.scss', 'src/typings.d.ts']).pipe(dest(`${COMMON_FILES}/src`));
}

// src/styles
function copyStyles() {
  return src(['src/styles/**/*', '!src/styles/_themes.scss']).pipe(
    dest(`${COMMON_FILES}/src/styles`)
  );
}

// src/environments
function copyEnvironments() {
  return src(['src/environments/*']).pipe(dest(`${COMMON_FILES}/src/environments`));
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
  ]).pipe(dest(`${COMMON_FILES}/src/app`));
}

// src/app/routes
function copySrcAppRoutes() {
  return src(['src/app/routes/sessions/**/*']).pipe(
    dest(`${COMMON_FILES}/src/app/routes/sessions`)
  );
}

// Replace version placeholder
function updateVersions(cb) {
  return src([`${NG_ADD}/packages.js`, `${NG_ADD}/packages.ts`])
    .pipe(
      each(function (content, file, callback) {
        [
          '@angular/cdk',
          '@angular/material',
          '@angular/material-date-fns-adapter',
          '@ng-matero/extensions',
          '@ng-matero/extensions-date-fns-adapter',
          '@ngneat/overview',
          '@ngx-formly/core',
          '@ngx-formly/material',
          '@ngx-translate/core',
          '@ngx-translate/http-loader',
          '@ngxpert/hot-toast',
          'base64-js',
          'date-fns',
          'ngx-permissions',
          'ngx-progressbar',
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
          'stylelint-order',
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
