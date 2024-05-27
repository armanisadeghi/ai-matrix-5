"use client";

import { ActionIcon, Group, rem, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoon, IconMoonStars, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ColorSchemeToggle.module.css";

const iconStyles = { width: rem(18), height: rem(18) };

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const theme = useMantineTheme();

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} style={iconStyles} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} style={iconStyles} />
            </ActionIcon>
        </Group>
    );
}
