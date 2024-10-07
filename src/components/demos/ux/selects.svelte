<script lang="ts">
  import { Select } from "bits-ui";
  let selectedTheme = "";
  const themes = [
    { value: "light-monochrome", label: "Light Monochrome" },
    { value: "dark-green", label: "Dark Green" },
    { value: "svelte-orange", label: "Svelte Orange" },
    { value: "punk-pink", label: "Punk Pink" },
  ];
  export let onSelectedChange = (v) => {
    selectedTheme = v.value;
  };
</script>

<div>
  {selectedTheme}
  <Select.Root items={themes} {onSelectedChange}>
    <Select.Trigger class="select-trigger" aria-label="Select a theme">
      <Select.Value class="text-sm" placeholder="Select a theme" />
    </Select.Trigger>
    <Select.Content class="select-content" sideOffset={8}>
      {#each themes as theme}
        <Select.Item
          class="select-item"
          value={theme.value}
          label={theme.label}
        >
          {theme.label}
          <Select.ItemIndicator class="select-item-indicator" asChild={false}>
            check
          </Select.ItemIndicator>
        </Select.Item>
      {/each}
    </Select.Content>
    <Select.Input name="favoriteFruit" />
  </Select.Root>
</div>
