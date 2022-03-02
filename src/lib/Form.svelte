<script>
    import SumInput from "./SumInput.svelte";

    const actionURL = import.meta.env.DEV ? "http://localhost:5040/new" : "new";


    function onSubmit(e) {
        const formData = new FormData(e.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        fetch(actionURL, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
          document.location.reload()
        })

    }

    let categoryValue = 'питание';
    let subCategoryValue = '';
    let invest = 'опер';
    function onPressHealthy() {
        categoryValue = 'питание';
        subCategoryValue = 'здоровая пища';
        invest = 'опер';
    }
    function onPressCarsharing() {
        categoryValue = 'транспорт';
        subCategoryValue = 'каршеринг';
        invest = 'опер';
    }
    function onPressIncome() {
        categoryValue = 'доход';
        subCategoryValue = 'зарплата';
        invest = 'доход';
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
        <input placeholder="наименование" class="input-field" name="subCategory" type="text" bind:value={subCategoryValue}/>
    </div>

    <div>
            <input type="radio" id="huey" name="io" value="опер" bind:group={invest} checked />
            <label class="text-view" for="huey">опер</label>

            <input type="radio" id="dewey" name="io" value="доход" bind:group={invest}/>
            <label class="text-view" for="dewey">доход</label>

            <input type="radio" id="louie" name="io" value="инвест" bind:group={invest}/>
            <label class="text-view" for="louie">инвест</label>
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
        <button class="hotkey-button" on:click={onPressHealthy}>Здоровая пища</button>
        <button class="hotkey-button" on:click={onPressCarsharing}>Каршеринг</button>
        <button class="hotkey-button" on:click={onPressIncome}>Зарплата</button>
    </div>

    <div class="horizontalgap" style="width:10px" />

    <button class="save-button" type="submit">Сохранить</button>
</form>

<style>
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
        background-color: grey;
        border-radius: 30px;
    }

    .input-field {
        margin-top: 8px;
        font-size: 20px;
        height: 30px;
        width: 300px;
        color: rgb(68, 67, 67);
        background-color: rgb(165, 163, 163);
    }

    .text-view {
        font-family: Arial, Helvetica, sans-serif;
    }

    .hotkey-button {
        padding: 0;
        height: 30px;
        width: 65px;
        font-size: 10px;
        color: rgb(216, 216, 216);
        background-color: grey;
        border-radius: 5px;
        vertical-align: middle;
    }

    ::placeholder {
        color: rgb(216, 216, 216);
        font-size: 1em;
        text-align: center;
}

</style>
