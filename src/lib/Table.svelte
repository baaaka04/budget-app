<script>
    import { onMount } from "svelte";
    import { csvURL } from "../api";

    let transactions = [];

    onMount(() => {
        fetch(csvURL, {
            method: "get",
            headers: {
                Authorization: `Basic ${localStorage.getItem("user")}`,
            },
        })
            .then((res) => res.text())
            .then((csv) => {
                const trs = csv.trim().split("\n");
                transactions = trs
                    .slice(trs.length - 5)
                    .map((line) => line.split(","))
                    .map((array) => {
                        const category = array[0];
                        const subCategory = array[1];
                        const opex = array[2];
                        const date = array[3].slice(5);
                        const sum = array[4];

                        const obj = {
                            category: category,
                            subCategory: subCategory,
                            opex, // упрощение синтаксиса двух строк выше
                            date,
                            sum,
                        };
                        return obj;
                    });
            });
    });
</script>

<table class="table-appearance" style="width:100%">
    <thead>
        <tr>
            <th>Вид расхода</th>
            <th>Наименование</th>
            <th>инвест/опер</th>
            <th>Дата</th>
            <th>Сумма</th>
        </tr>
    </thead>

    <tbody>
        {#each transactions as item}
            <tr>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.opex}</td>
                <td style="width:40px">{item.date}</td>
                <td>{item.sum}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .table-appearance,
    th,
    td {
        border: 1px solid rgb(209, 209, 196);
        color: gray;
        border-spacing: 0px;
        border-collapse: collapse;
    }
</style>
