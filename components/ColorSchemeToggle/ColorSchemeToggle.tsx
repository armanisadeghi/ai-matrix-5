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
import classes from "./ColorSchemeToggle.module.css";

interface ColorSchemeToggleProps {
    size?: MantineSize;
}

export function ColorSchemeToggle({ size = "md" }: ColorSchemeToggleProps) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

    return (
        <Group justify="center">
            <Tooltip label={`Switch to ${computedColorScheme === "light" ? "dark" : "light"} mode`}>
                <ActionIcon
                    variant="transparent"
                    onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                    aria-label="Toggle color scheme"
                    size={size}
                >
                    <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                    <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
}
