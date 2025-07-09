import StyledSquare from '../StyledSquare'
import styled from "@emotion/styled"
import type { ReactNode } from 'react'

const StyledHistoryDetailSquare = styled(StyledSquare)`
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`

type SquareProps = {
    id: number, 
    children: ReactNode, 
    isWinningSquare: boolean,
    isHovered: boolean
}

export default function Square({id, children, isWinningSquare, isHovered}: SquareProps) {
    return (
        <StyledHistoryDetailSquare 
            $id={id} 
            $isWinningSquare={isWinningSquare} 
            $isHovered={isHovered}
        >            
            {children}
        </StyledHistoryDetailSquare>
    )
}