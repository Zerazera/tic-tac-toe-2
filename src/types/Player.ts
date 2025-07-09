import type { token } from "./token"

const ComputerPlayers = {
    random: 'Random',
    strategic: 'Strategic',
    minimax: 'Minimax'
} as const

export const PlayerTypes = {
    'human': 'Human',
    ...ComputerPlayers
} as const

export type ComputerPlayer = keyof typeof ComputerPlayers
export type PlayerType = keyof typeof PlayerTypes

export type Player = {
    type: PlayerType, 
    token: token, 
    score: number,
    isFirst: boolean,
    isCurrent: boolean 
}