<script>
    import Login from "./Login.svelte";
    const _user = "YWI6d2hhdA==";
    const user = localStorage.getItem("user");
</script>

<div>
    {#if _user == user}
        <slot />
    {:else}
        <Login />
    {/if}
</div>
