import StyledSquare from '../StyledSquare'
import styled from "@emotion/styled"
import type { ReactNode } from 'react'

const StyledHistorySquare = styled(StyledSquare)`
    font-size: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    // overwriting media rule on StyledSquare
    @media screen and (width < 800px) {
        font-size: 3rem;
    }

    @media screen and (height < 350px) {
        font-size: 2.5rem;
    }
`

type SquareProps = {
    id: number, 
    children: ReactNode, 
    isWinningSquare: boolean,
}

export default function Square({id, children, isWinningSquare}: SquareProps) {
    return (
        <StyledHistorySquare 
            $id={id} 
            $isWinningSquare={isWinningSquare} 
            $isHovered={false}
        >            
            {children}
        </StyledHistorySquare>
    )
}