import { useEffect, useRef, useMemo, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
} from "@/state/layoutAtoms";
import { CustomPresets, getLayoutPresets } from "./layoutPresets";
import { PresetType, PresetMethod, PresetValue, LayoutPreset, ModulePreset, PagePreset, ComponentPreset } from "@/types/layout.types";

const determinePresetMethod = (presetType: PresetType): PresetMethod => {
    if (presetType in ({} as Record<LayoutPreset, LayoutPreset>)) return 'layout';
    if (presetType in ({} as Record<ModulePreset, ModulePreset>)) return 'module';
    if (presetType in ({} as Record<PagePreset, PagePreset>)) return 'page';
    if (presetType in ({} as Record<ComponentPreset, ComponentPreset>)) return 'component';
    if (presetType === 'CustomPreset') return 'custom';
    return 'none';
};

const useLayoutPresets = () => {
    const [headerHeight, setHeaderHeight] = useRecoilState(headerAtom);
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);
    const [rightSidebarWidth, setRightSidebarWidth] = useRecoilState(rightSidebarAtom);
    const [footerHeight, setFooterHeight] = useRecoilState(footerAtom);
    const [isLoading, setIsLoading] = useRecoilState(loadingStateAtom);
    const [currentPriority, setCurrentPriority] = useRecoilState(presetMethodAtom);
    const deviceType = useRecoilValue(deviceTypeAtom);
    const [showHeader, setShowHeader] = useRecoilState(showHeaderToggle);
    const [showLeftSidebar, setShowLeftSidebar] = useRecoilState(showLeftSidebarToggle);
    const [showRightSidebar, setShowRightSidebar] = useRecoilState(showRightSidebarToggle);
    const [showFooter, setShowFooter] = useRecoilState(showFooterToggle);
    const presetType = useRecoilValue(presetTypeAtom);
    const customValues = useRecoilValue(customValuesAtom);
    const [overrideFlag, setOverrideFlag] = useRecoilState(overrideFlagAtom);

    const initialSet = useRef(false);
    const prevPreset = useRef<any>(null);

    const priorityOrder: ReadonlyArray<PresetMethod> = ['layout', 'module', 'page', 'component', 'custom'];

    const isHigherPriority = useCallback((newPriority: PresetMethod): boolean => {
        return priorityOrder.indexOf(newPriority) > priorityOrder.indexOf(currentPriority);
    }, [currentPriority]);

    const setPreset = useCallback((preset: { header: PresetValue, leftSidebar: PresetValue, rightSidebar: PresetValue, footer: PresetValue, toggles?: { header: boolean, leftSidebar: boolean, rightSidebar: boolean, footer: boolean } }) => {
        const sizeIndex = deviceType === 'desktop' ? 0 : deviceType === 'tablet' ? 1 : 2;

        const newHeaderHeight = preset.header[sizeIndex];
        const newLeftSidebarWidth = preset.leftSidebar[sizeIndex];
        const newRightSidebarWidth = preset.rightSidebar[sizeIndex];
        const newFooterHeight = preset.footer[sizeIndex];

        if (newHeaderHeight !== headerHeight) setHeaderHeight(newHeaderHeight);
        if (newLeftSidebarWidth !== leftSidebarWidth) setLeftSidebarWidth(newLeftSidebarWidth);
        if (newRightSidebarWidth !== rightSidebarWidth) setRightSidebarWidth(newRightSidebarWidth);
        if (newFooterHeight !== footerHeight) setFooterHeight(newFooterHeight);

        if (preset.toggles) {
            if (preset.toggles.header !== showHeader) setShowHeader(preset.toggles.header);
            if (preset.toggles.leftSidebar !== showLeftSidebar) setShowLeftSidebar(preset.toggles.leftSidebar);
            if (preset.toggles.rightSidebar !== showRightSidebar) setShowRightSidebar(preset.toggles.rightSidebar);
            if (preset.toggles.footer !== showFooter) setShowFooter(preset.toggles.footer);
        }
    }, [deviceType, headerHeight, leftSidebarWidth, rightSidebarWidth, footerHeight, showHeader, showLeftSidebar, showRightSidebar, showFooter, setHeaderHeight, setLeftSidebarWidth, setRightSidebarWidth, setFooterHeight, setShowHeader, setShowLeftSidebar, setShowRightSidebar, setShowFooter]);

    const memoizedLayoutPresets = useMemo(() => getLayoutPresets(presetType, customValues), [presetType, customValues]);

    useEffect(() => {
        const presetMethod = determinePresetMethod(presetType);

        const shouldUpdate = overrideFlag || !initialSet.current || isHigherPriority(presetMethod);

        if (shouldUpdate) {
            initialSet.current = true;

            const isPresetDifferent = JSON.stringify(memoizedLayoutPresets) !== JSON.stringify(prevPreset.current);

            if (isPresetDifferent) {
                setPreset(memoizedLayoutPresets);
                prevPreset.current = memoizedLayoutPresets;
            }

            setCurrentPriority(presetMethod);
            setIsLoading(false);

            if (overrideFlag) {
                setOverrideFlag(false);
            }
        }
    }, [memoizedLayoutPresets, presetType, overrideFlag, isHigherPriority, setPreset, setCurrentPriority, setIsLoading, setOverrideFlag]);

    return { isLoading, headerHeight, leftSidebarWidth, rightSidebarWidth, footerHeight, setOverrideFlag };
};

export default useLayoutPresets;
