import styled from "@emotion/styled"

export default styled.button`
    border: 1px solid white;
    background-color: black;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 10px;

    &:active {
        background-color: white;
        color: black;
    }

    @media screen and ((width < 520px) or (height < 520px)) {
        font-size: 0.8rem;
    }
`