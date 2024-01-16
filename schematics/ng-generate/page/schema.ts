import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export interface Schema extends ComponentSchema {
  /**
   * The name of new page.
   */
  pageName: string;
  /**
   * The root of feature modules. Defaults to `routes` folder.
   */
  moduleRoot?: string;
  /**
   * Whether new component is the entry component
   */
  entryComponent?: boolean;
  /**
   * `.module.ts`
   */
  moduleExt?: string;
  /**
   * `-routing.module.ts`
   */
  routingModuleExt?: string;
}
