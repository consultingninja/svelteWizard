<script lang="ts">

    import {showWizard, teams} from '../stores';
	import {defaultTeams} from '../types';
	import TeamsForm from "$lib/TeamsForm.svelte";
    import PlayersForm from "$lib/PlayersForm.svelte";

	let dialog:HTMLDialogElement;
	let currentStep = 1;

	$: if (dialog && $showWizard) dialog.showModal();
	$: if (dialog && !$showWizard) dialog.close();

	const numberOfSteps = 2;
	$:currentStep = 1;

	function handleNext(){
		if(currentStep < numberOfSteps)currentStep = currentStep +1;
	}	
	function handleBack(){
		if(currentStep > 1) currentStep = currentStep -1;
	}


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {showWizard.set(false); teams.set(defaultTeams)}}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		
		<div class="header">
			<h3 >Multi-part-form</h3>
			<progress id="wizard-progress" max={numberOfSteps} value={currentStep}> </progress>
		</div>
		<hr />

		{#if currentStep === 1}
		<TeamsForm  />
		{:else if currentStep === 2}
		<PlayersForm  />
		{/if}


		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>cancel</button>
		{#if currentStep > 1}
		<button on:click={handleBack}>back</button>
		{/if}
		{#if currentStep !== numberOfSteps}
		<button on:click={handleNext}>next</button>
		{/if}


	</div>
</dialog>

<style>
	dialog {
		max-width: 40em;
		min-width: 60vw;
		border-radius: 0.2em;
		border: none;
		padding: .5em;
		transition: all 0.2s ease-in;
		transition: all 0.2s ease-out;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button:hover {
		cursor: pointer;
	}
	.header{
		text-align: center;
	}
</style>