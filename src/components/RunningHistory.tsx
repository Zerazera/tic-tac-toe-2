import styled from "@emotion/styled"
import type { runningHistory } from "../types/runningHistory"

const StyledRunningHistory = styled.div`
    font-size: 1.3rem;
    
    @media screen and (width < 800px) {
        font-size: 1.1rem;
    }

    @media screen and ((width < 600px) or (height < 600px)) {
        font-size: 0.8rem;
    }
`

const TableDiv = styled.div`
    height: 316px;

    @media screen and ((width < 600px) or (height < 600px)) {
        height: 226px;
    }
`

const Table = styled.table`
    display: table;
    border: 3px solid black;
    border-collapse: collapse;
    cursor: default;
`

const TableDetail = styled.td`
    border: 1px solid black;
    border-right: 2px solid black;
    padding: 3px;
    text-align: center;
`

const TableRow = styled.tr<{$currentLength: number, $index: number, $onClickIsFunction: boolean}>`
    color: ${({$currentLength, $index}) => $index >= $currentLength && 'grey'};
    cursor: ${({$onClickIsFunction}) => $onClickIsFunction && 'pointer'};
`

const TableHeader = styled.th`
    border: 2px solid black;
    padding: 3px;
`

type RunningHistoryProps = {
    runningHistory: runningHistory[],
    hoverSquare: (index: number) => void,
    unHoverSquare: (index: number) => void,
    currentLength?: number
    onClick?: (index: number) => void
}

export default function RunningHistory({runningHistory, hoverSquare, unHoverSquare, currentLength = runningHistory.length, onClick}: RunningHistoryProps) {
    return (
        <StyledRunningHistory>
                <TableDiv>
                    <Table>
                        <thead>
                            <TableRow 
                                $index={-1} 
                                $currentLength={0} 
                                $onClickIsFunction={!!onClick}
                                onClick={() => onClick && onClick(-1)}
                            >
                                <TableHeader>Move</TableHeader>
                                <TableHeader>Square</TableHeader>
                                <TableHeader>Token</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {
                                runningHistory.map(({squareIndex, token}, i) =>
                                    <TableRow 
                                        key={i} 
                                        onMouseOver={() => hoverSquare(squareIndex)} 
                                       onMouseOut={() => unHoverSquare(squareIndex)}
                                       $currentLength={currentLength}
                                       $index={i}
                                       onClick={() => onClick && onClick(i)}
                                       $onClickIsFunction={!!onClick}
                                    >
                                        <TableDetail>{i + 1}</TableDetail>
                                        <TableDetail>{squareIndex + 1}</TableDetail>
                                        <TableDetail>{token}</TableDetail>
                                    </TableRow>
                                )
                            }
                        </tbody>
                    </Table>
                </TableDiv>
        </StyledRunningHistory>
    )
}