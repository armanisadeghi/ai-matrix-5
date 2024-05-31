import React from "react";
import { Button, ButtonProps, Tooltip } from "@mantine/core";

interface AmeButtonProps extends ButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    primary?: boolean;
}

function AmeButton({ title, onClick, primary, ...others }: AmeButtonProps) {
    return (
        <Tooltip label={title}>
            <Button onClick={onClick} variant={primary ? "filled" : "light"} {...others}>
                {others.children}
            </Button>
        </Tooltip>
    );
}

export default AmeButton;
