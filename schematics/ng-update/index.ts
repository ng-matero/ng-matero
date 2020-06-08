/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';
import * as chalk from 'chalk';

import { materialUpgradeData } from './upgrade-data';

/** Entry point for the migration schematics with target of Ng-Matero v0 */
export function updateToV0() {
  console.log(chalk.green('The `ng update` is working!'));
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(targetVersion: TargetVersion, hasFailures: boolean) {
  console.log();
  console.log(chalk.green(`  ✓  Updated Ng-Matero to ${targetVersion}`));
  console.log();

  if (hasFailures) {
    console.log(
      chalk.yellow(
        '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
          'output above and fix these issues manually.'
      )
    );
  }
}
