<script>
    import SumInput from "./SumInput.svelte";

    const actionURL = import.meta.env.DEV ? "http://localhost:5040/ripen/new" : "new";

    // method="post"
    // action={actionURL}

    function onSubmit(e) {
        const formData = new FormData(e.target);

        console.log(formData)

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        console.log('pipa', data)

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
</script>

<form class="main-form" on:submit|preventDefault={onSubmit}>
    <div>
        <label class="text-view">Вид расхода</label>
        <br />
        <select class="input-field" name="category">
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
        <label class="text-view">Наименование</label>
        <input class="input-field" name="subCategory" type="text" />
    </div>

    <div>
        <label class="text-view">расход/доход</label>

        <div>
            <input type="radio" id="huey" name="io" value="опер" checked />
            <label class="text-view" for="huey">опер</label>

            <input type="radio" id="dewey" name="io" value="доход" />
            <label class="text-view" for="dewey">доход</label>

            <input type="radio" id="louie" name="io" value="инвест" />
            <label class="text-view" for="louie">инвест</label>
        </div>
    </div>

    <div>
        <label class="text-view" for="date">Дата</label>

        <input
            class="input-field"
            name="date"
            type="date"
            value={new Date().toJSON().slice(0, 10)}
        />
    </div>

    <SumInput />

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
        height: 100px;
        width: 150px;
        font-size: 20px;
        background-color: grey;
        border-radius: 18px;
    }

    .input-field {
        font-size: 20px;
        height: 30px;
        width: 200px;
        color: rgb(68, 67, 67);
        background-color: rgb(165, 163, 163);
    }

    .text-view {
        /* color: grey; */
        font-family: Arial, Helvetica, sans-serif;
    }

    /* .hidden {
        display: none;
    } */
</style>
