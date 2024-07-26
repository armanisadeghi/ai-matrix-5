// theme.ts
'use client';

import { ActionIcon, Button, createTheme, MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = createTheme({
    primaryColor: "blue",
    primaryShade: 8,
    defaultRadius: "md",
    fontFamily: "Inter, sans-serif",
    headings: {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        sizes: {
            h1: { fontSize: "2.5rem", lineHeight: "1.4" },
            h2: { fontSize: "2rem", lineHeight: "1.5" },
            h3: { fontSize: "1.75rem", lineHeight: "1.6" },
            h4: { fontSize: "1.5rem", lineHeight: "1.6" },
            h5: { fontSize: "1.25rem", lineHeight: "1.6" },
            h6: { fontSize: "1rem", lineHeight: "1.6" },
        },
    },
    focusRing: "auto",
    components: {
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: "light",
                color: "gray",
            },
        }),
        Button: Button.extend({
            defaultProps: {
                variant: "light",
                color: "gray",
            },
        }),
    },
});
