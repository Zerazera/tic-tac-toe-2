import SquareRadio from "./SquareRadio"
import { PlayerTypes, type PlayerType } from "../../types/Player"

type TypeRadioProps = {
    playerIndex: number,
    playerType: PlayerType,
    currentType: PlayerType,
    setPlayerType: (index: number, type: PlayerType) => void
}

export default function TypeRadio({playerIndex, playerType, currentType, setPlayerType}: TypeRadioProps) {
    return (
        <SquareRadio
            inputId={`player-${playerIndex + 1}-${currentType}-player`}
            value={currentType}
            name={`player-${playerIndex + 1}-type`}
            checked={playerType === currentType}
            onChange={() => setPlayerType(playerIndex, currentType)}
        >
            {PlayerTypes[currentType]}
        </SquareRadio>
    )
}