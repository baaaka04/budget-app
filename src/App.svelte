<script>
    import Table from "./lib/Table.svelte";
    import Form from "./lib/Form.svelte";
    import imgHome from "./icons/home.svg";
    import imgPiechart from "./icons/piechart.svg";
    import PieChart from "./lib/PieChart.svelte";

    let page = "home";
</script>

<div>
    {#if page === "home"}
        <Table />
        <Form />
    {:else if page === "pie"}
        <PieChart />
    {/if}

    <div class="nav-panel">
        <img
            src={imgHome}
            alt=""
            on:click={() => {
                page = "home";
            }}
        />
        <img
            src={imgPiechart}
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
