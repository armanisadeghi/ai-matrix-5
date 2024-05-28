'use client'
import React from 'react';
import DualSplitter from '@/ui/split/DynamicSplitter';

const ComplexLayout = () => {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <DualSplitter>
                <div>Top Left Panel</div>
                <div>Top Right Panel</div>
                <div>Bottom Left Panel</div>
                <div>Bottom Right Panel</div>
            </DualSplitter>
        </div>
    );
};

export default ComplexLayout;
