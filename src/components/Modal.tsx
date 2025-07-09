import styled from "@emotion/styled"
import type { ReactNode } from "react"

const Body = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    allgn-items: start;
    overflow: auto;
`
const Header = styled.header`
    display: flex;
    justify-content: end;
    width: 99%;
`

const CloseButton = styled.button`
    color: white;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
`

const Main = styled.main<{$justifyContent: justifyContentString}>`
    display: flex;
    flex-direction: column;
    justify-content: ${({$justifyContent}) => $justifyContent};
    align-items: center;
    width: 99%;
    flex-grow: 1;
`

type justifyContentString = 'start' | 'center' | 'end'

type ModalProps = {
    children: ReactNode, 
    closeModalFn: () => void
    justifyContent?: justifyContentString
}

export default function Modal({children, closeModalFn, justifyContent = 'center'}: ModalProps) {
    return (
        <Body>
            <Header>
                <CloseButton onClick={closeModalFn}>&times;</CloseButton>
            </Header>
            <Main $justifyContent={justifyContent}>                
                {children}
            </Main>
        </Body>
    )
}