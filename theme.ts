// theme.ts

"use client";

import { ActionIcon, Button, createTheme, MantineColorsTuple, TextInput } from "@mantine/core";

const myColor: MantineColorsTuple = [
    "#eef3ff",
    "#dce4f5",
    "#b9c7e2",
    "#94a8d0",
    "#748dc1",
    "#5f7cb8",
    "#5474b4",
    "#44639f",
    "#39588f",
    "#2d4b81",
];

export const theme = createTheme({
    colors: { "pale-blue": myColor },
    primaryColor: "pale-blue",
    primaryShade: 6,
    defaultRadius: "md",
    fontFamily: "Inter",
    headings: {
        fontFamily: "Inter",
    },
    focusRing: "auto",
    components: {
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: "light",
                color: "dark",
            },
        }),
        Button: Button.extend({
            defaultProps: {
                variant: "light",
                color: "gray",
            },
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                classNames: {
                    input: "text-input",
                },
            },
        }),
    },
});
