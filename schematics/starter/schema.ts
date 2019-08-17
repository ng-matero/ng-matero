/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface Schema {
  /** Name of the project. */
  project: string;

  /** Which admin layout should be set up. */
  layout: string;

  /** Whether gesture support should be set up. */
  gestures: boolean;

  /** Whether Angular browser animations should be set up. */
  animations: boolean;
}
