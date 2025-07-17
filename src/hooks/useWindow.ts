import { useState, useEffect } from "react"

export function useWindow() {
    const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)

    useEffect(() => {
        const onResize = () => {
            setWindowInnerWidth(window.innerWidth)
            setWindowInnerHeight(window.innerHeight)
        }

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return {
        windowInnerWidth,
        windowInnerHeight
    }
}