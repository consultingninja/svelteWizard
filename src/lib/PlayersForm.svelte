<script lang='ts'>
    import {teams,showWizard} from '../stores';
    import {defaultPlayer} from '../types';
    
    function addTeam(){
        const newTeams = [...$teams];
        newTeams.push({name: `Team ${$teams.length}`,players:[],expanded:false})
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
        //console.log(index);
        //console.log(newTeams[index].expanded)
    
    }

    async function submitForm(){
        await fetch('?/submitMultiForm',{method:"post",body:JSON.stringify($teams)})
    }
    
    const runSub = async()=> { await submitForm(); showWizard.set(false);}
    
    </script>
    
    
    <form method="post" on:submit|preventDefault={runSub}>
        <div class="item-wrap">
            <label for="addTeam">Add Team</label>
            <button name="addTeam" type="button" on:click={addTeam}><span class="material-symbols-outlined">
                add
                </span></button>
        </div>
    
        {#each $teams as team, teamsIndex}
    
            <label for="teamName">Team Name:</label>
            <input name="teamName" required type="text" bind:value={$teams[teamsIndex].name}/>
            <input name="numTeams" type="hidden"/>
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
            <input type="hidden" name="numPlayers"/>
            <div class="player-wrapper">
                <div class="player-item">
                    <label for="playerName">Player Name:</label>
                    <input bind:value={$teams[teamsIndex].players[playerIndex].name} name="playerName" type="text"/>
                </div>
                <div class="player-item">
                    <label for="playerAge">Player Age:</label>
                    <input bind:value={$teams[teamsIndex].players[playerIndex].age} name="playerAge" type="number"/>
                </div>
                <div class="player-item">
                    <label for="playerPosition">Player Position:</label>
                    <input bind:value={$teams[teamsIndex].players[playerIndex].position} name="playerPosition" type="text"/>
                </div>
                <div class="player-item">
                    <label for="playerJersey">Jersey:</label>
                    <input bind:value={$teams[teamsIndex].players[playerIndex].jersey} name="playerJersey" type="number"/>
                </div>
    
            </div>
            {/each}
            {#if !team.players.length}
            <p>No Players on Team</p>
            {/if}
            {:else}
            {#each team.players as player, playerIndex}
            <input type="hidden" name="numPlayers"/>
            <input bind:value={$teams[teamsIndex].players[playerIndex].name} name="playerName" type="hidden"/>
            <input bind:value={$teams[teamsIndex].players[playerIndex].age} name="playerAge" type="hidden"/>
            <input bind:value={$teams[teamsIndex].players[playerIndex].position} name="playerPosition" type="hidden"/>
            <input bind:value={$teams[teamsIndex].players[playerIndex].jersey} name="playerJersey" type="hidden"/>
            {/each}
            <p>Expand to see players</p>
            {/if}
        {/each}

        <div class='btn-submit-wrap'>
            <button type='submit'>Submit</button>
        </div>

    
    </form>
    
    
    <style>
        form{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            overflow:scroll;
            transition: all 0.2s ease-in-out;

        }
        button{
            background-color: rgba(255, 255, 255,0);
            cursor: pointer;
            margin:.2em;
            max-width: 30%;
        }
        button:hover{
            background-color: rgba(0, 0, 0,0.1);
        }
        .btn-submit-wrap{
            text-align: center;
        }
        .item-wrap{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            transition: all 0.2s ease-in-out;
            margin-top:.2em;
        }
        .player-wrapper{
            display: flex;
            flex-direction: row;
            transition: all 0.2s ease-in-out;
            justify-content: center;
        }
        .player-wrapper input:last-child{
            margin-bottom: 1em;
        }
        .player-item{
            display:flex;
            flex-direction: column;
            padding:.25em;
        }
    </style>