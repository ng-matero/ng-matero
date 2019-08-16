import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Just return the tree
export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    // Since the Angular Material schematics depend on the schematic utility functions from the
    // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
    // const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options));
    return host;
  };
}
