import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Modal from "./Modal"
import ModalButton from "./ModalButton"
import Board from "./HistoryModal/Board"
import HistoryDetailModal from "./HistoryDetailModal"
import type { history } from "../types/history"

const Body = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    overflow: hidden;
`

const StyledHistoryModal = styled.div<{$windowInnerWidth: number, $windowInnerHeight: number}>`
    // 183px per square + 10px padding = 193px. We subtract 10 from the inner width to account for the 10px addional padding.    
    --history-width: ${({$windowInnerWidth, $windowInnerHeight}) => {
        const gridSquareSidePlusPadding = ($windowInnerHeight >= 350 ? 183 : 150) + 10;    
        return `${Math.floor(($windowInnerWidth - 10) / gridSquareSidePlusPadding) * gridSquareSidePlusPadding + 10}px;`
    }}
    

    width: var(--history-width);
    flex-grow: 1;
    display: grid;
    grid-template: repeat(auto-fit, 183px) / repeat(auto-fit, 183px);
    overflow-y: auto;
    scrollbar-color: white black;
    scrollbar-width: thin;
    gap: 10px;
    padding: 10px;
    padding-top: 0;

    @media screen and (height < 350px) {
        grid-template: repeat(auto-fit, 150px) / repeat(auto-fit, 150px);
    }
`

const Title = styled.h2`
    font-size: 2rem;
    margin-block: 0;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

export default function HistoryModal({histories, closeModalFn}: {histories: history[], closeModalFn: () => void}) {
    const [isHistoryDetailModalShown, setIsHistoryDetailModalShown] = useState(false)
    const [historiesIndex, setHistoriesIndex] = useState(-1)
    const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)
    
    useEffect(() => {
        const onResize = () => {
            setWindowInnerWidth(window.innerWidth)
            setWindowInnerHeight(window.innerHeight)
        }

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])


    const decrementHistoriesIndex = () => setHistoriesIndex(prev => Math.max(0, prev - 1))
    const incrementHistoriesIndex = () => setHistoriesIndex(prev => Math.min(histories.length - 1, prev + 1))

    const onClick = (index: number) => {
        setHistoriesIndex(index)
        setIsHistoryDetailModalShown(true)
    }
    
    return (
        <Modal closeModalFn={closeModalFn}>
            {isHistoryDetailModalShown && 
                <HistoryDetailModal 
                    histories={histories} 
                    historiesIndex={historiesIndex} 
                    incrementHistoriesIndex={incrementHistoriesIndex} 
                    decrementHistoriesIndex={decrementHistoriesIndex}
                    closeModalFn={() => setIsHistoryDetailModalShown(false)}
                    closeParentModalFn={closeModalFn}
                />
            }
            <Body>
                <header>
                    <Title>History</Title>
                </header>                
                <StyledHistoryModal $windowInnerWidth={windowInnerWidth} $windowInnerHeight={windowInnerHeight}>
                    {histories.map((history, i) => <Board key={i} history={history} onClick={() => onClick(i)}/>)}
                </StyledHistoryModal>
                <Buttons>
                    <ModalButton onClick={closeModalFn}>Back to Game</ModalButton>
                </Buttons>
            </Body>
        </Modal>
    )
}