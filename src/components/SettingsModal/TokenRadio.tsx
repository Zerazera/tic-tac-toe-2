import SquareRadio from "./SquareRadio";
import type { token } from "../../types/token";
import type { setPlayerTokenFn } from "../SettingsModal";

type TokenRadioProps = {
    playerIndex: number,
    playerToken: token,
    currentToken: token,
    setPlayerToken: setPlayerTokenFn
}

export default function TokenRadio({playerIndex, playerToken, currentToken, setPlayerToken}: TokenRadioProps) {
    return (
        <SquareRadio
            inputId={`player-${playerIndex + 1}-token-${currentToken}`}
            value={currentToken}
            name={`player-${playerIndex + 1}-token`}
            checked={playerToken === currentToken}
            onChange={() => setPlayerToken(playerIndex, currentToken)}
        >
            {currentToken}
        </SquareRadio>
    )
}