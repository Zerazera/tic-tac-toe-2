import type { ReactNode } from 'react'
import styled from "@emotion/styled"
import StyledSquare from './StyledSquare'

const SquareButton = styled(StyledSquare.withComponent('button'))`
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        color: black;
    }
`

type SquareProps = {
    id: number, 
    children: ReactNode, 
    onClick: () => void, 
    isGameOver: boolean, 
    isWinningSquare: boolean,
    isHumanPlayer: boolean,
    isHovered: boolean
}

export default function Square({id, children, onClick, isGameOver, isWinningSquare, isHumanPlayer, isHovered}: SquareProps) {
    return (
        <SquareButton 
            $id={id} 
            $isWinningSquare={isWinningSquare} 
            onClick={onClick} 
            disabled={!isHumanPlayer || !!children || isGameOver}
            $isHovered={isHovered}
        >            
            {children}
        </SquareButton>
    )
}