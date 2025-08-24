import { useState } from "react"
import type { SquareValue } from "../types/Square"
import type { token } from "../types/token"

export function useSquares() {
    const initialSquareValues: () => SquareValue[] = () => Array(9).fill(null)
    const initialAreSquaresHovered: () => boolean[] = () => Array(9).fill(false)
    
    const [squareValues, setSquareValues] = useState(() => initialSquareValues())
    const [areSquaresHovered, setAreSquaresHovered] = useState(() => initialAreSquaresHovered())
    
    const resetSquares = () => {
        setSquareValues(initialSquareValues())
        setAreSquaresHovered(initialAreSquaresHovered())
    }
    
    const setSquareValue = (index: number, token: token) => setSquareValues(prev => {
        const copy = [...prev]
        copy[index] = token
        return copy
    })
    
    
    const hoverSquare = (index: number) => setAreSquaresHovered(prev => {
        const copy = [...prev]
        prev[index] = true
        return copy
    })

    const unHoverSquare = (index: number) => setAreSquaresHovered(prev => {
        const copy = [...prev]
        prev[index] = false
        return copy
    })

    return {
        squareValues,
        setSquareValue,
        setSquareValues,
        areSquaresHovered,
        hoverSquare,
        unHoverSquare,
        resetSquares

    }
}