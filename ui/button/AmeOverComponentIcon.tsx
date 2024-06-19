import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'

interface AmeOverComponentIconProps extends ActionIconProps {
    tooltip: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function AmeOverComponentIcon({
    tooltip,
    onClick,
    children,
    ...others
}: AmeOverComponentIconProps) {
    return (
        <Tooltip label={tooltip}>
            <ActionIcon
                {...others}
                aria-label={tooltip}
                onClick={onClick}
                size="sm"
                variant="transparent"
                style={{ color: '#909090' }}
            >
                {children}
            </ActionIcon>
        </Tooltip>
    )
}

export default AmeOverComponentIcon
