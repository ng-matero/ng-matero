/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';

import { materialUpgradeData } from './upgrade-data';

/** Entry point for the migration schematics with target of Ng-Matero v0 */
export function updateToV0() {}

/** Function that will be called when the migration completed. */
function onMigrationComplete(
  context: SchematicContext,
  targetVersion: TargetVersion,
  hasFailures: boolean
) {
  context.logger.info('');
  context.logger.info(`  ✓  Updated Ng-Matero to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    /** */
  }
}
