// @ts-nocheck
import type { RehypePlugins } from "astro";
import rehypeExternalLinks from "rehype-external-links";
import { createCssVariablesTheme } from "shiki/core";

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

export const remarkPlugins = [codeBlock];

export const vorillazTheme = createCssVariablesTheme({
  name: "vorillaz",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

export const transformers = [
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
];

export const rehypePlugins: RehypePlugins = [
  [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
  wrapLinkContent,
  singleLineCodeBlock,
  [
    rehypeShiki,
    {
      theme: vorillazTheme,
      keepBackground: true,
      transformers: transformers,
    },
  ],
];
