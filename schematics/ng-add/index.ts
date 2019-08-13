import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
// import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Just return the tree
export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // console.log(options, context);
    // context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options));
    return tree;
  };
}
