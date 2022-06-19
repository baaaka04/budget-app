<script>
    import { PieChart } from "@carbon/charts-svelte";
    import { csvURL } from "../api.js";
    import { groupBy, getJSONfromCSV } from "../utilis";
    import "@carbon/charts/styles.css";
    let csv = [];
    fetch(csvURL, {
        method: "get",
        headers: {
            Authorization: `Basic ${localStorage.getItem("user")}`,
        },
    })
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            const jsontrs = getJSONfromCSV(data).filter(
                (trs) => trs.opex == "опер"
            );
            const nip = groupBy(jsontrs.slice(1), "category");

            let accumulatedExp = Object.entries(nip).map(([group, arr]) => {
                return {
                    group,
                    value: 0 - arr.reduce((prev, cur) => prev + +cur.sum, 0),
                };
            });
            csv = accumulatedExp;
        });
</script>

<div>
    <PieChart
        data={csv}
        options={{
            title: "Расходы",
            resizable: true,
            legend: {
                alignment: "center",
            },
            pie: {
                alignment: "center",
            },
            height: "300px",
        }}
    />
</div>

<style>
</style>
