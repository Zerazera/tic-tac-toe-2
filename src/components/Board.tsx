import styled from "@emotion/styled"
import Square from "./Square"
import type { Square as SquareType } from "../types/Square"
import type { Player } from "../types/Player"
import type { takeSquareFn } from "../App"
import { boardState } from "../boardState"

const StyledBoard = styled.div`
    width: 300px;
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    gap: 0;
    align-content: center;

    @media screen and (width < 800px) {
        width: 250px;
        height: 250px;
    }

    @media screen and ((width < 600px) or (height < 600px)) {
        width: 200px;
        height: 200px;
    }
`

type BoardProps = {
    squares: SquareType[],
    takeSquare: takeSquareFn,
    currentPlayer: Player,
}

export default function Board({squares, takeSquare, currentPlayer}: BoardProps) {
    const {isGameOver, squaresInWin} = boardState(squares)
        
    return (
        <StyledBoard>
            {squares.map(({value, isHovered}, i) => 
                <Square 
                    key={i} 
                    id={i} 
                    onClick={() => currentPlayer.type === 'human' && takeSquare(i, currentPlayer.token)} 
                    isGameOver={isGameOver} 
                    isWinningSquare={squaresInWin.includes(i)}
                    isHumanPlayer={currentPlayer.type === 'human'}
                    isHovered={isHovered}
                >
                    {value}
                </Square>)}
        </StyledBoard>
    )
}