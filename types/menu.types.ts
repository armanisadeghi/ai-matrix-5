// types.ts
import { ReactNode } from 'react';

export interface MenuItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;  // Optional icon property
}

export interface MenuPosition {
    x: number;
    y: number;
}

export interface ContextMenuContextType {
    menuVisible: boolean;
    menuPosition: MenuPosition;
    menuItems: MenuItem[];
    showMenu: (x: number, y: number, items: MenuItem[]) => void;
    hideMenu: () => void;
}
