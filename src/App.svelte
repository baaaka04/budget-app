<script>
    import Table from "./lib/Table.svelte";
    import Form from "./lib/Form.svelte";
    import imgHome from "./icons/home.svg";
    import imgPiechart from "./icons/piechart.svg";
    import PieChart from "./lib/PieChart.svelte";
    import { Router, Link, Route } from "svelte-navigator";
    import AuthWrapper from "./AuthWrapper.svelte";
</script>

<div>
    <AuthWrapper>
        <Router primary={false}>
            <div>
                <Route path="/">
                    <Table />
                    <Form />
                </Route>
                <Route path="/pie">
                    <PieChart />
                </Route>
            </div>
            <div class="nav-panel">
                <nav>
                    <Link to="/"><img src={imgHome} alt="" /></Link>
                    <Link to="pie"><img src={imgPiechart} alt="" /></Link>
                </nav>
            </div>
        </Router>
    </AuthWrapper>
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
