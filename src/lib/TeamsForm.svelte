<script lang='ts'>
import {teams} from '../stores';



function addTeam(){
    const newTeams = [...$teams];
    newTeams.push({name: `Team ${$teams.length.toString()}`,players:[],expanded:false})
    teams.set(newTeams)
}

</script>


<form>
    <div class="item-wrap">
        <label for="addTeam">Add Team</label>
        <button name="addTeam" type="button" on:click={addTeam}><span class="material-symbols-outlined">
            add
            </span></button>
    </div>

    {#each $teams as team, teamsIndex}
        <label for="teamName">Team Name:</label>
        <input required name="teamName" type="text" bind:value={$teams[teamsIndex].name}/>
    {/each}

</form>


<style>
    form{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        overflow:scroll;
        transition: all 0.2s ease-in;
		transition: all 0.2s ease-out;
    }
    form input{
        margin-bottom: 1em;
    }
    button{
        background-color: rgba(255, 255, 255,0);
        cursor: pointer;
        margin:.2em;
    }
    button:hover{
        background-color: rgba(0, 0, 0,0.1);
    }
    .item-wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin:.5em;
		transition: all 0.2s ease-in;
		transition: all 0.2s ease-out;
    }

</style>