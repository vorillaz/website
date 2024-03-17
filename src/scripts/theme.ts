function setTheme(theme: string) {
  const themeBtns = document.querySelectorAll("[data-toggle-theme]");
  // remove all the data-theme attributes
  themeBtns.forEach((btn) => {
    btn.removeAttribute("data-toggle-theme-active");
  });

  // find the button with the selected theme and add the data-theme attribute
  const selected = document.querySelector(`[data-toggle-theme="${theme}"]`);
  selected?.setAttribute("data-toggle-theme-active", "selected");
}
function switchTheme() {
  const themes = ["light", "dark", "js"];

  const key = "v-for";
  const themeBtns = document.querySelectorAll("[data-toggle-theme]");
  const doc = document.documentElement;

  const store = (selected) => {
    const other = themes.filter((t) => t !== selected) ?? [];
    doc.setAttribute("data-theme", selected);
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
    if (themeBtns) {
      setTheme(fromLocal);
    }
  }

  if (themeBtns) {
    themeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const selected = btn.getAttribute("data-toggle-theme") as string;
        store(selected);
        setTheme(selected);
      });
    });
  }
}

(function run() {
  switchTheme();
})();

document.addEventListener("astro:page-load", () => {
  switchTheme();
});
