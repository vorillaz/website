<script lang="ts">
  import Copy from "../icons/Copy.svelte";
  import Check from "../icons/Check.svelte";
  export let code;

  const copyCode = (e) => {
    domCopy(e);
  };
</script>

<button
  on:click={copyCode}
  class="copy-btn"
  data-id="cp"
  data-copy-btn
  data-code={code}
>
  <span data-id="copy-icon" class="btn-holder btn-icon-copy">
    <Copy />
  </span>

  <span data-id="check-icon" class="btn-holder btn-icon-check">
    <Check />
  </span>
</button>
