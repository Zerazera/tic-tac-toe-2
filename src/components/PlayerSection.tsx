import styled from "@emotion/styled"
import { css, keyframes } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import type { token } from "../types/token"
import { PlayerTypes, type PlayerType } from "../types/Player"
import type { SquareValue } from "../types/Square"

const StyledPlayerSection = styled.div<{$isWinningPlayer: boolean}>`
  display: flex;
  gap: 5px;
  color: ${({$isWinningPlayer}) => $isWinningPlayer && 'green'};
`

const blink = keyframes`
  0% {
    color: black;
  }
  50% {
    color: white;
  }
  100% {
    color: black;
  }
`

const CurrentPlayerIndicator = styled.div<{$isCurrent: boolean, $isGameOver: boolean}>`
  animation: ${({$isCurrent, $isGameOver}) => !$isGameOver && $isCurrent && css`${blink} 1s linear infinite`};
  color: ${({$isCurrent, $isGameOver}) => (!$isCurrent || $isGameOver) && 'white'};
`

type PlayerSectionProps = {
    index: number,
    token: token,
    type: PlayerType,
    score: number,
    isCurrent: boolean,
    isGameOver: boolean,
    winningToken: SquareValue
}

export default function PlayerSection({index, token, type, score, isCurrent, isGameOver, winningToken}: PlayerSectionProps) {
    return (
        <StyledPlayerSection $isWinningPlayer={isGameOver && winningToken === token}>
            <CurrentPlayerIndicator $isCurrent={isCurrent} $isGameOver={isGameOver}>
                <FontAwesomeIcon icon={faCaretRight} />
            </CurrentPlayerIndicator>
            <div>
                <div>Player {index + 1} ({token})</div>
                <div>{PlayerTypes[type]}</div>
                <div>{score}</div>
            </div>
        </StyledPlayerSection>
    )
}