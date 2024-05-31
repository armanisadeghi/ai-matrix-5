import React from "react";
import { Button, ButtonProps, Tooltip } from "@mantine/core";

interface AmeButtonProps extends ButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeButton({ title, onClick, ...others }: AmeButtonProps) {
    return (
        <Tooltip label={title}>
            <Button onClick={onClick} {...others}>
                {others.children}
            </Button>
        </Tooltip>
    );
}

export default AmeButton;
