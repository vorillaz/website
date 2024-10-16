<script lang="ts">
  import Tabs from "./Tabs.svelte";
  import Tablist from "./Tablist.svelte";
  import Tab from "./Tab.svelte";
  import Tabpanel from "./Tabpanel.svelte";
  import CopyBtn from "./CopyBtn.svelte";

  export let npmCode = "";
  export let yarnCode = "";
  export let pnpmCode = "";

  export let npmCommand = "";
  export let yarnCommand = "";
  export let pnpmCommand = "";
</script>

<Tabs persist key="package-manager">
  <Tablist>
    <Tab tabClass="mono">npm</Tab>
    <Tab tabClass="mono">pnpm</Tab>
    <Tab tabClass="mono">yarn</Tab>
  </Tablist>
  <div>
    <div class="tabbed-code-wrapper">
      <div class="code-header shallow flex space-between center px-1">
        <div class="code-filename flex center gap-half">
          <div class="code-icon">
            <div class="flex gap-half">
              <div class="t-dot"></div>
              <div class="t-dot"></div>
              <div class="t-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <Tabpanel>
        <div class="flex py-almost-half px-1 space-between gap-1">
          <div class="flex gap-half flex-center overflow-y-auto">
            <span class="code-leader">❑</span>
            {@html npmCode}
          </div>
          <CopyBtn code={npmCommand} />
        </div>
      </Tabpanel>
      <Tabpanel>
        <div class="flex py-almost-half px-1 space-between gap-1">
          <div class="flex gap-half flex-center overflow-y-auto">
            <span class="code-leader">❑</span>
            {@html pnpmCode}
          </div>
          <CopyBtn code={pnpmCommand} />
        </div>
      </Tabpanel>
      <Tabpanel>
        <div class="flex py-almost-half px-1 space-between gap-1">
          <div class="flex gap-half flex-center overflow-y-auto">
            <span class="code-leader">❑</span>
            {@html yarnCode}
          </div>
          <CopyBtn code={yarnCommand} />
        </div>
      </Tabpanel>
    </div>
  </div>
</Tabs>
