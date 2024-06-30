<style>
    .wrapper {
        width: 70%;
        overflow: hidden;
        height: fit-content;
        position: relative;
        left: 15%;
        text-align: center;
    }
    .rpgui-container {
        margin: 1em;
        position: relative;
        width: fit-content;
        display: inline-block;
        overflow-y: scroll !important;
    }
    .chat-response-wrapper {
        display: none;
    }
</style>

<div class="wrapper">
    <label for="story">Response:</label>
    <textarea placeholder="write your story here..."></textarea>
    <button type="button" class="rpgui-button"><p>Submit</p></button>
    <div class="rpgui-container framed-golden chat-response-wrapper">
        <p class="chat-response"></p>
    </div>
</div>