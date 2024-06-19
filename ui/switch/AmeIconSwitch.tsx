import { Switch, useMantineTheme, rem } from '@mantine/core'
import { IconType } from 'react-icons'
import { CSSProperties } from 'react'

interface AmeIconSwitchProps {
    onIcon: IconType // Component for the "on" state icon
    offIcon: IconType // Component for the "off" state icon
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' // Optional size prop with default
    onChange?: (checked: boolean) => void // Optional onChange handler
}

const AmeIconSwitch: React.FC<AmeIconSwitchProps> = ({
    onIcon: OnIcon,
    offIcon: OffIcon,
    size = 'sm',
    onChange
}) => {
    const theme = useMantineTheme()

    return (
        <Switch
            size={size}
            offLabel={
                <OffIcon
                    style={{
                        width: rem(18),
                        height: rem(18)
                    }}
                />
            }
            onLabel={
                <OnIcon
                    color={theme.colors.gray[4]}
                    style={{
                        width: rem(18),
                        height: rem(18)
                    }}
                />
            }
            onChange={(event) => onChange?.(event.currentTarget.checked)}
        />
    )
}

export default AmeIconSwitch
