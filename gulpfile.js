const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
// const del = require('del');

const DEST = 'dist/schematics/starter/files';

// root
function copyRoot(cb) {
  return src(['.huskyrc', '.prettierignore', '.prettierrc', '.stylelintrc', 'LICENSE', 'README.md'])
    .pipe(rename(function(path) {}))
    .pipe(dest(`${DEST}/`));
}

// src/
function copySrcRoot(cb) {
  return src([
    // 'src/index.html',
    'src/hmr.ts',
    'src/main.ts',
    'src/styles.scss',
    'src/typings.d.ts',
  ]).pipe(dest(`${DEST}/src`));
}

// src/assets
function copyAssets(cb) {
  return src(['src/assets/**/*']).pipe(dest(`${DEST}/src/assets`));
}

// src/styles
function copyStyles(cb) {
  return src(['src/styles/**/*', '!src/styles/app.scss']).pipe(dest(`${DEST}/src/styles`));
}

// src/environments
function copyEnvironments(cb) {
  return src(['src/environments/*']).pipe(dest(`${DEST}/src/environments`));
}

// src/app/
function copySrcApp(cb) {
  return src([
    'src/app/**/*',
    '!src/app/core/core.module.ts',
    '!src/app/routes/**/*',
    '!src/app/shared/shared.module.ts',
    '!src/app/theme/theme.module.ts',
    '!src/app/theme/admin-layout/*.html',
    '!src/app/theme/admin-layout/header/*.html',
    '!src/app/app.module.ts',
  ]).pipe(dest(`${DEST}/src/app`));
}

// src/app/routes
function copySrcAppRoutes(cb) {
  return src(['src/app/routes/sessions/**/*']).pipe(dest(`${DEST}/src/app/routes/sessions`));
}

exports.default = series(
  copyRoot,
  copySrcRoot,
  copyAssets,
  copyStyles,
  copyEnvironments,
  copySrcApp,
  copySrcAppRoutes
);
