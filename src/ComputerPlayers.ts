import type { Player, ComputerPlayer } from "./types/Player"
import type { SquareValue } from "./types/Square"
import type { takeSquareFn } from "./App"
import type { boardStateFn } from "./boardState"
import type { token } from "./types/token"

type ComputerPlayerFn = (player: Player, squareValues: SquareValue[], boardState: boardStateFn, takeSquare: takeSquareFn) => void
const randomPlayer: ComputerPlayerFn = (player, squareValues, boardState, takeSquare) => {
    const {availableSquareIndexes} = boardState(squareValues)
    takeSquare(availableSquareIndexes[Math.floor(Math.random() * availableSquareIndexes.length)], player.token)
}

const strategicPlayer: ComputerPlayerFn = (player, squareValues, boardState, takeSquare) => {
    const {availableSquareIndexes, tokenIndexes} = boardState(squareValues)
    const otherPlayerToken: token = player.token === 'X' ? 'O' : 'X'
    const tokenIndexCountsWithOneWinningToken: number[] = Array(squareValues.length).fill(0)
    const tokenIndexCountsWithOneLosingToken: number[] = Array(squareValues.length).fill(0)

    let blockingSquare: number | null = null   
    
    for (const tokenIndex of tokenIndexes) {
        if (tokenIndex[player.token].length === 2 && tokenIndex['null'].length === 1) {
            takeSquare(tokenIndex['null'][0], player.token)
            return
        } else if (blockingSquare === null) {
            if (tokenIndex[otherPlayerToken].length === 2 && tokenIndex['null'].length === 1) blockingSquare = tokenIndex['null'][0]
            else if (tokenIndex['null'].length === 2) {
                if (tokenIndex[player.token].length === 1) tokenIndex['null'].forEach(squareIndex => tokenIndexCountsWithOneWinningToken[squareIndex]++)
                else tokenIndex['null'].forEach(squareIndex => tokenIndexCountsWithOneLosingToken[squareIndex]++)
            }
        }
    }

    if (blockingSquare !== null) {
        takeSquare(blockingSquare, player.token)
        return
    }

    const forkWinIndex = tokenIndexCountsWithOneWinningToken.findIndex(count => count >= 2)

    if (forkWinIndex !== -1) {
        takeSquare(forkWinIndex, player.token)
        return
    }

    const blockForkWinIndex = tokenIndexCountsWithOneLosingToken.findIndex(count => count >= 2)

    if (blockForkWinIndex !== -1) {
        takeSquare(blockForkWinIndex, player.token)
        return
    }

    // block double fork attempt
    if ((availableSquareIndexes.length === 6 && squareValues[4] === player.token) && 
        ((squareValues[0] === otherPlayerToken && squareValues[8] === otherPlayerToken) || 
        (squareValues[2] === otherPlayerToken && squareValues[6] === otherPlayerToken))
    ) {        
        takeSquare(3, player.token)
        return
    }

    if (availableSquareIndexes.includes(4)) {
        takeSquare(4, player.token)
        return
    }

    const cornerMoves = {
        0: 8,
        2: 6,
        6: 2,
        8: 0
    }

    for (const [corner, oppositeCorner] of Object.entries(cornerMoves)) {
        if (squareValues[+corner] === otherPlayerToken && availableSquareIndexes.includes(oppositeCorner)) {
            takeSquare(oppositeCorner, player.token)
            return
        }
    }

    const movePreference = [0, 2, 6, 8, 1, 3, 5 ,7]
    for (const move of movePreference) {
        if (availableSquareIndexes.includes(move)) {
            takeSquare(move, player.token)
            return
        }
    }
}

const minimaxPlayer: ComputerPlayerFn = (player, squareValues, boardState, takeSquare) => {
    const {availableSquareIndexes} = boardState(squareValues)

    const minimax = (squareValues: SquareValue[], isX: boolean, alpha = -Infinity, beta = Infinity): number => {
        const {availableSquareIndexes, winningToken, isTerminal} = boardState(squareValues)
        const depth = availableSquareIndexes.length + 1

        if (isTerminal) return (isX ? 1 : -1) * (winningToken === 'X' ? depth : winningToken === 'O' ? -depth : 0)

        for (const index of availableSquareIndexes) {
            const copy = [...squareValues]
            copy[index] = isX ? 'O' : 'X'
            beta = Math.min(beta, -minimax(copy, !isX, -beta, -alpha))
            
            if (alpha >= beta) break
        }

        return beta
    }

    let maxScore = -Infinity
    let maxSquare = -1

    for (const index of availableSquareIndexes) {
        const copy = [...squareValues]
        copy[index] = player.token
        const score = minimax(copy, player.token === 'X')

        if (score > maxScore) {
            maxScore = score
            maxSquare = index
        }
    }

    takeSquare(maxSquare, player.token)
}

export function getComputerPlayer(type: ComputerPlayer) {
    const computerPlayers: Record<ComputerPlayer, ComputerPlayerFn> = {
        random: randomPlayer,
        strategic: strategicPlayer,
        minimax: minimaxPlayer
    }

    return computerPlayers[type]
}