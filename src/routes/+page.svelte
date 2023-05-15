<script lang="ts">
    import Wizard from "$lib/Wizard.svelte";
    import {showWizard} from '../stores';

    let formProp:HTMLFormElement;
</script>

<div class="app">
<h1>Welcome to Consulting Ninja!</h1>
<p>Visit <a href="https://kit.svelte.dev"><strong>@ConsultingNinja</strong></a> to see more great videos!</p>

<button on:click={()=> showWizard.set(true)}>Form</button>
</div>


<Wizard />



<svelte:head>
    <style>
        body{
            margin:0;
            background-color: #242424;
            color:#FFFFFF;
        }
    </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<style>
    a{
        text-decoration: none;
        color:#1034e8;
        font-weight: 800;
        font-size: 1.2em;
    }
    a:hover{
        text-decoration: underline;
    }
    .app{
     display:flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
    }

</style>