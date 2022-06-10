<script>
    import SumInput from "./SumInput.svelte";
    import { onMount } from "svelte";
    import { csvURL } from "../api";

    const actionURL = import.meta.env.DEV ? "http://localhost:5040/new" : "new";

    const counts = {};
    let frequentTrs = [];

    onMount(() => {
        fetch(csvURL)
            .then((res) => res.text())
            .then((csv) => {
                const trs = csv.trim().split("\n");
                let transactions = trs
                    .slice(trs.length - 200)
                    .map((item) => item.split(",").slice(0, 3).toString());
                for (const num of transactions) {
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                let sortedtrs = Object.entries(counts)
                    .sort(([, a], [, b]) => b - a)
                    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                frequentTrs = Object.keys(sortedtrs)
                    .slice(0, 6)
                    .map((i) => i.split(","));
            });
    });

    function onSubmit(e) {
        const formData = new FormData(e.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        fetch(actionURL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            document.location.reload();
        });
    }

    let categoryValue = "питание";
    let subCategoryValue = "";
    let invest = "опер";

    function onPressHotkey(hotkey) {
        categoryValue = hotkey[0];
        subCategoryValue = hotkey[1];
        invest = hotkey[2];
    }

    function onPressDelete(e) {
        e.preventDefault();

        const actionURL = import.meta.env.DEV
            ? "http://localhost:5040/deleteLastRow"
            : "deleteLastRow";
        fetch(actionURL, {
            method: "delete",
        }).then(() => {
            document.location.reload();
        });
    }
</script>

<form class="main-form" on:submit|preventDefault={onSubmit}>
    <div>
        <select class="input-field" name="category" bind:value={categoryValue}>
            <option>питание</option>
            <option>транспорт</option>
            <option>здоровье</option>
            <option>ЖКХ</option>
            <option>одежда</option>
            <option>развлечения</option>
            <option>подарки</option>
            <option>бытовуха</option>
            <option>интернет и связь</option>
            <option>прочее</option>
            <option>животные</option>
            <option>здоровье</option>
            <option>доход</option>
        </select>
    </div>

    <div>
        <input
            placeholder="наименование"
            class="input-field"
            name="subCategory"
            type="text"
            bind:value={subCategoryValue}
        />
    </div>

    <div class="center">
        <tr>
            <input
                type="radio"
                id="huey"
                name="io"
                value="опер"
                bind:group={invest}
                checked
            />
            <td><label class="text-view" for="huey">опер</label></td>

            <input
                type="radio"
                id="dewey"
                name="io"
                value="доход"
                bind:group={invest}
            />
            <td><label class="text-view" for="dewey">доход</label></td>

            <input
                type="radio"
                id="louie"
                name="io"
                value="инвест"
                bind:group={invest}
            />
            <td><label class="text-view" for="louie">инвест</label></td>
        </tr>
    </div>

    <div>
        <input
            class="input-field"
            name="date"
            type="date"
            value={new Date().toJSON().slice(0, 10)}
        />
    </div>

    <SumInput />

    <div>
        {#each frequentTrs as item}
            <button class="hotkey-button" on:click={() => onPressHotkey(item)}
                >{item[1]}</button
            >
        {/each}
    </div>

    <button class="save-button" type="submit">Сохранить</button>

    <button class="delete-button" on:click={onPressDelete}>Удалить</button>
</form>

<style>
    .center {
        width: 85%;
        margin: 0 auto;
    }
    td {
        border: 1px solid rgb(209, 209, 196);
        border-radius: 10px;
        height: 30px;
        width: 80px;
        color: gray;
    }
    input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    input[type="radio"]:checked + td {
        background-color: grey;
        color: rgb(216, 216, 216);
    }
    .main-form {
        max-width: 350px;
        margin: 0 auto;
        font-size: x-large;
        text-align: center;
    }

    .save-button {
        margin: 4px;
        height: 100px;
        width: 150px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(216, 216, 216);
        background-color: rgba(54, 78, 55);
        border-radius: 30px;
    }
    .delete-button {
        margin: 4px;
        height: 100px;
        width: 150px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(216, 216, 216);
        background-color: rgb(107, 77, 74);
        border-radius: 30px;
    }

    .input-field {
        margin: 4px;
        margin-top: 8px;
        font-size: 20px;
        height: 25px;
        width: 300px;
        text-align: center;
        color: rgb(68, 67, 67);
        background-color: rgb(165, 163, 163);
    }

    .text-view {
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .hotkey-button {
        padding: 0;
        margin: 2px;
        height: 30px;
        width: 100px;
        font-size: 10px;
        color: rgb(216, 216, 216);
        background-color: grey;
        border-radius: 10px;
        vertical-align: middle;
    }

    ::placeholder {
        color: rgb(216, 216, 216);
        font-size: 1em;
        text-align: center;
    }
</style>
