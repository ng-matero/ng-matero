import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask, NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addKeyPkgsToPackageJson } from './packages';

// Just return the tree
export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    // Add CDK first!
    addKeyPkgsToPackageJson(host);

    // Since the Angular Material schematics depend on the schematic utility functions from the
    // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
