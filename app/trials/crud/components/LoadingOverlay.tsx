import { Box, LoadingOverlay } from '@mantine/core';
import React from 'react';

interface LoadingPageProps {
    className?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ className }) => {
    return (
        <div className={className}>
            <Box>
                <LoadingOverlay
                    visible={true}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
            </Box>
        </div>
    );
}

export default LoadingPage;
