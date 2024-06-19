// state/layoutAtoms.ts
import { atom, selector, selectorFamily, waitForAll } from 'recoil'
import { PresetMethod, DeviceType } from '@/types/layout'
import { CustomPresets } from '@/hooks/layout/layoutPresets'

// Atoms holding the size directly
export const rightSidebarAtom = atom<number>({
    key: 'rightSidebarAtom',
    default: 0
})

export const leftSidebarAtom = atom<number>({
    key: 'leftSidebarAtom',
    default: 0
})

export const footerAtom = atom<number>({
    key: 'footerAtom',
    default: 0
})

export const headerAtom = atom<number>({
    key: 'headerAtom',
    default: 50
})

export const loadingStateAtom = atom<boolean>({
    key: 'loadingStateAtom',
    default: true
})

export const presetMethodAtom = atom<PresetMethod>({
    key: 'presetMethodAtom',
    default: 'none'
})

export const deviceTypeAtom = atom<DeviceType>({
    key: 'deviceTypeAtom',
    default: 'desktop'
})

export const rightSidebarToggleOptionsAtom = atom<number[]>({
    key: 'rightSidebarToggleOptionsAtom',
    default: [250, 150, 70, 0]
})

export const leftSidebarToggleOptionsAtom = atom<number[]>({
    key: 'leftSidebarToggleOptionsAtom',
    default: [250, 150, 70, 0]
})

export const footerToggleOptionsAtom = atom<number[]>({
    key: 'footerToggleOptionsAtom',
    default: [70, 60, 50, 0]
})

export const headerToggleOptionsAtom = atom<number[]>({
    key: 'headerToggleOptionsAtom',
    default: [70, 60, 50, 0]
})

export const showHeaderToggle = atom<boolean>({
    key: 'showHeaderToggle',
    default: false
})

export const showLeftSidebarToggle = atom<boolean>({
    key: 'showLeftSidebarToggle',
    default: true
})

export const showRightSidebarToggle = atom<boolean>({
    key: 'showRightSidebarToggle',
    default: true
})

export const showFooterToggle = atom<boolean>({
    key: 'showFooterToggle',
    default: false
})

export const presetTypeAtom = atom<string>({
    key: 'presetTypeAtom',
    default: 'standard'
})

export const customValuesAtom = atom<CustomPresets>({
    key: 'customValuesAtom',
    default: {}
})

export const overrideFlagAtom = atom<boolean>({
    key: 'overrideFlagAtom',
    default: false
})

export const windowWidthState = atom<number | null>({
    key: 'windowWidthState',
    default: null
})

export const windowHeightState = atom<number | null>({
    key: 'windowHeightState',
    default: null
})

export const availableWidthSelector = selector<number>({
    key: 'availableWidthSelector',
    get: ({ get }) => {
        const { leftSidebarWidth, rightSidebarWidth, windowWidth } = get(
            waitForAll({
                leftSidebarWidth: leftSidebarAtom,
                rightSidebarWidth: rightSidebarAtom,
                windowWidth: windowWidthState
            })
        )

        const availableWidth = windowWidth - leftSidebarWidth - rightSidebarWidth
        console.log('Available Width:', availableWidth)
        return availableWidth
    }
})

export const availableHeightSelector = selector<number>({
    key: 'availableHeightSelector',
    get: ({ get }) => {
        const { headerHeight, footerHeight, windowHeight } = get(
            waitForAll({
                headerHeight: headerAtom,
                footerHeight: footerAtom,
                windowHeight: windowHeightState
            })
        )

        const availableHeight = windowHeight - (headerHeight ?? 0) - (footerHeight ?? 0)
        console.log('Available Height:', availableHeight)

        return availableHeight
    }
})
