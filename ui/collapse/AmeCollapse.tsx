import { useDisclosure, useColorScheme } from '@mantine/hooks'
import { Button, Text, Collapse, Box, Group, Paper } from '@mantine/core'
import { PiCaretCircleUpDownLight } from 'react-icons/pi'

interface CustomCollapseProps {
    activatorLabel: string
    hiddenText: string
    width?: number
    justify?: 'flex-start' | 'center' | 'left' | 'right' | 'apart' | 'between'
}

function CustomCollapse({
    activatorLabel,
    hiddenText,
    width = 1000,
    justify = 'flex-start'
}: CustomCollapseProps) {
    const [opened, { toggle }] = useDisclosure(true)
    const colorScheme = useColorScheme()
    const icon = <PiCaretCircleUpDownLight size={18} style={{ color: 'gray' }} />

    return (
        <Box
            style={{
                maxWidth: `${width}px`,
                width: '100%',
                paddingBottom: '20px'
            }}
        >
            <Group justify={justify}>
                <Button
                    variant="transparent"
                    size="sm"
                    rightSection={icon}
                    onClick={toggle}
                    styles={{
                        root: {
                            color: 'gray',
                            '&:hover': {
                                backgroundColor:
                                    colorScheme === 'dark'
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(0, 0, 0, 0.05)'
                            }
                        }
                    }}
                >
                    {activatorLabel}
                </Button>
            </Group>

            <Collapse in={opened} transitionDuration={400} transitionTimingFunction="linear">
                <Paper
                    shadow="sm"
                    radius="lg"
                    withBorder
                    p="md"
                    style={{
                        transition: 'background-color 300ms linear',
                        '&:hover': {
                            backgroundColor:
                                colorScheme === 'dark'
                                    ? 'rgba(55, 55, 55, 0.1)'
                                    : 'rgba(200, 200, 200, 0.1)'
                        }
                    }}
                >
                    <Text size="sm">{hiddenText}</Text>
                </Paper>
            </Collapse>
        </Box>
    )
}

export default CustomCollapse
