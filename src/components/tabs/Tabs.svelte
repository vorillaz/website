<script context="module">
  export const TABS = {};
</script>

<script>
  import { setContext, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { useLocalStorage } from "@/lib/storage";
  // Props
  export let persist = false;
  export let key = "tabs";

  const storage = persist
    ? useLocalStorage(key)
    : { get: () => {}, set: () => {} };

  const tabs = [];
  const panels = [];
  const selectedTab = writable(null);
  const selectedPanel = writable(null);

  setContext(TABS, {
    registerTab: (tab) => {
      tabs.push(tab);
      selectedTab.update((current) => {
        return current || tab;
      });

      onDestroy(() => {
        const i = tabs.indexOf(tab);
        tabs.splice(i, 1);
        selectedTab.update((current) => {
          return current === tab ? tabs[i] || tabs[tabs.length - 1] : current;
        });
      });
    },

    registerPanel: (panel) => {
      panels.push(panel);
      selectedPanel.update((current) => {
        return current || panel;
      });

      onDestroy(() => {
        const i = panels.indexOf(panel);
        panels.splice(i, 1);
        selectedPanel.update((current) =>
          current === panel ? panels[i] || panels[panels.length - 1] : current
        );
      });
    },

    selectTab: (tab) => {
      const i = tabs.indexOf(tab);
      selectedTab.set(tab);
      selectedPanel.set(panels[i]);
      storage.set(i);
    },

    selectedTab,
    selectedPanel,
  });
</script>

<div class="tabs">
  <slot></slot>
</div>
