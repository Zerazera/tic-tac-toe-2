import type { Square, SquareValue } from "./types/Square"
import type { tokenIndex } from "./types/tokenIndex"

export type boardStateFn = (squares: Square[]) => {
    availableSquareIndexes: number[],
    tokenIndexes: tokenIndex[],
    isGameOver: boolean,
    winningToken: SquareValue
    squaresInWin: number[]
}

export const boardState: boardStateFn = (squares) => {
    const availableSquareIndexes = Array(squares.length).fill(null).map((_, i) => i).filter(x => !squares[x].value)
    
    const tokenIndexes: tokenIndex[] = []
    let winningToken: SquareValue = null

    const winningSquaresSet = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let squaresInWin: number[] = []


    for (const winningSquares of winningSquaresSet) {
        const tokenIndex: tokenIndex = {
            X: [],
            O: [],
            null: []
        }

        winningSquares.forEach(squareIndex => tokenIndex[squares[squareIndex].value ?? 'null'].push(squareIndex))

        tokenIndexes.push(tokenIndex)
        if (tokenIndex['X'].length === 3) {
            winningToken = 'X'
            squaresInWin = winningSquares
        }
        else if (tokenIndex['O'].length === 3) {
            winningToken = 'O'
            squaresInWin = winningSquares
        }
    }

    const isGameOver = !!winningToken || availableSquareIndexes.length === 0

    return {
        availableSquareIndexes,
        tokenIndexes,
        isGameOver,
        winningToken,
        squaresInWin
    }
}