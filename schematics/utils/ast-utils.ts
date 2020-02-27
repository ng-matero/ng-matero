import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  findNodes,
  getRouterModuleDeclaration,
  insertAfterLastOccurrence,
} from '@schematics/angular/utility/ast-utils';
import { Change } from '@schematics/angular/utility/change';

export function findRouteNode(
  node: ts.Node,
  kind: ts.SyntaxKind,
  textKey: string,
  textValue?: string
): ts.Node | null {
  if (
    node.kind === kind &&
    node.getText() === textKey &&
    (node.parent as any).initializer.text === textValue
  ) {
    // throw new Error(node.getText());
    return node.parent.parent;
  }

  let foundNode: ts.Node | null = null;
  ts.forEachChild(node, childNode => {
    foundNode = foundNode || findRouteNode(childNode, kind, textKey, textValue);
  });

  return foundNode;
}

export function findRouteNodeByKey(
  node: ts.Node,
  kind: ts.SyntaxKind,
  textKey: string
): ts.Node | null {
  let foundNode: ts.Node | null = null;

  ts.forEachChild(node, (childNode: any) => {
    if (childNode.initializer.kind === kind && childNode.name.text === textKey) {
      foundNode = childNode.initializer;
    }
  });

  return foundNode;
}

/**
 * Adds a new route declaration to a router module (i.e. has a RouterModule declaration)
 */
export function addRouteDeclarationToModule(
  source: ts.SourceFile,
  fileToAdd: string,
  routeLiteral: string
): Change {
  const routerModuleExpr = getRouterModuleDeclaration(source);
  if (!routerModuleExpr) {
    throw new Error(`Couldn't find a route declaration in ${fileToAdd}.`);
  }
  const scopeConfigMethodArgs = (routerModuleExpr as ts.CallExpression).arguments;
  if (!scopeConfigMethodArgs.length) {
    const { line } = source.getLineAndCharacterOfPosition(routerModuleExpr.getStart());
    throw new Error(
      `The router module method doesn't have arguments ` + `at line ${line} in ${fileToAdd}`
    );
  }

  let routesArr: ts.ArrayLiteralExpression | undefined;
  const routesArg = scopeConfigMethodArgs[0];

  // Check if the route declarations array is
  // an inlined argument of RouterModule or a standalone variable
  if (ts.isArrayLiteralExpression(routesArg)) {
    routesArr = routesArg;
  } else {
    const routesVarName = routesArg.getText();
    let routesVar;
    if (routesArg.kind === ts.SyntaxKind.Identifier) {
      routesVar = source.statements
        .filter((s: ts.Statement) => s.kind === ts.SyntaxKind.VariableStatement)
        .find((v: ts.VariableStatement) => {
          return v.declarationList.declarations[0].name.getText() === routesVarName;
        }) as ts.VariableStatement | undefined;
    }

    if (!routesVar) {
      const { line } = source.getLineAndCharacterOfPosition(routesArg.getStart());
      throw new Error(
        `No route declaration array was found that corresponds ` +
          `to router module at line ${line} in ${fileToAdd}`
      );
    }

    routesArr = findNodes(
      routesVar,
      ts.SyntaxKind.ArrayLiteralExpression,
      1
    )[0] as ts.ArrayLiteralExpression;
  }

  const occurencesCount = routesArr.elements.length;
  const text = routesArr.getFullText(source);

  let route: string = routeLiteral;
  if (occurencesCount > 0) {
    const identation = text.match(/\r?\n(\r?)\s*/) || [];
    route = `,${identation[0] || ' '}${routeLiteral}`;
  }

  // Find a route which `path` equals to `''`
  const routeNodeInsertedTo = findRouteNode(
    routesArr,
    ts.SyntaxKind.Identifier,
    'path',
    ''
  ) as ts.ObjectLiteralExpression;

  if (!routeNodeInsertedTo) {
    throw new Error(`Couldn't find a route definition which path is empty string`);
  }

  const routeNodeChildren = findRouteNodeByKey(
    routeNodeInsertedTo,
    ts.SyntaxKind.ArrayLiteralExpression,
    'children'
  ) as ts.ArrayLiteralExpression;

  return insertAfterLastOccurrence(
    (routeNodeChildren.elements as unknown) as ts.Node[],
    route,
    fileToAdd,
    routeNodeChildren.elements.pos,
    ts.SyntaxKind.ObjectLiteralExpression
  );
}
