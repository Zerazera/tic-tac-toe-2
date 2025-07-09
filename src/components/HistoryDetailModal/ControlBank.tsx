import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForwardStep, faBackwardStep, faForwardFast, faBackwardFast } from "@fortawesome/free-solid-svg-icons";

const StyledControlBank = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 10px;
`

const ControlButton = styled.button`
    background-color: rgba(0, 0, 0, 0);
    font-size: 2rem;
    border: none;
    cursor: pointer;

    &:disabled {
        color: grey;
        cursor: not-allowed;
    }

    @media screen and (height < 500px) {
        font-size: 1.5rem;
    }
`

type ControlBankProps = {
    playFn: () => void,
    pauseFn: () => void,
    incrementFn: () => void,
    decrementFn: () => void,
    minFn: () => void,
    maxFn: () => void,
    isPlaying: boolean,
    atMinLength: boolean,
    atMaxLength: boolean
}

export default function ControlBank({playFn, pauseFn, incrementFn, decrementFn, minFn, maxFn, isPlaying, atMinLength, atMaxLength}:ControlBankProps) {
    return (
        <StyledControlBank>
            <ControlButton onClick={isPlaying ? pauseFn : playFn}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </ControlButton>
            <ControlButton onClick={minFn} disabled={atMinLength}>
                <FontAwesomeIcon icon={faBackwardFast} />
            </ControlButton>
            <ControlButton onClick={decrementFn} disabled={atMinLength}>
                <FontAwesomeIcon icon={faBackwardStep} />
            </ControlButton>
            <ControlButton onClick={incrementFn} disabled={atMaxLength}>
                <FontAwesomeIcon icon={faForwardStep} />
            </ControlButton>
            <ControlButton onClick={maxFn} disabled={atMaxLength}>
                <FontAwesomeIcon icon={faForwardFast} />
            </ControlButton>
        </StyledControlBank>
    )
}