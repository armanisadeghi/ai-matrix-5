import React from 'react';

// Simple React component to render FFT data as bars
export default function MicFFT({ fft, className }) {
    const height = 100; // Define a constant height for bars

    return (
        <div className={className}>
            {Array.from({ length: 24 }).map((_, index) => {
                const value = (fft[index] ?? 0) / 4;
                const barHeight = Math.min(Math.max(height * value, 2), height);
                const yOffset = height * 0.5 - barHeight * 0.5;

                return (
                    <div
                        key={index}
                        style={{
                            height: `${barHeight}px`,
                            marginTop: `${yOffset}px`,
                            width: '20px',
                            backgroundColor: 'blue',
                            display: 'inline-block',
                            marginLeft: '2px'
                        }}
                    />
                );
            })}
        </div>
    );
}
