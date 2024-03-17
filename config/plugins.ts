import type { RemarkPlugins, RehypePlugins } from "astro";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "shikiji-transformers";
import { createCssVariablesTheme } from "shikiji";
import { codeBlock } from "./code";
import { wrapLinkContent } from "./link";

export const remarkPlugins: RemarkPlugins = [codeBlock];

export const rehypePlugins: RehypePlugins = [
  [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
  wrapLinkContent,
  [
    rehypePrettyCode,
    {
      theme: createCssVariablesTheme({
        name: "css-variables",
        variablePrefix: "--shiki-",
      }),
      keepBackground: true,
      transformers: [
        transformerNotationDiff(),
        transformerMetaWordHighlight(),
        transformerMetaHighlight(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel({
          classActivePre: "has-error",
        }),
      ],
    },
  ],
];
