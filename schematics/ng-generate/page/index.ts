import { chain, Rule } from '@angular-devkit/schematics';
import { buildComponent } from '../../utils';
import { Schema } from './schema';

/**
 * Scaffolds a new navigation component.
 * Internally it bootstraps the base component schematic
 */
export default function (options: Schema): Rule {
  return chain([
    buildComponent(
      { ...options },
      {
        template:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.__type@dasherize____ngext__.html.template',
        stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.__type@dasherize__.__style__.template',
      }
    ),
  ]);
}
