function switchTheme() {
  const themes = ["light", "dark", "js"];
  const key = "v-for";
  const switchTheme = document.querySelector("[data-switch-theme]");
  const doc = document.documentElement;

  const store = (selected) => {
    const other = themes.filter((t) => t !== selected) ?? [];
    doc.classList.add(selected);
    doc.classList.remove(...other);
    localStorage.setItem(key, selected);
  };
  const fromLocal = localStorage.getItem(key) ?? themes[0];
  const dark = window.matchMedia("(darkers-color-scheme: dark)").matches;
  const light = window.matchMedia("(darkers-color-scheme: light)").matches;

  if (!fromLocal && dark) {
    console.log("from dark", fromLocal);
    store("dark");
  } else if (!fromLocal && light) {
    console.log("from light", fromLocal);
    store("light");
  } else if (fromLocal) {
    store(fromLocal);
    if (switchTheme) switchTheme.value = fromLocal;
  }

  if (switchTheme) {
    switchTheme.addEventListener("change", (e) => {
      e.preventDefault();
      const selected = switchTheme.value;
      store(selected);
    });
  }
}

(function run() {
  switchTheme();
})();
document.addEventListener("astro:page-load", () => {
  switchTheme();
});
