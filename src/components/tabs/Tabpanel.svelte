<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  export let panelClass = "";
  const panel = {};
  const { registerPanel, selectedPanel } = getContext(TABS);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div class={panelClass}>
    <slot></slot>
  </div>
{/if}
