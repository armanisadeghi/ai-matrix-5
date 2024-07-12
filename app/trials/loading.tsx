import { Box, LoadingOverlay } from '@mantine/core';
import React from 'react';

interface LoadingPageProps {
    className?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ className }) => {
    return (
        <div className={className}>
        </div>
    );
}

export default LoadingPage;

/*
 <Box>
 <LoadingOverlay
 visible={true}
 overlayProps={{ radius: 'sm', blur: 1 }} // Adjust opacity here
 loaderProps={{ color: 'pink', type: 'bars' }}
 transitionProps={{ transition: 'fade', duration: 2 }}
 />
 </Box>

 */
