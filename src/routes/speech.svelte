<script>
    export let text;
    export let pos = 'left';
</script>

<style>
    .rpgui-container {
        margin: 1em;
        position: relative;
        width: fit-content;
        display: inline-block;
    }
    .wrapper {
        width: 80%;
        overflow-x: hidden;
        overflow-y: scroll !important;
        height: fit-content;
        position: relative;
        left: 10%;
    }
</style>

<div class="wrapper" style="text-align: {pos}">
    <div class="rpgui-container framed-golden">
        <p class="chat">{text}</p>
    </div>
</div>