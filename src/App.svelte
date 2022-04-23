<script>
    import Table from "./lib/Table.svelte";
    import Form from "./lib/Form.svelte";

    let page = "home";
</script>

<div>
    {#if page === "home"}
        <Table />
        <Form />
    {:else if page === "pie"}
        <p>Ну типа</p>
    {/if}

    <div class="nav-panel">
        <img
            src="src/icons/home.svg"
            alt=""
            on:click={() => {
                page = "home";
            }}
        />
        <img
            src="src/icons/piechart.svg"
            alt=""
            on:click={() => {
                page = "pie";
            }}
        />
    </div>
</div>

<style>
    .nav-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        position: fixed;
        background-color: rgb(45, 45, 54);
        width: 100%;
    }

    .nav-panel img {
        margin: 10px 20px 10px 20px;
        width: 40px;
    }

    :root {
        color: #eee;
        background-color: rgb(39, 39, 42);
    }
</style>
