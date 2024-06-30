<script>
    import { onMount } from 'svelte';

    import { authUrl } from '$lib/oauth.js';

    onMount(() => {
        document.querySelector('.login').href = authUrl
    });
</script>

<style>
    h1 {
        margin-top: 2em;
        font-size: 3em;
    }
    .wrapper {
        text-align: center;
        overflow: hidden;
    }
    .login {
        width: fit-content;
        display: inline-block;
    }
    .login span {
        font-size: 2em;
    }
    .login::before, .login::after {
        margin-top: -.7em;
    }
    .wrapper > p {
        width: min(80%, 800px);
        text-align: center;
        /* remove underline */
        text-decoration: none;
        display: inline-block;
    }
</style>

<div class="wrapper">
<h1>Victorian Tree Party</h1>
<a class="login rpgui-button golden" href="/">
    <p>Sign in with HuggingFace <span>🤗</span>
    </p>
</a>
<br>
<p>
    In this game, you will talk to a tree character, who will ask you to tell a story.
</p>
</div>