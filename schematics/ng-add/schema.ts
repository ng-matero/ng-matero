export interface Schema {
  /** Name of the project. */
  project: string;

  /** Which admin layout should be set up. */
  layout: 'static' | 'dynamic';

  /** Which nav style should be set up. */
  nav: 'side' | 'top';

  /** Which theme style should be set up. */
  theme: 'light' | 'dark';

  /** Which direction should be set up. */
  dir: 'rtl' | 'ltr';

  /** Creates an application based upon the standalone API, without NgModules. */
  standalone: boolean;

  /** Generate an application that does not use `zone.js`. */
  zoneless: boolean;
}
