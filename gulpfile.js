const { src, dest, series } = require('gulp');
const each = require('gulp-each');

const pkg = require('./package.json');

const DEST = 'dist/schematics';
const NG_ADD = DEST + '/ng-add';
const FILES = NG_ADD + '/files';

// .vscode
function copyDotVscode(cb) {
  return src(['.vscode/*']).pipe(dest(`${FILES}/.vscode`));
}

// root
function copyRoot(cb) {
  return src([
    '.prettierignore',
    '.prettierrc',
    '.stylelintrc',
    'LICENSE',
    'proxy.config.js',
    'tsconfig.json',
    'tsconfig.app.json',
    'tslint.json',
    'tsconfig.spec.json',
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
  return src(['src/styles/**/*', '!src/styles/_app-theme.scss', '!src/styles/themes.scss']).pipe(
    dest(`${FILES}/src/styles`)
  );
}

// src/environments
function copyEnvironments(cb) {
  return src(['src/environments/*']).pipe(dest(`${FILES}/src/environments`));
}

// src/app/
function copySrcApp(cb) {
  return src([
    'src/app/**/*',
    '!src/app/core/authentication/auth.service.ts',
    '!src/app/core/bootstrap/startup.service.ts',
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
function copySrcAppRoutes(cb) {
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
          '@mat-datetimepicker/core',
          '@mat-datetimepicker/moment',
          '@ng-matero/extensions',
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
          '@angularclass/hmr',
          'parse5',
          'prettier',
          'stylelint',
          'stylelint-config-recommended-scss',
          'stylelint-config-standard',
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
