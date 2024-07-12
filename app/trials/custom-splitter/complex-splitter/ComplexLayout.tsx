'use client';

import React from 'react';
import EnhancedResizableLayout from '@/app/trials/custom-splitter/complex-splitter/EnhancedResizableLayout';
import styles from './complex-layout.module.css';

const ComplexLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>Header</header>
            <EnhancedResizableLayout
                direction="horizontal"
                initialSizes={[250, window.innerWidth - 500]}
                minSizes={[150, 300]}
            >
                <EnhancedResizableLayout
                    direction="vertical"
                    initialSizes={[200, window.innerHeight - 250]}
                    minSizes={[100, 100]}
                >
                    <div className={styles.sidebar}>Left Top</div>
                    <div className={styles.sidebar}>Left Bottom</div>
                </EnhancedResizableLayout>
                <EnhancedResizableLayout
                    direction="horizontal"
                    initialSizes={[window.innerWidth - 500, 250]}
                    minSizes={[300, 150]}
                >
                    <div className={styles.main}>Main Content</div>
                    <EnhancedResizableLayout
                        direction="vertical"
                        initialSizes={[200, 200, window.innerHeight - 450]}
                        minSizes={[100, 100, 100]}
                    >
                        <div className={styles.sidebar}>Right Top</div>
                        <div className={styles.sidebar}>Right Middle</div>
                        <div className={styles.sidebar}>Right Bottom</div>
                    </EnhancedResizableLayout>
                </EnhancedResizableLayout>
            </EnhancedResizableLayout>
        </div>
    );
};

export default ComplexLayout;
