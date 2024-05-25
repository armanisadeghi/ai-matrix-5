import { ActionIcon, Menu, rem } from "@mantine/core";
import Link from "next/link";

interface CollapseNavLinksProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export function CollapseNavLinks(props: CollapseNavLinksProps) {
    const { icon: Icon, label, initiallyOpened, links } = props;
    const hasLinks = Array.isArray(links);

    return hasLinks && links?.length > 0 ? (
        <Menu shadow="md" position="right-start" trigger="hover">
            <Menu.Target>
                <ActionIcon size="md">
                    <Icon style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                {links?.map((link) => (
                    <Menu.Item key={link.label} component={Link} href={link.link}>
                        {link.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    ) : (
        <ActionIcon size="md">
            <Icon style={{ width: rem(18), height: rem(18) }} />
        </ActionIcon>
    );
}
