import styled from "@emotion/styled"
import Square from "./Square"
import type { SquareValue } from "../../types/Square"
import type { history } from "../../types/history"

const StyledBoard = styled.div`
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    gap: 0;
    align-content: center;
`

type BoardProps = {
    history: history,
    onClick: () => void
}

export default function HistoryBoard({history, onClick}: BoardProps) {
    const squares: SquareValue[] = Array(9).fill(null)
    history.history.forEach(({squareIndex, token}) => squares[squareIndex] = token)

    return (
        <StyledBoard onClick={onClick}>
            {
                squares.map((square, i) => 
                    <Square 
                        key={i} 
                        id={i} 
                        isWinningSquare={history.winningSquares.includes(i)}
                    >
                        {square}
                    </Square>
                )
            }
        </StyledBoard>
    )
}