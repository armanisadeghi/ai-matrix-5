"use client";

import { ActionIcon, Group, rem, Tooltip, useComputedColorScheme, useMantineColorScheme, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ColorSchemeToggle.module.css";

const iconStyles = { width: rem(18), height: rem(18) };

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

    return (
        <Group justify="center">
            <Tooltip label={`Switch to ${computedColorScheme === "light" ? "dark" : "light"} mode`}>
                <ActionIcon
                    variant="transparent"
                    onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                    aria-label="Toggle color scheme"
                >
                    <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} style={iconStyles} />
                    <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} style={iconStyles} />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
}

