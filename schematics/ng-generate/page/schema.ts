import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export interface Schema extends ComponentSchema {
  /**
   * The root of feature modules. Defaults to `routes` folder.
   */
  moduleRoot?: string;
  /**
   * The name of new page.
   */
  pageName: string;
}
