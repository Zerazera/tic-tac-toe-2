import FlexFieldset from "./FlexFieldset"
import TokenRadio from "./TokenRadio"
import { tokens, type token } from "../../types/token"


type TokenFieldsetProps = {
    playerIndex: number,
    playerToken: token,
    setPlayerToken: (index: number, token: token) => void
}

export default function TokenFieldset({playerIndex, playerToken, setPlayerToken}: TokenFieldsetProps) {
    return (
        <FlexFieldset>
            <legend>Token</legend>
            {
                tokens.map(currentToken => 
                    <TokenRadio
                        key={currentToken} 
                        playerIndex={playerIndex} 
                        playerToken={playerToken} 
                        currentToken={currentToken} 
                        setPlayerToken={setPlayerToken}
                    />
                )
            }
        </FlexFieldset>
    )
}