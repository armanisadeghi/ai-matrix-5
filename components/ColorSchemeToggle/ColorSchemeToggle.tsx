"use client";

import {
    ActionIcon,
    Group,
    rem,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
    ColorSchemeScript,
    MantineProvider,
    MantineSize,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ColorSchemeToggle.module.scss";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";

interface ColorSchemeToggleProps {
    size?: MantineSize;
}

export function ColorSchemeToggle({ size = "md" }: ColorSchemeToggleProps) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

    return (
        <AmeActionIcon
            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
            aria-label="Toggle color scheme"
            size={size}
            title={`Switch to ${computedColorScheme === "light" ? "dark" : "light"} mode`}
        >
            <IconSun className={cx(classes.icon, classes.light)} />
            <IconMoon className={cx(classes.icon, classes.dark)} />
        </AmeActionIcon>
    );
}
