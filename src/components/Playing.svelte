<script>
  const fetchSpotify = (async () => {
    const response = await fetch("/api/spotify");
    return await response.json();
  })();
</script>

{#await fetchSpotify then data}
  {#if data && data.title}
    <span class="flex gap-half baseline">
      <span class="bars">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </span>
      <span>Now listening to {data.title} by {data.artist}</span>
    </span>
  {/if}
{:catch}
  ""
{/await}
