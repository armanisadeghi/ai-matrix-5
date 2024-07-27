'use client';

import { useClickCounter } from '@/app/trials/nested/hooks/useClickCounter';
import { rem, TextInput } from '@mantine/core';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";

const ClickCounter = () => {
    const { count, increment, decrement } = useClickCounter();

    return (
        <div style={{ maxWidth: '300px', margin: '20px auto', padding: '10px', textAlign: 'center' }}>
            <TextInput
                label="Test State Management"
                value={count}
                size='xl'
                leftSection={<GrSubtractCircle style={{ cursor: 'pointer' }} onClick={decrement} />}
                leftSectionWidth={rem(50)}
                rightSection={<MdOutlineLibraryAdd style={{ cursor: 'pointer' }} onClick={increment} />}
                rightSectionWidth={rem(50)}
                styles={{
                    input: { textAlign: 'center' }
                }}
            />
        </div>
    );
};

export default ClickCounter;
