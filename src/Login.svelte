<script>
    let name;
    let password;

    const handleSubmit = (e) => {
        let loginFields = btoa(`${name}:${password}`);
        localStorage.setItem("user", loginFields);
        location.reload();
    };
</script>

<h3>Login</h3>
<form on:submit|preventDefault={handleSubmit}>
    <input
        class="form-field"
        bind:value={name}
        type="text"
        placeholder="Name"
    />
    <input
        class="form-field"
        bind:value={password}
        type="password"
        placeholder="Password"
    />
    <button class="form-field"> Login </button>
</form>
