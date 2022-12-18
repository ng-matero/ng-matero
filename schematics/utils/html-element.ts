import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { Element, getChildElementIndentation } from '@angular/cdk/schematics';
import { parse as parseHtml } from 'parse5';

/** Appends the given element HTML fragment to the `<head>` element of the specified HTML file. */
export function appendHtmlElement(
  host: Tree,
  htmlFilePath: string,
  elementHtml: string,
  tag: string
) {
  const htmlFileBuffer = host.read(htmlFilePath);

  if (!htmlFileBuffer) {
    throw new SchematicsException(`Could not read file for path: ${htmlFilePath}`);
  }

  const htmlContent = htmlFileBuffer.toString();

  if (htmlContent.includes(elementHtml)) {
    return;
  }

  const elemTag = getHtmlTagElement(htmlContent, tag);

  if (!elemTag) {
    throw new Error(`Could not find '<${tag}>' element in HTML file: ${htmlFileBuffer}`);
  }

  const endTagOffset = elemTag.sourceCodeLocation!.endTag!.startOffset;
  const indentationOffset = getChildElementIndentation(elemTag);
  const insertion = `${' '.repeat(indentationOffset)}${elementHtml}`;

  const recordedChange = host.beginUpdate(htmlFilePath).insertRight(endTagOffset, `${insertion}\n`);

  host.commitUpdate(recordedChange);
}

/** Parses the given HTML file and returns the element if available. */
export function getHtmlTagElement(htmlContent: string, tag: string): Element | null {
  const document = parseHtml(htmlContent, { sourceCodeLocationInfo: true });
  const nodeQueue = [...document.childNodes];

  while (nodeQueue.length) {
    const node = nodeQueue.shift() as Element;

    if (node.nodeName.toLowerCase() === tag) {
      return node;
    } else if (node.childNodes) {
      nodeQueue.push(...node.childNodes);
    }
  }

  return null;
}
