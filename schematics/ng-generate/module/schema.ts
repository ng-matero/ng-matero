/**
 * Creates a new generic NgModule definition in the given or default project.
 */
export interface Schema {
  /**
   * When true, creates the new files at the top level of the current project root.
   */
  flat?: boolean;
  /**
   * When true, applies lint fixes after generating the module.
   */
  lintFix?: boolean;
  /**
   * The declaring NgModule.
   * 默认添加到 `routes.module`
   */
  module?: string;
  /**
   * The name of the NgModule.
   */
  name: string;
  /**
   * The path at which to create the NgModule, relative to the workspace root.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * Creates lazy loaded routing module. Requires --module option.
   * 设置惰性模块路由 `routes-routing.module`
   */
  route?: string;
  /**
   * When true, creates a routing module.
   * 无效参数
   */
  routing?: boolean;
  /**
   * The scope for the new routing module.
   * 无效参数
   */
  routingScope?: RoutingScope;
}
/**
 * The scope for the new routing module.
 */
export enum RoutingScope {
  Child = 'Child',
  Root = 'Root',
}
