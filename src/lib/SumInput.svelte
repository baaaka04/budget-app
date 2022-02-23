<script>
    let areButtonsVisible = false;
    let sum = "";
    let calc = "";
    let action = "";

    function hideButtons() {
        areButtonsVisible = !areButtonsVisible;
    }

    function onPressOperation() {
        calc = sum;
        sum = "";
        action = this.innerHTML;
    }

    function onPressEquals() {
        switch (action) {
            case "+":
                sum += calc;
                break;
            case "-":
                sum = String(Number(calc) - Number(sum));
                break;
            case "/":
                sum = String(Number(calc) / Number(sum));
                break;
            case "*":
                sum = String(Number(calc) * Number(sum));
                break;

            default:
                break;
        }
    }
</script>

<div>
    {#if areButtonsVisible}
        <div class="hidden">
            <button type="button" on:click={onPressOperation}>+</button>
            <button type="button" on:click={onPressOperation}>-</button>
            <button type="button" on:click={onPressOperation}>/</button>
            <button type="button" on:click={onPressOperation}>*</button>
            <button type="button" on:click={onPressEquals}>=</button>
        </div>
    {/if}

    <label class="text-view">Сумма</label>

    <input
        class="input-field"
        name="sum"
        type="number"
        pattern="\d*"
        id="calc-source"
        bind:value={sum}
    />

    <button type="button" on:click={hideButtons}>Calc</button>
</div>
