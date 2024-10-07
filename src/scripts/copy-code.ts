function domCopy(text: string) {
  const pre = document.createElement("pre");
  Object.assign(pre.style, {
    opacity: "0",
    pointerEvents: "none",
    position: "absolute",
    overflow: "hidden",
    left: "0",
    top: "0",
    width: "20px",
    height: "20px",
    webkitUserSelect: "auto",
    userSelect: "all",
  });
  pre.ariaHidden = "true";
  pre.textContent = text;
  document.body.appendChild(pre);

  const range = document.createRange();
  range.selectNode(pre);
  const selection = getSelection();
  if (!selection) return false;
  selection.removeAllRanges();
  selection.addRange(range);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    document.body.removeChild(pre);
  }
  return ok;
}

async function clickHandler(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const dataset = button.dataset as { code: string; copied: string };
  const code = dataset.code.replace(/\u007f/g, "\n");
  try {
    await navigator.clipboard.writeText(code);
  } catch (err) {
    domCopy(code);
  }

  let checkmark: HTMLSpanElement | null = button.querySelector(
    ".copy-code-checkmark"
  );

  const showCheck = () => {
    button.classList?.add("copied");
  };
  const hideCheck = () => {
    button.classList?.remove("copied");
  };

  showCheck();

  setTimeout(hideCheck, 1500);
  button.addEventListener("blur", hideCheck);
  checkmark?.addEventListener("transitioncancel", hideCheck);
  checkmark?.addEventListener("transitionend", hideCheck);
}

// Define a function that searches a node for matching buttons and initializes them
// unless the node does not support querySelectorAll (e.g. a text node)
const initButtons = (container: ParentNode | Document) => {
  if (!container.querySelectorAll) return;
  container
    .querySelectorAll("[data-copy-btn]")
    .forEach((btn) => btn.addEventListener("click", clickHandler));
};

initButtons(document);

const newButtonsObserver = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    mutation.addedNodes.forEach((node) => {
      initButtons(node as ParentNode);
    })
  )
);

newButtonsObserver.observe(document.body, { childList: true, subtree: true });

// Also re-initialize all buttons after view transitions initiated by popular frameworks
document.addEventListener("astro:page-load", () => {
  initButtons(document);
});

// @ts-ignore
globalThis.domCopy = clickHandler;
