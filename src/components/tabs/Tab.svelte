<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";
  export let tabClass = "";

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);
  registerTab(tab);
</script>

<button
  class="tab-btn {tabClass}"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot></slot>
</button>

<style>
</style>
