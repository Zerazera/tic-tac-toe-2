import { useState } from "react"
import type { Square } from "../types/Square"

export function useSquares() {
    const emptySquares: () => Square[] = () => Array(9).fill(null).map(_ => ({value: null, isHovered: false}))
    const [squares, setSquares] = useState(() => emptySquares())
    const resetSquares = () => setSquares(() => emptySquares())
    const hoverSquare = (index: number) => setSquares(prev => prev.map((square, i) => index === i ? {...square, isHovered: true} : {...square}))
    const unHoverSquare = (index: number) => setSquares(prev => prev.map((square, i) => index === i ? {...square, isHovered: false}  : {...square}))

    return {
        squares,
        setSquares,
        resetSquares,
        hoverSquare,
        unHoverSquare
    }
}