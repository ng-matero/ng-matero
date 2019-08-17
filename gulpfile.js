const { src, dest, series } = require('gulp');
const each = require('gulp-each');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');

const pkg = require('./package.json');

const DEST = 'dist/schematics/starter';
const DEST_FILES = DEST + '/files';

// root
function copyRoot(cb) {
  return src([
    '.prettierignore',
    '.prettierrc',
    '.stylelintrc',
    'LICENSE',
    'README.md',
    'tsconfig.json',
  ]).pipe(dest(`${DEST_FILES}/`));
}

// src/
function copySrcRoot(cb) {
  return src(['src/hmr.ts', 'src/main.ts', 'src/styles.scss', 'src/typings.d.ts']).pipe(
    dest(`${DEST_FILES}/src`)
  );
}

// src/assets
function copyAssets(cb) {
  return src(['src/assets/**/*', '!src/assets/data/menu.json']).pipe(
    dest(`${DEST_FILES}/src/assets`)
  );
}

// src/styles
function copyStyles(cb) {
  return src(['src/styles/**/*', '!src/styles/app.scss']).pipe(dest(`${DEST_FILES}/src/styles`));
}

// src/environments
function copyEnvironments(cb) {
  return src(['src/environments/*']).pipe(dest(`${DEST_FILES}/src/environments`));
}

// src/app/
function copySrcApp(cb) {
  return src([
    'src/app/**/*',
    '!src/app/core/core.module.ts',
    '!src/app/routes/**/*',
    '!src/app/shared/shared.module.ts',
    '!src/app/theme/admin-layout/*.html',
    '!src/app/app.module.ts',
  ]).pipe(dest(`${DEST_FILES}/src/app`));
}

// src/app/routes
function copySrcAppRoutes(cb) {
  return src(['src/app/routes/sessions/**/*']).pipe(dest(`${DEST_FILES}/src/app/routes/sessions`));
}

// Replace version placeholder
function replaceVersion(cb) {
  return src([`${DEST}/index.js`, `${DEST}/index.ts`])
    .pipe(
      each(function(content, file, callback) {
        [
          '@angular/cdk',
          '@angular/material',
          '@angular/flex-layout',
          'hammerjs',
          '@ngx-formly/core',
          '@ngx-formly/material',
          '@ngx-progressbar/core',
          '@ngx-progressbar/router',
          '@ngx-translate/core',
          '@ngx-translate/http-loader',
          '@ng-select/ng-select',
          'ngx-toastr',
          'screenfull',
          '@angularclass/hmr',
          'husky',
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
    .pipe(dest(DEST));
}

exports.default = series(
  copyRoot,
  copySrcRoot,
  copyAssets,
  copyStyles,
  copyEnvironments,
  copySrcApp,
  copySrcAppRoutes,
  replaceVersion
);
