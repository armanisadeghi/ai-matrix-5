import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";

interface AmeActionIconProps extends ActionIconProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeActionIcon({ title, onClick, ...others }: AmeActionIconProps) {
    return (
        <Tooltip label={title}>
            <ActionIcon {...others} aria-label={title} variant={others.variant ?? "transparent"} onClick={onClick}>
                {others.children}
            </ActionIcon>
        </Tooltip>
    );
}

export default AmeActionIcon;
