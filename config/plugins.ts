import type { RemarkPlugins, RehypePlugins } from "astro";
import rehypeExternalLinks from "rehype-external-links";
import { createCssVariablesTheme } from "shikiji";

import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

import { codeBlock, singleLineCodeBlock } from "./code";
import { wrapLinkContent } from "./link";

export const remarkPlugins: RemarkPlugins = [codeBlock];

export const rehypePlugins: RehypePlugins = [
  [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
  wrapLinkContent,
  singleLineCodeBlock,
  [
    rehypeShiki,
    {
      theme: createCssVariablesTheme({
        name: "css-variables",
        variablePrefix: "--shiki-",
      }),
      keepBackground: true,
      transformers: [
        transformerMetaHighlight({
          className: "has-highlight",
        }),
        {
          name: "remove-trailing-newline",
          preprocess(code) {
            if (code.endsWith("\n")) {
              return code.slice(0, -1);
            }
            return code;
          },
        },
        {
          name: "line-number-meta",
          code(node) {
            if (this.options.meta?.__raw?.includes("showLineNumber")) {
              this.addClassToHast(node, "line-numbers");
            }
          },
        },
        transformerNotationDiff(),
        transformerMetaWordHighlight(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationWordHighlight({
          classActivePre: "has-word-highlight",
        }),
        transformerNotationErrorLevel({
          classActivePre: "has-error",
        }),
      ],
    },
  ],
];
