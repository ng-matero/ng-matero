import { logging, workspaces } from '@angular-devkit/core';
import { Rule, SchematicsException } from '@angular-devkit/schematics';
import {
  getProjectBuildTargets,
  getProjectFromWorkspace,
  getProjectTargetOptions,
  getProjectTestTargets,
} from '@angular/cdk/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';

/** Path segment that can be found in paths that refer to a prebuilt theme. */
const prebuiltThemePathSegment = '@angular/material/prebuilt-themes';

/** Default file name of the custom theme that can be generated. */
const defaultCustomThemeFilename = 'custom-theme.scss';

/** Adds a theming style entry to the given project target options. */
export function addThemeStyleToTarget(
  projectName: string,
  targetName: 'test' | 'build',
  assetPath: string,
  logger: logging.LoggerApi
): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, projectName);

    // Do not update the builder options in case the target does not use the default CLI builder.
    if (!validateDefaultTargetBuilder(project, targetName, logger)) {
      return;
    }

    const targetOptions = getProjectTargetOptions(project, targetName);
    const styles = targetOptions.styles as (string | { input: string })[];

    if (!styles) {
      targetOptions.styles = [assetPath];
    } else {
      const existingStyles = styles.map(s => (typeof s === 'string' ? s : s.input));

      for (const [index, stylePath] of existingStyles.entries()) {
        // If the given asset is already specified in the styles, we don't need to do anything.
        if (stylePath === assetPath) {
          return;
        }

        // In case a prebuilt theme is already set up, we can safely replace the theme with the new
        // theme file. If a custom theme is set up, we are not able to safely replace the custom
        // theme because these files can contain custom styles, while prebuilt themes are
        // always packaged and considered replaceable.
        if (stylePath.includes(defaultCustomThemeFilename)) {
          logger.error(
            `Could not add the selected theme to the CLI project ` +
              `configuration because there is already a custom theme file referenced.`
          );
          logger.info(`Please manually add the following style file to your configuration:`);
          logger.info(`    ${assetPath}`);
          return;
        } else if (stylePath.includes(prebuiltThemePathSegment)) {
          styles.splice(index, 1);
        }
      }

      styles.unshift(assetPath);
    }
  });
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(
  project: workspaces.ProjectDefinition,
  targetName: 'build' | 'test',
  logger: logging.LoggerApi
) {
  const targets =
    targetName === 'test' ? getProjectTestTargets(project) : getProjectBuildTargets(project);
  const isDefaultBuilder = targets.length > 0;

  // Because the build setup for the Angular CLI can be customized by developers, we can't know
  // where to put the theme file in the workspace configuration if custom builders are being
  // used. In case the builder has been changed for the "build" target, we throw an error and
  // exit because setting up a theme is a primary goal of `ng-add`. Otherwise if just the "test"
  // builder has been changed, we warn because a theme is not mandatory for running tests
  // with Material. See: https://github.com/angular/components/issues/14176
  if (!isDefaultBuilder && targetName === 'build') {
    throw new SchematicsException(
      `Your project is not using the default builders for ` +
        `"${targetName}". The Angular Material schematics cannot add a theme to the workspace ` +
        `configuration if the builder has been changed.`
    );
  } else if (!isDefaultBuilder) {
    // for non-build targets we gracefully report the error without actually aborting the
    // setup schematic. This is because a theme is not mandatory for running tests.
    logger.warn(
      `Your project is not using the default builders for "${targetName}". This ` +
        `means that we cannot add the configured theme to the "${targetName}" target.`
    );
  }

  return isDefaultBuilder;
}
