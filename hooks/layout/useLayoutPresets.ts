import { useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    rightSidebarAtom,
    leftSidebarAtom,
    footerAtom,
    headerAtom,
    loadingStateAtom,
    presetMethodAtom,
    deviceTypeAtom,
    showHeaderToggle,
    showLeftSidebarToggle,
    showRightSidebarToggle,
    showFooterToggle,
    presetTypeAtom,
    customValuesAtom,
    overrideFlagAtom
} from '@/state/layoutAtoms'
import { CustomPresets, getLayoutPresets } from './layoutPresets'
import {
    PresetType,
    PresetMethod,
    PresetValue,
    LayoutPreset,
    ModulePreset,
    PagePreset,
    ComponentPreset
} from '@/types/layout'

const determinePresetMethod = (presetType: PresetType): PresetMethod => {
    if (presetType in ({} as Record<LayoutPreset, LayoutPreset>)) return 'layout'
    if (presetType in ({} as Record<ModulePreset, ModulePreset>)) return 'module'
    if (presetType in ({} as Record<PagePreset, PagePreset>)) return 'page'
    if (presetType in ({} as Record<ComponentPreset, ComponentPreset>)) return 'component'
    if (presetType === 'CustomPreset') return 'custom'
    return 'none'
}

const useLayoutPresets = () => {
    const [headerHeight, setHeaderHeight] = useRecoilState(headerAtom)
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom)
    const [rightSidebarWidth, setRightSidebarWidth] = useRecoilState(rightSidebarAtom)
    const [footerHeight, setFooterHeight] = useRecoilState(footerAtom)
    const [isLoading, setIsLoading] = useRecoilState(loadingStateAtom)
    const [currentPriority, setCurrentPriority] = useRecoilState(presetMethodAtom)
    const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom)
    const [showHeader, setShowHeader] = useRecoilState(showHeaderToggle)
    const [showLeftSidebar, setShowLeftSidebar] = useRecoilState(showLeftSidebarToggle)
    const [showRightSidebar, setShowRightSidebar] = useRecoilState(showRightSidebarToggle)
    const [showFooter, setShowFooter] = useRecoilState(showFooterToggle)
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom)
    const [customValues, setCustomValues] = useRecoilState(customValuesAtom)
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom)

    const initialSet = useRef(false)

    const priorityOrder: ReadonlyArray<PresetMethod> = [
        'layout',
        'module',
        'page',
        'component',
        'custom'
    ]

    const isHigherPriority = (newPriority: PresetMethod): boolean => {
        return priorityOrder.indexOf(newPriority) > priorityOrder.indexOf(currentPriority)
    }

    const setPreset = (preset: {
        header: PresetValue
        leftSidebar: PresetValue
        rightSidebar: PresetValue
        footer: PresetValue
        toggles?: { header: boolean; leftSidebar: boolean; rightSidebar: boolean; footer: boolean }
    }) => {
        const sizeIndex = deviceType === 'desktop' ? 0 : deviceType === 'tablet' ? 1 : 2

        setHeaderHeight(preset.header[sizeIndex])
        setLeftSidebarWidth(preset.leftSidebar[sizeIndex])
        setRightSidebarWidth(preset.rightSidebar[sizeIndex])
        setFooterHeight(preset.footer[sizeIndex])

        if (preset.toggles) {
            setShowHeader(preset.toggles.header)
            setShowLeftSidebar(preset.toggles.leftSidebar)
            setShowRightSidebar(preset.toggles.rightSidebar)
            setShowFooter(preset.toggles.footer)
        }
    }

    useEffect(() => {
        const presetMethod = determinePresetMethod(presetType)

        if (overrideFlag || !initialSet.current || isHigherPriority(presetMethod)) {
            initialSet.current = true
            const layoutPresets = getLayoutPresets(presetType, customValues)
            setPreset(layoutPresets)
            setCurrentPriority(presetMethod)
            setIsLoading(false)
            if (overrideFlag) {
                setOverrideFlag(false) // Reset the override flag after applying the override
            }
        }
    }, [presetType, customValues, deviceType, overrideFlag])

    return {
        isLoading,
        headerHeight,
        leftSidebarWidth,
        rightSidebarWidth,
        footerHeight,
        setOverrideFlag
    }
}

export default useLayoutPresets
