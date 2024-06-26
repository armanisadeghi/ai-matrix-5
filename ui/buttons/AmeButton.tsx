import React from "react";
import { Button, ButtonProps, useMantineColorScheme } from "@mantine/core";

interface AmeButtonProps extends ButtonProps {
    title: string; // used to accessibility settings WARIA-ARIA
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    primary?: boolean;
    type?: HTMLButtonElement["type"];
    component?: any;
    href?: string;
}

function AmeButton({ title, onClick, primary, type, component, href, ...others }: AmeButtonProps) {
    const { colorScheme } = useMantineColorScheme();

    const buttonProps: ButtonProps = {
        color: colorScheme === "dark" ? "gray" : "",
        variant: colorScheme === "dark" && !primary ? "default" : primary ? "light" : "subtle",
        ...others,
    };

    return (
        <Button onClick={onClick} title={title} component={component} href={href} {...buttonProps}>
            {others.children}
        </Button>
    );
}

export default AmeButton;
