import styled from "@emotion/styled"
import { css } from "@emotion/react"

export default styled.div<{$id: number, $isWinningSquare: boolean, $isHovered: boolean}>`
    border: 3px solid black;
    background-color: ${({$isWinningSquare, $isHovered}) => ($isHovered && 'pink') || ($isWinningSquare && 'lightgreen')  || 'white'};
    font-size: 5rem;
    font-weight: bold;
    cursor: default;

    ${({$id}) => {
        return css`
            border-left-style: ${[0, 3, 6].includes($id) && 'none'};
            border-right-style: ${[2, 5, 8].includes($id) && 'none'};
            border-top-style: ${[0, 1, 2].includes($id) && 'none'};
            border-bottom-style: ${[6, 7, 8].includes($id) && 'none'};
        `
    }}

    @media screen and (width < 800px) {
        font-size: 4rem;
    }

    @media screen and ((width < 600px) or (height < 600px)) {
        font-size: 3rem;
    }
`