import { useState } from "react"
import styled from "@emotion/styled"
import Board from "./components/Board"
import type { Square } from "./types/Square"
import type { Player } from "./types/Player"
import type { runningHistory } from "./types/runningHistory"
import type { history } from "./types/history"
import type { token } from "./types/token"
import { boardState } from "./boardState"
import { getComputerPlayer } from "./ComputerPlayers"
import GameIsOverDialogBox from "./components/GameIsOverDialogBox"
import RunningHistory from "./components/RunningHistory"
import SettingsModal from "./components/SettingsModal"
import HistoryModal from "./components/HistoryModal"
import PlayerSection from "./components/PlayerSection"
import BoardSection from "./components/BoardSection"
import { useSquares } from "./hooks/useSquares"

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  gap: 10px;
`

const Title = styled.h1`
  margin-top: 0em;
  margin-bottom: 1em;
`

const Button = styled.button`
    border: 1px solid black;
    background-color: white;
    color: black;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 10px;

    &:active {
        background-color: black;
        color: white;
    }

    &:disabled {
      cursor: not-allowed;
      border-color: grey;
      color: grey;
      background-color: white;
    }

    @media screen and ((width < 600px) or (height < 600px)) {
      font-size: 1rem;
    }
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
`

export type takeSquareFn = (index: number, token: token) => void

export default function App() {
  const {squares, setSquares, resetSquares, hoverSquare, unHoverSquare} = useSquares()
  const [prevSquares, setPrevSquares] = useState<Square[]>([])
  const [runningHistory, setRunningHistory] = useState<runningHistory[]>([])
  const [history, setHistory] = useState<history[]>([])
  const [players, setPlayers] = useState<[Player, Player]>([
    {
      type: 'human',
      token: 'X',
      score: 0,
      isFirst: true,
      isCurrent: true,
    },
    {
      type: 'strategic',
      token: 'O',
      score: 0,
      isFirst: false,
      isCurrent: false,
    }
  ])
  const [isScoreUpdated, setIsScoreUpdated] = useState(false)
  const [isGameOverModalShown, setIsGameOverModalShown] = useState(false)
  const [wasGameOverModalShown, setWasGameOverModalShown] = useState(false)
  const [isSettingsModalShown, setIsSettingsModalShown] = useState(true)
  const [isHistoryModalShown, setIsHistoryModalShown] = useState(false)

  const {isGameOver, winningToken, squaresInWin} = boardState(squares)

  const takeSquare: takeSquareFn = (index, token) => {
    if (!squares[index].value) {
      setSquares(prev => prev.map((square, i) => i === index && !square.value ? {...square, value: token} : {...square}))
      setRunningHistory(prev => [...prev, {squareIndex: index, token}])
      setPlayers(prev => prev.map(player => ({...player, isCurrent: !player.isCurrent})) as [Player, Player])
    } else throw new Error('Attempting to take occupied square.')
  }

  const resetBoard = (isSetFirstPlayer = true) => {
    if (isSetFirstPlayer) {
      if (!isGameOver) throw new Error('Attempting to reset game that isn\'t over.')        
      else if (!winningToken) {
        const firstPlayerIndex = Math.floor(Math.random() * 2)
        setPlayers(prev => prev.map((player, i) => ({...player, isCurrent: i === firstPlayerIndex})) as [Player, Player])
      } else {
        setPlayers(prev => prev.map(player => ({...player, isCurrent: winningToken === player.token})) as [Player, Player])
      }
    }

    resetSquares()
    setPrevSquares([])
    setIsScoreUpdated(false)
    setRunningHistory([])
    setIsGameOverModalShown(false)
    setWasGameOverModalShown(false)
  }

  const settingsNewGame = (players: [Player, Player]) => {
    setPlayers(players)
    setIsSettingsModalShown(false)
    resetBoard(false)
  }

  const currentPlayer = players.find(player => player.isCurrent)
  if (!currentPlayer) throw new Error('No current player.')

  if (squares !== prevSquares && !isGameOverModalShown && !isSettingsModalShown && !isHistoryModalShown) {      
    setPrevSquares(squares)
    
    if (!isGameOver && currentPlayer.type !== 'human') {
        const playerType = currentPlayer.type
        setTimeout(() => getComputerPlayer(playerType)(currentPlayer, squares, boardState, takeSquare), 500)
    }      
  }

  if (isGameOver && !isScoreUpdated) {
    setIsScoreUpdated(true)
    setHistory(prev => 
      [
        ...prev, 
        {
          history: runningHistory.map(history => ({...history})), 
          winningSquares: [...squaresInWin], 
          winningToken, 
          players: players.map(player => ({...player})) as [Player, Player]
        }
      ]
    )    
    if (!winningToken) return;
    setPlayers(prev => prev.map(player => winningToken === player.token ? {...player, score: player.score + 1} : {...player}) as [Player, Player])
  }

  if (isGameOver && !isGameOverModalShown && !wasGameOverModalShown) {
    setTimeout(() => {
      setIsGameOverModalShown(true)
      setWasGameOverModalShown(true)
    }, 1000)
  }

  return (    
    <Body>
      <header>
        <Title>Tic Tac Toe</Title>
      </header>
      <Main>
        {
          isSettingsModalShown && 
            <SettingsModal
              players={players}
              newGameFn={settingsNewGame}
              closeModalFn={() => setIsSettingsModalShown(false)} 
            />
        }
        {
          isGameOverModalShown && 
            <GameIsOverDialogBox 
              players={players} 
              winningToken={winningToken}
              resetBoard={resetBoard} 
              closeModalFn={() => setIsGameOverModalShown(false)} 
              showSettingsFn={() => setIsSettingsModalShown(true)}
              showHistoryFn={() => setIsHistoryModalShown(true)}
            />
        }
        {
          isHistoryModalShown && 
            <HistoryModal 
              histories={history} 
              closeModalFn={() => setIsHistoryModalShown(false)} 
            />
        }
        <BoardSection
          playerSections=
            {
              <>
                {players.map(({token, type, score, isCurrent}, index) => 
                  <PlayerSection
                    key={index}
                    index={index}
                    type={type}
                    token={token}
                    score={score}
                    isCurrent={isCurrent}
                    isGameOver={isGameOver}
                    winningToken={winningToken}
                  />
                )}
              </>
            }
          board={<Board squares={squares} takeSquare={takeSquare} currentPlayer={currentPlayer} />}
          runningHistory={<RunningHistory runningHistory={runningHistory} hoverSquare={hoverSquare} unHoverSquare={unHoverSquare} />}
        />
        <Buttons>
          <Button onClick={() => resetBoard()} disabled={!isGameOver || !wasGameOverModalShown}>
            New Game
          </Button>
          <Button onClick={() => setIsSettingsModalShown(true)}>
            Settings
          </Button>
          <Button onClick={() => setIsHistoryModalShown(true)}>
              History
          </Button>
        </Buttons>
      </Main>
    </Body>
  )
}