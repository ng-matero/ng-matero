import { Rule, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { getProjectFromWorkspace, getProjectIndexFiles } from '@angular/cdk/schematics';
import { Schema } from './schema';
import { appendHtmlElement } from '../utils';

/** Adds the Material Design fonts to the index HTML file. */
export function addLoaderToIndex(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const projectIndexFiles = getProjectIndexFiles(project);

    const loaderStyles = `
    .global-loader {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 1;
      transition: opacity .5s ease-in-out;
    }

    .global-loader-fade-in {
      opacity: 0;
    }

    .global-loader-hidden {
      display: none;
    }

    .global-loader h1 {
      font-family: "Helvetica Neue", Helvetica, sans-serif;
      font-weight: normal;
      font-size: 24px;
      letter-spacing: .04rem;
      white-space: pre;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image:
        repeating-linear-gradient(
          to right,
          #f44336,
          #9c27b0,
          #3f51b5,
          #03a9f4,
          #009688,
          #8bc34a,
          #ffeb3b,
          #ff9800
        );
      background-size: 750% auto;
      background-position: 0 100%;
      animation: gradient 20s infinite;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
    }

    @keyframes gradient {
      0% {
        background-position: 0 0;
      }

      100% {
        background-position: -750% 0;
      }
    }
    `;

    const loaderHtml = `<div id="globalLoader" class="global-loader"><h1>LOADING</h1></div>`;

    projectIndexFiles.forEach(indexFilePath => {
      appendHtmlElement(
        host,
        indexFilePath,
        `<style type="text/css">${loaderStyles}</style>`,
        'head'
      );

      appendHtmlElement(host, indexFilePath, loaderHtml, 'body');
    });
  };
}
