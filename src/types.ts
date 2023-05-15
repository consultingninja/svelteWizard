export interface Player{
    name:string,
    age:number,
    position:string,
    jersey:number,
}

export type Team = {
    players: Player[],
    name:string,
    expanded:boolean
}

export type Teams = Team[]


export const defaultPlayer:Player = {
    name: "",
    age: 0,
    position: '',
    jersey: 0

}
export const defaultTeam = {
    players: [defaultPlayer],
    name:''
}

export const defaultTeams:Teams = []