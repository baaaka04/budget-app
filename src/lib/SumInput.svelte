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
        <div class="hidden">
            <button type="button" on:click={onPressOperation}>+</button>
            <button type="button" on:click={onPressOperation}>-</button>
            <button type="button" on:click={onPressOperation}>/</button>
            <button type="button" on:click={onPressOperation}>*</button>
            <button type="button" on:click={onPressOperation}>=</button>
            <button type="button" on:click={onPressC}>C</button>
        </div>
    {/if}

    <label for="inputValue" class="text-view">Сумма</label>

    <input
        class="input-field"
        name="inputValue"
        type="number"
        pattern="\d*"
        id="calc-source"
        bind:value={inputValue}
    />

    <button type="button" on:click={hideButtons}>Calc</button>
</div>

<style>
    .input-field {
        font-size: 20px;
        height: 30px;
        width: 150px;
        color: rgb(68, 67, 67);
        background-color: rgb(165, 163, 163);
    }
</style>
