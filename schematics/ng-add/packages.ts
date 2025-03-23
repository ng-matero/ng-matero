import { Tree } from '@angular-devkit/schematics';
import { addPackage } from './package-config';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const VERSION = require('../package.json').version;

/** Add dependencies to package.json */
export function addKeyPkgsToPackageJson(host: Tree) {
  addPackage(host, '@angular/cdk@0.0.0-PLACEHOLDER');
  addPackage(host, 'parse5@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, `ng-matero@^${VERSION}`);
}

/** Add dependencies to package.json */
export function add3rdPkgsToPackageJson(host: Tree) {
  addPackage(host, '@angular/animations@0.0.0-PLACEHOLDER');
  addPackage(host, '@angular/material@0.0.0-PLACEHOLDER');
  addPackage(host, '@angular/material-date-fns-adapter@0.0.0-PLACEHOLDER');

  // 3rd lib
  addPackage(host, '@ng-matero/extensions@0.0.0-PLACEHOLDER');
  addPackage(host, '@ng-matero/extensions-date-fns-adapter@0.0.0-PLACEHOLDER');
  addPackage(host, '@ngx-formly/core@0.0.0-PLACEHOLDER');
  addPackage(host, '@ngx-formly/material@0.0.0-PLACEHOLDER');
  addPackage(host, '@ngx-translate/core@0.0.0-PLACEHOLDER');
  addPackage(host, '@ngx-translate/http-loader@0.0.0-PLACEHOLDER');
  addPackage(host, 'date-fns@0.0.0-PLACEHOLDER');
  addPackage(host, 'ngx-permissions@0.0.0-PLACEHOLDER');
  addPackage(host, 'ngx-progressbar@0.0.0-PLACEHOLDER');
  addPackage(host, 'ngx-toastr@0.0.0-PLACEHOLDER');
  addPackage(host, 'photoviewer@0.0.0-PLACEHOLDER');
  addPackage(host, 'screenfull@0.0.0-PLACEHOLDER');

  // Dev
  addPackage(host, 'angular-eslint@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'eslint@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'prettier@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'stylelint@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'stylelint-config-recess-order@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'stylelint-config-recommended-scss@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'stylelint-config-standard@0.0.0-PLACEHOLDER', 'dev');
  addPackage(host, 'typescript-eslint@0.0.0-PLACEHOLDER', 'dev');
}
