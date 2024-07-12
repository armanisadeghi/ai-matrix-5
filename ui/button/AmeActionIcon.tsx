import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";

interface AmeActionIconProps extends ActionIconProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeActionIcon({ title, onClick, onMouseDown, onMouseUp, ...others }: AmeActionIconProps) {
    return (
        <Tooltip label={title}>
            <ActionIcon
                {...others}
                aria-label={title}
                variant={others.variant ?? "transparent"}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                {others.children}
            </ActionIcon>
        </Tooltip>
    );
}

export default AmeActionIcon;
