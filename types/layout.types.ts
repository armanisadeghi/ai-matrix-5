// types/layout.types.ts

export type PresetValue = [number, number, number];
export type LayoutPreset =
    | "standard"
    | "focusLeft"
    | "focusRight"
    | "minimalNav"
    | "noSidebars"
    | "iconsFullAside"
    | "iconsNoAside"
    | "iconsCompactAside"
    | "balanced"
    | "onlyHeader"
    | "standardWithFooter";
export type ModulePreset = "dashboard" | "intelligence" | "public" | "samples" | "matrixApps";
export type PagePreset =
    | "chat"
    | "settings"
    | "profile"
    | "notifications"
    | "help"
    | "about"
    | "register"
    | "notFound"
    | "error"
    | "centerContent";
export type ComponentPreset = string;
export type CustomPreset = "CustomPreset";
export type PresetType = LayoutPreset | ModulePreset | PagePreset | ComponentPreset | CustomPreset;
export type PresetMethod = "layout" | "module" | "page" | "component" | "custom" | "none";
export type DeviceType = "desktop" | "tablet" | "mobile";
