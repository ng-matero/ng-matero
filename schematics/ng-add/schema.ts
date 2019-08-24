export interface Schema {
  /** Name of the project. */
  project: string;

  /** Which admin layout should be set up. */
  nav: string;

  /** Which direction should be set up. */
  dir: string;

  /** Whether gesture support should be set up. */
  gestures: boolean;

  /** Whether Angular browser animations should be set up. */
  animations: boolean;
}
