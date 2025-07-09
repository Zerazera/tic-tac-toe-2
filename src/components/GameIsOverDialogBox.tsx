import DialogBox, {type DialogBoxPropsButtons} from "./DialogBox"
import type { Player } from "../types/Player"
import type { SquareValue } from "../types/Square"

type GameIsOverDialogBoxProps = {
    players: [Player, Player],
    winningToken: SquareValue,
    resetBoard: () => void,
    closeModalFn: () => void,
    showSettingsFn: () => void,
    showHistoryFn: () => void
}

export default function GameIsOverDialogBox({players, winningToken, resetBoard, closeModalFn, showSettingsFn, showHistoryFn}: GameIsOverDialogBoxProps) {
    let mainText = ""

    if (!winningToken) mainText = "Draw!"
    else if (winningToken === players[0].token) mainText = "Player 1 wins!"
    else mainText = "Player 2 wins!"

    const buttons: DialogBoxPropsButtons[] = [
        {
            caption: "New Game",
            onClick: resetBoard
        },
        {
            caption: "Settings",
            onClick: () => {
                closeModalFn()
                showSettingsFn()
            }
        },
        {
            caption: "History",
            onClick: () => {
                closeModalFn()
                showHistoryFn()
            }
        }
    ]

    return <DialogBox title="Game Over" mainText={mainText} buttons={buttons} closeModalFn={closeModalFn} />
}