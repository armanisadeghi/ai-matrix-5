// use this for back and forward navigation

import { useRouter } from 'next/navigation'
import AmeActionIcon from '@/ui/buttons/AmeActionIcon'
import AmeButton from '@/ui/buttons/AmeButton'
import {
    IconArrowLeft,
    IconArrowRight,
    IconChevronCompactLeft,
    IconChevronRight
} from '@tabler/icons-react'
import { ActionIconProps, ButtonProps } from '@mantine/core'

interface AmeNavButtonProps {
    navigateTo: 'back' | 'next'
    asIcon?: boolean // prefer icon buttons or full buttons
}

function AmeNavButton({ navigateTo, asIcon }: AmeNavButtonProps) {
    const router = useRouter()

    const handleNavigate = () => {
        if (navigateTo === 'back') {
            router.back()
        } else {
            router.forward()
        }
    }

    const canNavigate = () => {
        let canNav = true
        if (typeof window !== 'undefined') {
            // todo: will look for alternatives instead of using experimental navigation api supported in chrome and edge

            let isChromium = window.chrome

            if (isChromium) {
                if (typeof navigation !== undefined) {
                    if (navigateTo == 'back') {
                        canNav = navigation.canGoBack
                    } else {
                        canNav = navigation.canGoForward
                    }
                }
            }
        }

        return canNav
    }

    const text = navigateTo === 'back' ? 'Go back' : 'Go forward'
    const icon = navigateTo === 'back' ? <IconArrowLeft size={18} /> : <IconArrowRight size={18} />

    let buttonProps: ButtonProps = {
        disabled: !canNavigate()
    }

    let actionIconProps: ActionIconProps = {
        disabled: !canNavigate()
    }

    if (navigateTo == 'back') {
        buttonProps.leftSection = icon
    } else {
        buttonProps.rightSection = icon
    }

    return asIcon ? (
        <AmeActionIcon tooltip={text} onClick={handleNavigate} {...actionIconProps}>
            {icon}
        </AmeActionIcon>
    ) : (
        <AmeButton title={text} onClick={handleNavigate} {...buttonProps}>
            {text}
        </AmeButton>
    )
}

export default AmeNavButton
