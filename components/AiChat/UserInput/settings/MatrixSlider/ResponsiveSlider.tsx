import React, { useEffect, useState } from 'react'
import FullSlider from './FullSlider'
import CompactSlider from './CompactSlider'

// This isn't needed anymore because the new one is much better and fully reusable and integrated with atoms!

const ResponsiveSlider = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return isSmallScreen ? <CompactSlider /> : <FullSlider />
}

export default ResponsiveSlider
