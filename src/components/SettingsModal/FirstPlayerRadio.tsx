import SquareRadio from "./SquareRadio"
import type { setFirstPlayerFn } from "../SettingsModal"

type FirstPlayerRadioProps = {
    playerIndex: number,
    isPlayerFirst: boolean,
    setFirstPlayer: setFirstPlayerFn
}

export default function FirstPlayerRadio({playerIndex, isPlayerFirst, setFirstPlayer}: FirstPlayerRadioProps) {
    return (
        <SquareRadio
            inputId={`first-player-player-${playerIndex + 1}`}
            value={`player-${playerIndex + 1}`}
            name="first-player"
            checked={isPlayerFirst}
            onChange={() => setFirstPlayer(playerIndex)}
        >
            {`Player ${playerIndex + 1}`}
        </SquareRadio>
    )
}