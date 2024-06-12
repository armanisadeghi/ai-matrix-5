import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";

interface AmeOverComponentIconProps extends ActionIconProps {
    toolTip: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeOverComponentIcon({ toolTip, onClick, children, ...others }: AmeOverComponentIconProps) {
    return (
        <Tooltip label={toolTip}>
            <ActionIcon {...others} aria-label={toolTip} onClick={onClick} size="sm" variant="transparent" style={{ color: '#909090' }}>
                {children}
            </ActionIcon>
        </Tooltip>
    );
}

export default AmeOverComponentIcon;
