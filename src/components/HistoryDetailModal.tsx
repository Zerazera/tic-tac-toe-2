import { useState, useRef } from "react"
import styled from "@emotion/styled"
import Modal from "./Modal"
import ModalButton from "./ModalButton"
import BoardSection from "./BoardSection"
import RunningHistory from "./RunningHistory"
import PlayerSection from "./PlayerSection"
import Board from "./HistoryDetailModal/Board"
import ControlBank from "./HistoryDetailModal/ControlBank"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import type { SquareValue } from "../types/Square"
import type { history } from "../types/history"
import type { Player } from "../types/Player"
import { useSquares } from "../hooks/useSquares"

const StyledHistoryDetailModal = styled.div`
    background-color: rgba(255, 255, 255, 1);
    width: min(600px, 100vw);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
`

const Title = styled.h2`    
    @media screen and (height < 500px) {
        font-size: 1rem;
    }
`

const PageInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    gap: 10px;

    @media screen and (height < 500px) {
        font-size: 1rem;
    }
`

const Main = styled.main`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const PageButton = styled.button`
    background-color: white;
    font-size: 2.5rem;
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }

    @media screen and (height < 500px) {
        font-size: 2rem;
    }
`

const HistoryDetailModalButton = styled(ModalButton)`
    border-color: black;
    background-color: white;
    color: black;

    &:active {
        background-color: black;
        color: white;
    }
`

const HistoryDetailModalButtons = styled.footer`
    display: flex;
    justify-content: center;
    gap: 10px;
`

type HistoryDetailModalProps = {
    histories: history[],
    historiesIndex: number,
    incrementHistoriesIndex: () => void,
    decrementHistoriesIndex: () => void,
    closeModalFn: () => void,
    closeParentModalFn: () => void
}

export default function HistoryDetailModal({histories, historiesIndex, incrementHistoriesIndex, decrementHistoriesIndex, closeModalFn, closeParentModalFn}: HistoryDetailModalProps) {
    const [priorHistoriesIndex, setPriorHistoriesIndex] = useState(historiesIndex)
    const history = histories[historiesIndex]
    const {squares, setSquares, hoverSquare, unHoverSquare} = useSquares()
    
    const [currentLength, setcurrentLength] = useState(history.history.length)
    const [priorCurrentLength, setPriorCurrentLength] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [players, setPlayers] = useState(history.players)
    const intervalRef = useRef(0)

    const closeBothModals = () => {
        closeModalFn()
        closeParentModalFn()
    }

    const setIndex = (index: number) => setcurrentLength(index + 1)
        
    const incrementLength = () => setcurrentLength(prev => Math.min(history.history.length, prev + 1))
    const decrementLength = () => setcurrentLength(prev => Math.max(0, prev - 1))
    const setLengthToMin = () => setcurrentLength(0)
    const setLengthToMax = () => setcurrentLength(history.history.length)

    if (historiesIndex !== priorHistoriesIndex) {
        setPriorHistoriesIndex(historiesIndex)
        setPriorCurrentLength(0)
        setcurrentLength(history.history.length)
    }

    if (currentLength !== priorCurrentLength) {
        setPriorCurrentLength(currentLength)

        if (currentLength < history.history.length) {
            const nextToken = history.history[currentLength].token
            setPlayers(prev => prev.map(player => ({...player, isCurrent: player.token === nextToken})) as [Player, Player])
        }

        const newSquareValues: SquareValue[] = Array(9).fill(null)
        history.history.slice(0, currentLength).forEach(({squareIndex, token}) => newSquareValues[squareIndex] = token)
        setSquares(prev => prev.map((square, i) => ({...square, value: newSquareValues[i]})))
    }

    const pause = () => {
        clearInterval(intervalRef.current)
        setIsPlaying(false)
    }
    const play = () => {
        if (currentLength === history.history.length) setLengthToMin()
        setIsPlaying(true)

        intervalRef.current = setInterval(incrementLength, 500)
    }

    if (isPlaying && currentLength === history.history.length) pause()

    return (
        <Modal closeModalFn={closeModalFn}>
            <StyledHistoryDetailModal>
                <header>
                    <Title>History Detail</Title>
                    <PageInfo>
                        <PageButton onClick={decrementHistoriesIndex} disabled={historiesIndex === 0}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </PageButton>
                        <div>{`${historiesIndex + 1} of ${histories.length}`}</div>
                        <PageButton onClick={incrementHistoriesIndex} disabled={historiesIndex === histories.length - 1}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </PageButton>
                    </PageInfo>
                </header>
                <Main>
                    <BoardSection 
                        runningHistory={
                            <RunningHistory 
                                runningHistory={history.history} 
                                hoverSquare={hoverSquare} 
                                unHoverSquare={unHoverSquare} 
                                currentLength={currentLength}
                                onClick={setIndex}
                            />
                        }
                        board={
                            <Board 
                                squares={squares}
                                winningSquares={history.winningSquares}
                            />
                        }
                        playerSections={
                            <>
                                {
                                    players.map(({token, type, score, isCurrent}, index) => 
                                        <PlayerSection
                                            key={index}
                                            index={index}
                                            type={type}
                                            token={token}
                                            score={score + (currentLength === history.history.length && history.winningToken === token ? 1 : 0)}
                                            isCurrent={isCurrent}
                                            isGameOver={currentLength === history.history.length}
                                            winningToken={history.winningToken}
                                        />
                                    )
                                }
                            </>
                        }
                    />
                    <ControlBank 
                        playFn={play} 
                        pauseFn={pause} 
                        incrementFn={incrementLength} 
                        decrementFn={decrementLength} 
                        minFn={setLengthToMin} 
                        maxFn={setLengthToMax}
                        isPlaying={isPlaying}
                        atMinLength={currentLength === 0}
                        atMaxLength={currentLength === history.history.length}
                    />
                </Main>
                <HistoryDetailModalButtons>
                    <HistoryDetailModalButton onClick={closeModalFn}>Back to History</HistoryDetailModalButton>
                    <HistoryDetailModalButton onClick={closeBothModals}>Back to Game</HistoryDetailModalButton>
                </HistoryDetailModalButtons>
            </StyledHistoryDetailModal>
        </Modal>
    )

}