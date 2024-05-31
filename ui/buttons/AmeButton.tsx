import React from "react";
import { Button, ButtonProps } from "@mantine/core";

interface AmeButtonProps extends ButtonProps {
    title: string; // used to accessibility settings WARIA-ARIA
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    primary?: boolean;
    type?: HTMLButtonElement["type"];
}

function AmeButton({ title, onClick, primary, type, ...others }: AmeButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant={primary ? "filled" : "default"}
            title={title}
            color="gray"
            type={type}
            {...others}
        >
            {others.children}
        </Button>
    );
}

export default AmeButton;
