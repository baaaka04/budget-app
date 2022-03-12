<script>
    import Table from "./lib/Table.svelte";
    import Form from "./lib/Form.svelte";

    let page = "home";
</script>

<div>
    <button type="button" on:click={() => page = "home"}>Home</button>
    <button type="button" on:click={() => page = "pie" }>PieChart</button>

    {#if page === "home"}
        <Table />
        <Form />
    {:else if page === "pie"}
        <p>Ну типа</p>
    {/if}
</div>

<style>
    :root {
        color: #eee;
        background-color: black;
    }
</style>
