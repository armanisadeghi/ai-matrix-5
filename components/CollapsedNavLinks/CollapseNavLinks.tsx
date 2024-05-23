import {ActionIcon, Menu, rem} from "@mantine/core";

interface CollapseNavLinksProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export function CollapseNavLinks(props: CollapseNavLinksProps) {
    const {icon: Icon, label, initiallyOpened, links} = props
    const hasLinks = Array.isArray(links);

    return (
        (hasLinks && links?.length > 0) ? <Menu shadow="md" position="right-start" trigger="hover">
            <Menu.Target>
                <ActionIcon size="lg">
                    <Icon style={{width: rem(24), height: rem(24)}}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                {links?.map(link => <Menu.Item key={link.label}>{link.label}</Menu.Item>)}
            </Menu.Dropdown>
        </Menu> : <ActionIcon size="lg">
            <Icon style={{width: rem(24), height: rem(24)}}/>
        </ActionIcon>
    );
}