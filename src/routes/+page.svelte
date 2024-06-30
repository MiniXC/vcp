<style>
    .container {
        background-color: rgb(26, 26, 26);
        width: 100vw;
        padding: 10em;
        position: absolute;
        left: 0;
        margin: 0;
        padding: 0;
    }
</style>

<script>
    import Speech from './speech.svelte';
    import Login from './login.svelte';
  
    import { onMount } from 'svelte';

    import { HfInference } from '@huggingface/inference'

    import randomTrope from '$lib/tropes/random-trope.js';
    import Response from './response.svelte';

    let token = sessionStorage.getItem('accessToken');
    // check if token is undefined
    if (token === 'undefined') {
        token = undefined;
    }

    onMount(() => {
        if (!token) return;
        const inference = new HfInference(token);

        let archetype = randomTrope('archetypes');
        let backstory = randomTrope('backstories');
        let characterisation = randomTrope('characterisations');
        let device = randomTrope('devices');
        let flaw = randomTrope('flaws');
        let job = randomTrope('jobs');
        let quirk = randomTrope('quirks');

        console.log(archetype, backstory, characterisation, device, flaw, job, quirk);

        document.querySelector('button').addEventListener('click', () => {
            let story = document.querySelector('textarea').value;
            // get tropes from local storage
            let tropes = localStorage.getItem('tropes');
            inference.chatCompletion({
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: [{
                    role: "user", 
                    content: `
                        Respond as a tree character who asked for a story on ${tropes}. 

                        ${story}

                        The tree character is called Miss Edith Rosemallow, aka Granny Rosemallow and is the village spinster.
                        Judge the story based on if it includes the tropes ${tropes}, and respond accordingly and in character.
                        Don't write more than one or two sentences.
                        Be scathing if the story doesn't include the tropes, but in a backhanded way.
                    `
                }],
                max_tokens: 100,
            }).then((out) => {
                let message = out.choices[0].message.content;
                document.querySelector('.chat-response').innerHTML = message;
                document.querySelector('.chat-response-wrapper').style.display = 'block';
            });
        });

        inference.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [{
                role: "user", 
                content: `
                    Select two random tropes from the following: ${archetype}, ${backstory}, ${characterisation}, ${device}, ${flaw}, ${job}, ${quirk}.
                    Only two tropes are allowed, separated by commas. 
                    Don't select explicit or potentially offensive tropes.
                `
            }],
            max_tokens: 100,
        }).then((out) => {
            let tropes = out.choices[0].message.content
            // save to local storage
            localStorage.setItem('tropes', tropes);
            inference.chatCompletion({
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: [{
                    role: "user", 
                    content: `
                        I have selected the following tropes: ${tropes}. 
                        Please generate a short story prompt based on these tropes.
                        Formulate it as a request from a tree character to a human player to tell a story.
                        The tree in question is called Miss Edith Rosemallow, aka Granny Rosemallow.
                        The village spinster. She is a kindly woman who values propriety and politeness above all else.
                        Granny is very quiet about her youth, and refuses to say anything about her late sister.
                        She is a devout churchgoer, but has been overshadowed by Lady Pearwood since her arrival.
                        She is currently in a train station, and asks you for a story. You are human, and she is a tree.
                        Make the request not longer than one or two sentences, and use proper quotation marks.
                        Make sure to not mention the tropes ${tropes} by name, but are still obvious.
                    `
                }],
                max_tokens: 100,
            }).then((out) => {
                let message = out.choices[0].message.content;
                document.querySelector('.chat').innerHTML = message;
            });
        });
    });
</script>

<div class="rpgui-content rpgui-cursor-default container">
    {#if token}
            <Speech text="Loading..."/>
            <Response/>
    {:else}
        <Login/>
    {/if}
</div>
