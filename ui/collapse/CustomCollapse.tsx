// ui/collapse/CustomCollapse.tsx

import { useDisclosure } from '@mantine/hooks'
import { Button, Text, Collapse, Box, Group, Paper } from '@mantine/core'
import { SlArrowDown } from 'react-icons/sl'
import { FaAngleDoubleDown } from 'react-icons/fa'

interface CustomCollapseProps {
    activatorLabel: string
    hiddenText: string
    preText: string
    width?: number
    justify?: 'flex-start' | 'center' | 'left' | 'right' | 'apart' | 'between'
}

function CustomCollapse({
    activatorLabel,
    hiddenText,
    preText,
    width = 1000,
    justify = 'flex-start'
}: CustomCollapseProps) {
    const [opened, { toggle }] = useDisclosure(false)
    const icon = <FaAngleDoubleDown size={16} />

    return (
        <Box
            style={{
                maxWidth: `${width}px`,
                width: '100%',
                paddingBottom: '20px'
            }}
        >
            <Group justify={justify}>
                <Text size="sm">{preText}</Text>
                <Button variant="transparent" size="sm" leftSection={icon} onClick={toggle}>
                    {activatorLabel}
                </Button>
            </Group>

            <Collapse in={opened} transitionDuration={400} transitionTimingFunction="linear">
                <Paper shadow="sm" radius="lg" withBorder p="xl">
                    <Text size="sm">{hiddenText}</Text>
                </Paper>
            </Collapse>
        </Box>
    )
}

export default CustomCollapse
