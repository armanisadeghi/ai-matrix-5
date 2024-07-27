// ContextMenuProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, MenuPosition, ContextMenuContextType } from '@/types/menu.types';

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error('useContextMenu must be used within a ContextMenuProvider');
    return context;
};

interface ContextMenuProviderProps {
    children: ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<MenuPosition>({ x: 0, y: 0 });
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const showMenu = (x: number, y: number, items: MenuItem[]) => {
        setMenuPosition({ x, y });
        setMenuItems(items);
        setMenuVisible(true);
    };

    const hideMenu = () => setMenuVisible(false);

    return (
        <ContextMenuContext.Provider value={{ menuVisible, menuPosition, menuItems, showMenu, hideMenu }}>
            {children}
        </ContextMenuContext.Provider>
    );
};
