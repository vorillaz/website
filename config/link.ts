import { visit } from "unist-util-visit";

export const wrapLinkContent = () => (tree: any) => {
  // wrap content with <span> tag
  visit(tree, "element", (node: any) => {
    if (node.tagName === "a") {
      node.children = [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["link-content"] },
          children: node.children,
        },
      ];
    }
  });
};
