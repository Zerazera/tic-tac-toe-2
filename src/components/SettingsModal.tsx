import { useState } from "react"
import styled from "@emotion/styled"
import Modal from "./Modal"
import ModalButton from "./ModalButton"
import FlexFieldset from "./SettingsModal/FlexFieldset"
import FirstPlayerRadio from "./SettingsModal/FirstPlayerRadio"
import TokenFieldset from "./SettingsModal/TokenFieldset"
import TypeFieldset from "./SettingsModal/TypeFieldset"
import type {PlayerType, Player } from "../types/Player"
import type { token } from "../types/token"

const StyledSettingsModal = styled.div`
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    width: fit-content;
    height: fit-content;
    padding: 20px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 1rem;

    @media screen and ((width < 500px) or (height < 520px)) {
        font-size: 0.8rem;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const FormSection = styled.section`
    display: flex;
    gap: 10px;
    justify-content: center;
`

const PlayerFormSection = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    gap: 10px;

    @media screen and (width < 500px) {
        grid-template-columns: 1fr;
    }
`

const Title = styled.h2`
    margin-bottom: 0;
`

const PlayerFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 150px;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

const StyledModalButton = styled(ModalButton)`
    @media screen and (width < 500px) {
        font-size: 0.8rem;
    }
`

export type setFirstPlayerFn = (index: number) => void
export type setPlayerTokenFn = (index: number, token: token) => void
export type setPlayerTypeFn = (index: number, type: PlayerType) => void

type SettingsModalProps = {
    players: [Player, Player],
    newGameFn: (players: [Player, Player]) => void,
    closeModalFn: () => void
}

export default function SettingsModal({players, newGameFn, closeModalFn}: SettingsModalProps) {
    const [settingsPlayers, setSettingsPlayers] = useState(players.map(player => 
        ({...player, score: 0, isCurrent: player.isFirst})) as [Player, Player])

    const setFirstPlayer: setFirstPlayerFn = (index) => 
        setSettingsPlayers(prev => 
            prev.map((player, i) => ({...player, isCurrent: i === index, isFirst: i === index})) as [Player, Player]
        )

    const setPlayerToken: setPlayerTokenFn = (index, token) => 
        setSettingsPlayers(prev => prev.map((player, i) => 
            i === index ? {...player, token} : 
            {...player, token: token === 'X' ? 'O' : 'X' as token}) as [Player, Player]
        )

    const setPlayerType: setPlayerTypeFn = (index, type) => 
        setSettingsPlayers(prev => 
            prev.map((player, i) => i === index ? 
            {...player, type} : {...player}) as [Player, Player]
        )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        newGameFn(settingsPlayers)
    }

    const onClickCloseModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        closeModalFn()
    }

    return (
        <Modal closeModalFn={closeModalFn}>
            <StyledSettingsModal>
                <Title>Settings</Title>
                <Form onSubmit={handleSubmit}>
                    <FormSection>
                        <FlexFieldset>
                            <legend>First player</legend>
                            {
                                settingsPlayers.map(({isFirst: isPlayerFirst}, playerIndex) => 
                                    <FirstPlayerRadio 
                                        key={playerIndex}
                                        playerIndex={playerIndex} 
                                        setFirstPlayer={setFirstPlayer} 
                                        isPlayerFirst={isPlayerFirst} 
                                    />
                                )
                            }
                        </FlexFieldset>
                    </FormSection>
                    <PlayerFormSection>
                        {
                            settingsPlayers.map(({token: playerToken, type: playerType}, playerIndex) => 
                                <PlayerFieldset key={playerIndex}>
                                    <legend>{`Player ${playerIndex + 1}`}</legend>
                                    <TokenFieldset
                                        playerIndex={playerIndex}
                                        playerToken={playerToken}
                                        setPlayerToken={setPlayerToken}
                                    />
                                    <TypeFieldset
                                        playerIndex={playerIndex}
                                        playerType={playerType}
                                        setPlayerType={setPlayerType}
                                    />
                                </PlayerFieldset>
                            )
                        }
                    </PlayerFormSection>
                    <Buttons>
                        <StyledModalButton type="submit">New Game</StyledModalButton>
                        <StyledModalButton onClick={onClickCloseModal}>Cancel</StyledModalButton>
                    </Buttons>
                </Form>
            </StyledSettingsModal>
        </Modal>
    )
}