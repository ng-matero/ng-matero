const { src, dest, series } = require('gulp');
const each = require('gulp-each');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');

const pkg = require('./package.json');

const DEST = 'dist/schematics';
const NG_ADD = DEST + '/ng-add';
const FILES = NG_ADD + '/files';

// root
function copyRoot(cb) {
  return src([
    '.prettierignore',
    '.prettierrc',
    '.stylelintrc',
    'LICENSE',
    'proxy.config.js',
    'tsconfig.json',
    'tslint.json',
  ]).pipe(dest(`${FILES}/`));
}

// src/
function copySrcRoot(cb) {
  return src(['src/hmr.ts', 'src/styles.scss', 'src/typings.d.ts']).pipe(dest(`${FILES}/src`));
}

// src/assets
function copyAssets(cb) {
  return src([
    'src/assets/**/*',
    '!src/assets/data/menu.json',
    '!src/assets/images/avatars/**',
    '!src/assets/images/pixabay/**',
  ]).pipe(dest(`${FILES}/src/assets`));
}

// src/styles
function copyStyles(cb) {
  return src(['src/styles/**/*', '!src/styles/app.scss']).pipe(dest(`${FILES}/src/styles`));
}

// src/environments
function copyEnvironments(cb) {
  return src(['src/environments/*']).pipe(dest(`${FILES}/src/environments`));
}

// src/app/
function copySrcApp(cb) {
  return src([
    'src/app/**/*',
    '!src/app/core/core.module.ts',
    '!src/app/core/settings.ts',
    '!src/app/routes/**/*',
    '!src/app/shared/shared.module.ts',
    '!src/app/theme/admin-layout/*.html',
    '!src/app/theme/admin-layout/header/*.html',
    '!src/app/theme/admin-layout/header/github.*',
    '!src/app/theme/admin-layout/customizer/**',
    '!src/app/theme/theme.module.ts',
    '!src/app/app.module.ts',
  ]).pipe(dest(`${FILES}/src/app`));
}

// src/app/routes
function copySrcAppRoutes(cb) {
  return src(['src/app/routes/sessions/**/*']).pipe(dest(`${FILES}/src/app/routes/sessions`));
}

// Replace version placeholder
function updateVersions(cb) {
  return src([`${NG_ADD}/packages.js`, `${NG_ADD}/packages.ts`])
    .pipe(
      each(function(content, file, callback) {
        [
          '@angular/cdk',
          '@angular/material',
          'hammerjs',
          '@angular/flex-layout',
          '@ngx-formly/core',
          '@ngx-formly/material',
          '@ngx-progressbar/core',
          '@ngx-progressbar/router',
          '@ngx-translate/core',
          '@ngx-translate/http-loader',
          '@ng-select/ng-select',
          'ngx-toastr',
          'photoviewer',
          'screenfull',
          '@angularclass/hmr',
          'parse5',
          'prettier',
          'prettier-stylelint',
          'stylelint',
          'stylelint-config-recommended-scss',
          'stylelint-config-standard',
          'stylelint-scss',
        ].forEach(name => {
          if (!pkg.dependencies[name] && !pkg.devDependencies[name]) {
            cb('依赖名称不存在！');
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
  copyRoot,
  copySrcRoot,
  copyAssets,
  copyStyles,
  copyEnvironments,
  copySrcApp,
  copySrcAppRoutes,
  updateVersions
);
