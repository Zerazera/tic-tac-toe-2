import type { runningHistory } from "./runningHistory"
import type { Player } from "./Player"
import type { SquareValue } from "./Square"

export type history = {
    history: runningHistory[],
    winningSquares: number[],
    winningToken: SquareValue,
    players: [Player, Player],
}