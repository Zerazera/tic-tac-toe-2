import styled from "@emotion/styled"
import type { ReactNode } from "react"

const Label = styled.label`
    display: flex;
    cursor: pointer;
    padding: 5px;

    &:has(input[type="radio"]:checked) {
        border: 1px solid white;
    }
`

const SquareInput = styled.input`
    visibility: hidden;
    width: 0;
    margin: 0;
`

type SquareRadioProps = {
    inputId: string,
    value: string | number | readonly string[],
    name: string,
    checked: boolean,
    onChange: () => void,
    children: ReactNode
}

export default function SquareRadio({inputId, value, name, checked, onChange, children}: SquareRadioProps) {
    return (
        <Label htmlFor={inputId}>
            <SquareInput
                id={inputId}
                type="radio"
                value={value}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            {children}
        </Label>
    )
}