import styled from "@emotion/styled"
import type { Square as SquareType } from "../../types/Square"
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
    squares: SquareType[],
    winningSquares: number[]
}

export default function Board({squares, winningSquares}: BoardProps) {   
    const isWin = winningSquares.every(square => !!squares[square].value)

    return (
        <StyledBoard>
            {
                squares.map(({value, isHovered}, i) => 
                    <Square 
                        key={i} 
                        id={i} 
                        isWinningSquare={isWin && winningSquares.includes(i)}
                        isHovered={isHovered}
                    >
                        {value}
                    </Square>
                )
            }
        </StyledBoard>
    )
}