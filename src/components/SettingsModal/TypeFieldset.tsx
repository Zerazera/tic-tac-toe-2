import TypeRadio from "./TypeRadio"
import { PlayerTypes, type PlayerType } from "../../types/Player"
import type { setPlayerTypeFn } from "../SettingsModal"

type TypeFieldsetProps = {
    playerIndex: number,
    playerType: PlayerType,
    setPlayerType: setPlayerTypeFn
}

export default function TypeFieldset({playerIndex, playerType, setPlayerType}: TypeFieldsetProps) {
    return (
        <fieldset>
            <legend>Type</legend>
            {
                Object.keys(PlayerTypes).map(currentType => 
                    <TypeRadio 
                        key={currentType}
                        playerIndex={playerIndex} 
                        playerType={playerType} 
                        currentType={currentType as PlayerType} 
                        setPlayerType={setPlayerType} 
                    />
                )
            }
        </fieldset>
    )
}