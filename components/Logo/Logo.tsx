import {Group, Highlight, UnstyledButton} from '@mantine/core';
import Image from "next/image"

export function Logo() {
    return (
        <Group gap="sm" component={UnstyledButton}>
            <Image src="/logo.png" alt="ai-matrix logo" height={24} width={24}/>
            <Highlight
                highlight="ai"
                fw={600}
                fz="lg"
                highlightStyles={{
                    backgroundImage:
                        'linear-gradient(45deg, var(--mantine-color-blue-5), var(--mantine-color-violet-7))',
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                AI Matrix
            </Highlight>
        </Group>
    );
}
