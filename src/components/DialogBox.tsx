import styled from "@emotion/styled"
import Modal from "./Modal"
import ModalButton from "./ModalButton"

const StyledDialogBox = styled.div`
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 2rem;
`

const Title = styled.h2`
    margin: 0;
`

const Footer = styled.footer`
    display: flex;
    gap: 10px;
`

export type DialogBoxPropsButtons = {
    caption: string,
    onClick: () => void
}

type DialogBoxProps = {
    title: string,
    mainText: string,
    buttons: DialogBoxPropsButtons[],
    closeModalFn: () => void
}

export default function DialogBox({title, mainText, buttons, closeModalFn}: DialogBoxProps) {
    return (
        <Modal closeModalFn={closeModalFn}>
            <StyledDialogBox>
                <header>
                    <Title>{title}</Title>
                </header>
                <main>
                    {mainText}
                </main>
                <Footer>
                    {buttons.map(({caption, onClick}, i) => <ModalButton key={i} onClick={onClick}>{caption}</ModalButton>)}
                </Footer>
            </StyledDialogBox>
        </Modal>
    )
}