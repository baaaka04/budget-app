<script>
    let areButtonsVisible = false;
    let inputValue = "";
    let calc = "";
    let action = "";

    function hideButtons() {
        areButtonsVisible = !areButtonsVisible;
    }

    function onPressC() {
        calc = "";
        action = "";
        inputValue = "";
    }

    function onPressOperation(event) {
        let preAction = action;
        action = event.target.innerHTML;
        if (calc !== "") {
            switch (preAction) {
                case "+":
                    inputValue = String(Number(calc) + Number(inputValue));
                    break;
                case "-":
                    inputValue = String(Number(calc) - Number(inputValue));
                    break;
                case "/":
                    inputValue = String(Number(calc) / Number(inputValue));
                    break;
                case "*":
                    inputValue = String(Number(calc) * Number(inputValue));
                    break;

                default:
                    break;
            }
        }
        calc = inputValue;
    }
</script>

<div>
    {#if areButtonsVisible}
        <div>
            <button type="button" class="calc-button" on:click={onPressOperation}>+</button>
            <button type="button" class="calc-button" on:click={onPressOperation}>-</button>
            <button type="button" class="calc-button" on:click={onPressOperation}>/</button>
            <button type="button" class="calc-button" on:click={onPressOperation}>*</button>
            <button type="button" class="calc-button" on:click={onPressOperation}>=</button>
            <button type="button" class="calc-button" on:click={onPressC}>C</button>
        </div>
    {/if}

    <input
        placeholder="cумма"
        class="input-field"
        name="inputValue"
        type="number"
        pattern="\d*"
        id="calc-source"
        bind:value={inputValue}
    />

    <button type="button" class="calc-button" on:click={hideButtons}>[ ]</button>
</div>

<style>
    .input-field {
        margin: 4px;
        font-size: 20px;
        height: 30px;
        width: 250px;
        color: rgb(68, 67, 67);
        background-color: rgb(165, 163, 163);
    }
    ::placeholder {
        color: rgb(216, 216, 216);
        font-size: 1em;
        text-align: center;
}
    .calc-button {
        padding: 0;
        margin: 4px;
        height: 40px;
        width: 40px;
        color:rgb(216, 216, 216);
        font-size: 0.7em;
        background-color: grey;
        border-radius: 5px;
    }
</style>
