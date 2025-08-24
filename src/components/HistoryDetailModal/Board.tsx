import styled from "@emotion/styled"
import type { SquareValue } from "../../types/Square"
import Square from "./Square"

const StyledBoard = styled.div`
    width: 300px;
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    gap: 0;
    align-content: center;

    @media screen and ((width < 600px) or (height < 600px)) {
        width: 200px;
    }
`

type BoardProps = {
    squareValues: SquareValue[],
    areSquaresHovered: boolean[],
    winningSquares: number[]
}

export default function Board({squareValues, areSquaresHovered, winningSquares}: BoardProps) {   
    const isWin = winningSquares.every(square => !!squareValues[square])

    return (
        <StyledBoard>
            {
                squareValues.map((value, i) => 
                    <Square 
                        key={i} 
                        id={i} 
                        isWinningSquare={isWin && winningSquares.includes(i)}
                        isHovered={areSquaresHovered[i]}
                    >
                        {value}
                    </Square>
                )
            }
        </StyledBoard>
    )
}