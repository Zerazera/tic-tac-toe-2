import type { token } from "./token"

export type SquareValue = token | null

export type Square = {
    value: SquareValue,
    isHovered: boolean
}