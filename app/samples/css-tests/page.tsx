'use client'

import { Box, useMantineTheme, useMantineColorScheme, Space } from '@mantine/core'
import AmeTextAreaFancy from '@/ui/textarea/AmeTextAreaFancy'

function Demo() {
    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()
    const boxShadow =
        colorScheme === 'dark'
            ? '0 4px 15px rgba(255, 255, 255, 0.2)'
            : '0 4px 15px rgba(0, 0, 0, 0.2)'
    const glowHover =
        colorScheme === 'dark' ? '0 0 20px rgba(255, 255, 255, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.5)'

    return (
        <>
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />

            <Box
                mx="auto"
                maw={400}
                bg={colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}
                style={{
                    boxShadow: boxShadow,
                    position: 'relative',
                    zIndex: 1,
                    '&:hover': {
                        boxShadow: glowHover
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 40,
                        left: -20,
                        right: -20,
                        bottom: -20,
                        zIndex: -1,
                        background:
                            colorScheme === 'dark'
                                ? 'rgba(0, 0, 0, 0.5)'
                                : 'rgba(255, 255, 255, 0.5)',
                        filter: 'blur(50px)'
                    }
                }}
            >
                <AmeTextAreaFancy />
            </Box>
            <Space h="xl" />
            <Space h="xl" />
        </>
    )
}

export default Demo
