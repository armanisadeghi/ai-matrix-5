// theme.ts

"use client";

import { ActionIcon, Button, createTheme } from "@mantine/core";

export const theme = createTheme({
    primaryColor: "blue",
    primaryShade: 8,
    defaultRadius: "md",
    fontFamily: "Inter, sans-serif",
    headings: {
        fontFamily: "Inter, sans-serif",
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
