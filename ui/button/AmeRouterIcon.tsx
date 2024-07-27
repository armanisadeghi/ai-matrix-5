import AmeRouterLink from '@/ui/router/AmeRouterLink';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';

interface AmeActionRouterProps extends ActionIconProps {
    uniqueId: string;
    startPath: string;
    linkTo: string;
    UrlQueryParams?: Record<string, string>;
    children: React.ReactNode;
    active?: boolean;
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AmeRouterIcon({ uniqueId, startPath, linkTo, UrlQueryParams, children, active, title, onClick, ...others }: AmeActionRouterProps) {
    return (
        <Tooltip label={title}>
            <AmeRouterLink uniqueId={uniqueId} startPath={startPath} linkTo={linkTo} UrlQueryParams={UrlQueryParams} active={active}>
                <ActionIcon {...others} aria-label={title} variant={others.variant ?? 'transparent'} onClick={onClick}>
                    {children}
                </ActionIcon>
            </AmeRouterLink>
        </Tooltip>
    );
}

export default AmeRouterIcon;






