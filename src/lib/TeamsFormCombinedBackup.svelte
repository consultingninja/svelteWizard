<script lang='ts'>
import {teams} from '../stores';
import {defaultPlayer} from '../types'

let formElement:HTMLFormElement;

function addTeam(){
    const newTeams = [...$teams];
    newTeams.push({name: `Team ${$teams.length}`,players:[],expanded:true})
    teams.set(newTeams)
}
function addPlayer(index:number){
    let newTeams = [...$teams];
    let Team = newTeams[index];
    Team.players.push({...defaultPlayer,name:`player ${Team.players.length}`});
    newTeams.splice(index,1,Team);
    teams.set(newTeams)
}

function toggleExpand(index:number){
    let newTeams = [...$teams];
    let Team = newTeams[index];
    Team.expanded = !Team.expanded;
    newTeams.splice(index,1,Team);
    teams.set(newTeams);
    console.log(index);
    console.log(newTeams[index].expanded)

}


</script>


<form bind:this={formElement} >
    <div class="item-wrap">
        <label for="addTeam">Add Team</label>
        <button name="addTeam" type="button" on:click={addTeam}><span class="material-symbols-outlined">
            add
            </span></button>
    </div>

    {#each $teams as team, teamsIndex}

        <label for="teamName">Team Name:</label>
        <input name="teamName" type="text" value={team.name}/>
        <div class="item-wrap">
            <label for="addPlayer">Add Player</label>
            <button name="addPlayer" type="button" on:click={()=> addPlayer(teamsIndex)}><span class="material-symbols-outlined">
                add
                </span></button>
                {#if !team.expanded}
                <button name="expandTeam" type="button" on:click={()=> toggleExpand(teamsIndex)}><span class="material-symbols-outlined">
                    expand_more
                    </span></button>
                {:else}
                <button name="expandTeam" type="button" on:click={()=> toggleExpand(teamsIndex)}><span class="material-symbols-outlined">
                    expand_less
                    </span></button>
                {/if}
        </div>


        {#if team.expanded}
        {#each team.players as player, playerIndex}
        <div class="player-wrapper">
            <div>
                <label for="playerName">Player Name:</label>
                <input value={player.name} name="playerName" type="text"/>
            </div>
            <div>
                <label for="playerAge">Player Age:</label>
                <input value={player.age} name="playerAge" type="number"/>
            </div>
            <div>
                <label for="playerPosition">Player Position:</label>
                <input value={player.position} name="playerPosition" type="text"/>
            </div>
            <div>
                <label for="playerJersey">Jersey:</label>
                <input value={player.jersey} name="playerJersey" type="number"/>
            </div>

        </div>
        {/each}
        {#if !team.players.length}
        <p>No Players on Team</p>
        {/if}
        {/if}
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
    .player-wrapper{
        display: flex;
        flex-direction: row;
        margin-bottom: .5em;
		transition: all 0.2s ease-in;
		transition: all 0.2s ease-out;
    }
    .player-wrapper input:last-child{
        margin-bottom: 1em;
    }
</style>