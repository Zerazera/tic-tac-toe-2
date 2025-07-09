import styled from "@emotion/styled"
import type { ReactNode } from "react"

const StyledBoardSection = styled.section`
  display: flex;
  width: 95%;
  justify-content: center;
  gap: 10px;

  @media screen and (width < 350px) {
    gap: 5px;
  }
`

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (width < 600px) {
    width: 200px;
  }
`

const PlayerInfo = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  @media screen and ((width < 600px) or (height < 600px)) {
    font-size: 0.8rem;
    width: 200px;
  }
`

type BoardSectionProps = {
    playerSections: ReactNode,
    board: ReactNode,
    runningHistory: ReactNode
}

export default function BoardSection({playerSections, board, runningHistory}: BoardSectionProps) {
    return (
        <StyledBoardSection>
            <BoardArea>
                <PlayerInfo>
                    {playerSections}
                </PlayerInfo>
                {board}
            </BoardArea>
            {runningHistory}                
        </StyledBoardSection>
    )
}