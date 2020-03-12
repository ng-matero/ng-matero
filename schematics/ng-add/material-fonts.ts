/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { appendHtmlElementToHead, getProjectFromWorkspace } from '@angular/cdk/schematics';
import { Schema } from './schema';
import { getIndexHtmlPath } from '../utils/project-index-html';

/** Adds the Material Design fonts to the index HTML file. */
export function addFontsToIndex(options: Schema): (host: Tree) => Tree {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const projectIndexHtmlPath = getIndexHtmlPath(project);

    const fonts = [
      'assets/fonts/Material_Icons.css',
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap',
    ];

    fonts.forEach(font => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, `<link rel="stylesheet" href="${font}">`);
    });

    return host;
  };
}
