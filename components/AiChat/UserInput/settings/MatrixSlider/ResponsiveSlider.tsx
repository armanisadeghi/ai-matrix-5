import React, { useEffect, useState } from 'react';
import FullSlider from './FullSlider';
import CompactSlider from './CompactSlider';

const ResponsiveSlider = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isSmallScreen ? <CompactSlider /> : <FullSlider />;
};

export default ResponsiveSlider;
