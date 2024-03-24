const MENU_SELECTOR = "[data-toggle-menu]";
function attachEvent(selector, event, fn) {
  const matches =
    typeof selector === "string"
      ? document.querySelectorAll(selector)
      : selector;
  if (matches && matches.length) {
    matches.forEach((elem) => {
      elem.addEventListener(event, (e) => fn(e, elem), false);
    });
  }
}

const onLoad = () => {
  let lastKnownScrollPosition = window.scrollY;
  let ticking = true;

  attachEvent("#nav", "click", function () {
    document.querySelector(MENU_SELECTOR)?.classList.remove("expanded");
    document.body.classList.remove("overflow-hidden");
    document.getElementById("header")?.classList.remove("h-screen");
    document.getElementById("header")?.classList.remove("expanded");
    document.getElementById("header")?.classList.remove("bg-page");
    document.querySelector("#nav")?.classList.add("hidden");
  });

  attachEvent("[data-toggle-menu]", "click", function (_, elem) {
    elem.classList.toggle("expanded");
    document.body.classList.toggle("overflow-hidden");
    document.getElementById("header")?.classList.toggle("h-screen");
    document.getElementById("header")?.classList.toggle("expanded");
    document.getElementById("header")?.classList.toggle("bg-page");
  });

  let screenSize = window.matchMedia("(max-width: 767px)");
  screenSize.addEventListener("change", function () {
    document.querySelector(MENU_SELECTOR)?.classList.remove("expanded");
    document.body.classList.remove("overflow-hidden");
    document.getElementById("header")?.classList.remove("h-screen");
    document.getElementById("header")?.classList.remove("expanded");
    document.getElementById("header")?.classList.remove("bg-page");
  });
};

const onPageShow = () => {
  const elem = document.querySelector(MENU_SELECTOR);

  if (elem) {
    elem.classList.remove("expanded");
  }
  document.body.classList.remove("overflow-hidden");
  document.getElementById("header")?.classList.remove("h-screen");
  document.getElementById("header")?.classList.remove("expanded");
};

window.onload = onLoad;
window.onpageshow = onPageShow;

document.addEventListener("astro:after-swap", () => {
  onLoad();
  onPageShow();
});
