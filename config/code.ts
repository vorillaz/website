import type { PhrasingContent, Paragraph, Root, Code } from "mdast";
import type { Properties, Result } from "hastscript";
import type { Transformer, Plugin } from "unified";
import type { Parent, Node } from "unist";

import { visit } from "unist-util-visit";
import { h as _h } from "hastscript";

let h = (
  el: string,
  attrs: Properties = {},
  children: unknown[] = []
): Paragraph => {
  let { properties, tagName } = _h(el, attrs);
  return {
    data: { hProperties: properties, hName: tagName },
    children: children as PhrasingContent[],
    type: "paragraph",
  };
};

const getLanguageName = (lang: string): string => {
  let languages: {
    [key: string]: undefined | string;
  } = {
    tsx: "React / TypeScript",
    jsx: "React / JavaScript",
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
    svelte: "Svelte",
    md: "Markdown",
    html: "HTML",
    bash: "Bash",
    json: "JSON",
    css: "CSS",
    sh: "Bash",
    vue: "Vue",
    python: "Python",
    ruby: "Ruby",
    go: "Go",
    php: "PHP",
    react: "React",
  };

  return languages[lang] ?? lang;
};

const parseMetaBlock = (meta: string) => {
  if (!meta) return { title: null, meta: "" };
  const titleMatch = meta.match(/title="([^"]*)"/);
  const title = titleMatch?.[1] ?? null;
  meta = meta.replace(titleMatch?.[0] ?? "", "");
  return { title, meta };
};

export const codeBlock: Plugin<[], Root> =
  (): Transformer<Root> => (tree: Node) => {
    visit(tree, "code", (node: Code, index: number, parent: Parent) => {
      const { lang, meta = "" } = node as Code;

      const { title, meta: metaBlock } = parseMetaBlock(meta as string);
      const html = h(
        "div",
        {
          class:
            "copy-code-wrapper" +
            (title ? " has-title" : "") +
            (lang ? ` code-language-${lang}` : ""),
        },
        [
          h(
            "div",
            {
              class: "copy-code-inner",
            },
            [
              // three dots
              h(
                "span",
                {
                  class: "dot-code-dots",
                },
                [
                  h("span", {
                    class: "dot-code-dot",
                  }),
                  h("span", {
                    class: "dot-code-dot",
                  }),
                  h("span", {
                    class: "dot-code-dot",
                  }),
                ]
              ),

              h("span", {
                class: "code-icon " + (lang ? `icon-language-${lang}` : ""),
              }),

              h(
                "span",
                {
                  class: "copy-code-title" + (title ? " has-title" : ""),
                },
                [
                  {
                    value: title ?? "",
                    type: "text",
                  },
                ]
              ),

              typeof lang === "string" &&
                h(
                  "span",
                  {
                    class: "copy-code-label sr-only",
                  },
                  [
                    {
                      value: "Code in " + getLanguageName(lang),
                      type: "text",
                    },
                  ]
                ),
              h(
                "button",
                {
                  "aria-label": "Copy code to clipboard",
                  class: "copy-code-button",
                  "data-code": node?.value,
                  "data-lang": lang,
                },
                [
                  h("span", {
                    class: "copy-code-button-icon",
                  }),
                ]
              ),
            ]
          ),
          node as unknown as Result,
        ]
      );

      parent.children[index] = html;
      // reasign meta
      node.meta = metaBlock;
    });
  };
