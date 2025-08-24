import styled from "@emotion/styled"
import Square from "./Square"
import type { SquareValue } from "../types/Square"
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
    squareValues: SquareValue[],
    areSquaresHovered: boolean[],
    takeSquare: takeSquareFn,
    currentPlayer: Player,
}

export default function Board({squareValues, areSquaresHovered, takeSquare, currentPlayer}: BoardProps) {
    const {isTerminal, squaresInWin} = boardState(squareValues)
        
    return (
        <StyledBoard>
            {squareValues.map((value, i) => 
                <Square 
                    key={i} 
                    id={i} 
                    onClick={() => currentPlayer.type === 'human' && takeSquare(i, currentPlayer.token)} 
                    isGameOver={isTerminal} 
                    isWinningSquare={squaresInWin.includes(i)}
                    isHumanPlayer={currentPlayer.type === 'human'}
                    isHovered={areSquaresHovered[i]}
                >
                    {value}
                </Square>)}
        </StyledBoard>
    )
}