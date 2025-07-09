import type { Player, ComputerPlayer } from "./types/Player"
import type { Square } from "./types/Square"
import type { takeSquareFn } from "./App"
import type { boardStateFn } from "./boardState"
import type { token } from "./types/token"

type ComputerPlayerFn = (player: Player, squares: Square[], boardState: boardStateFn, takeSquare: takeSquareFn) => void
const randomPlayer: ComputerPlayerFn = (player, squares, boardState, takeSquare) => {
    const {availableSquareIndexes} = boardState(squares)
    takeSquare(availableSquareIndexes[Math.floor(Math.random() * availableSquareIndexes.length)], player.token)
}

const strategicPlayer: ComputerPlayerFn = (player, squares, boardState, takeSquare) => {
    const {availableSquareIndexes, tokenIndexes} = boardState(squares)
    const otherPlayerToken: token = player.token === 'X' ? 'O' : 'X'
    const tokenIndexCountsWithOneWinningToken: number[] = Array(squares.length).fill(0)
    const tokenIndexCountsWithOneLosingToken: number[] = Array(squares.length).fill(0)

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
    if ((availableSquareIndexes.length === 6 && squares[4].value === player.token) && 
        ((squares[0].value === otherPlayerToken && squares[8].value === otherPlayerToken) || 
        (squares[2].value === otherPlayerToken && squares[6].value === otherPlayerToken))
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
        if (squares[+corner].value === otherPlayerToken && availableSquareIndexes.includes(oppositeCorner)) {
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

const minimaxPlayer: ComputerPlayerFn = (player, squares, boardState, takeSquare) => {
    const {availableSquareIndexes} = boardState(squares)

    const minimax = (squares: Square[], isX: boolean, alpha = -Infinity, beta = Infinity): number => {
        const {availableSquareIndexes, winningToken, isGameOver} = boardState(squares)
        const depth = availableSquareIndexes.length + 1

        if (isGameOver) return (isX ? 1 : -1) * (winningToken === 'X' ? depth : winningToken === 'O' ? -depth : 0)

        let maxScore = -Infinity

        for (const index of availableSquareIndexes) {
            const copy = squares.map((square, i) => i === index ? {...square, value: isX ? 'O' : 'X' as token} : {...square})
            maxScore = Math.max(maxScore, minimax(copy, !isX, -beta, -alpha))
            alpha = Math.max(alpha, maxScore)
            
            if (alpha >= beta) break
        }

        return -maxScore
    }

    let maxScore = -Infinity
    let maxSquare = -1

    for (const index of availableSquareIndexes) {
        const copy = squares.map((square, i) => i === index ? {...square, value: player.token} : {...square})
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