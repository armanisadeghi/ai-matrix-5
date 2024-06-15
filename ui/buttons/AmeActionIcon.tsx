import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";

interface AmeActionIconProps extends ActionIconProps {
    tooltip: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeActionIcon({ tooltip, onClick, ...others }: AmeActionIconProps) {
    return (
        <Tooltip label={tooltip}>
            <ActionIcon {...others} aria-label={tooltip} variant={others.variant ?? "light"} onClick={onClick}>
                {others.children}
            </ActionIcon>
        </Tooltip>
    );
}

export default AmeActionIcon;
