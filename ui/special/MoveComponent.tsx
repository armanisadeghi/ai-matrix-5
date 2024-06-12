// ui/special/MoveComponent.tsx
import React, { useState } from 'react';
import { Group, Text, Code, rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';

interface MoveComponentProps {
    initialX?: number;
    initialY?: number;
}

const MoveComponent: React.FC<MoveComponentProps> = ({ initialX = 0.2, initialY = 0.6 }) => {
    const [value, setValue] = useState({ x: initialX, y: initialY });
    const { ref, active } = useMove(setValue);

    return (
        <>
            <Group justify="center">
                <div
                    ref={ref}
                    style={{
                        width: rem(400),
                        height: rem(120),
                        backgroundColor: 'var(--mantine-color-blue-light)',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: `calc(${value.x * 100}% - ${rem(8)})`,
                            top: `calc(${value.y * 100}% - ${rem(8)})`,
                            width: rem(16),
                            height: rem(16),
                            backgroundColor: active ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-blue-7)',
                        }}
                    />
                </div>
            </Group>
            <Text ta="center" mt="sm">
                Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
            </Text>
        </>
    );
};

export default MoveComponent;



/*
usage:
import React from 'react';
import MoveComponent from '../nice-working/MoveComponent';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>My Next.js App</h1>
      <MoveComponent initialX={0.5} initialY={0.5} />
    </div>
  );
};

export default HomePage;

 */
