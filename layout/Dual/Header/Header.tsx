import { ActionIcon, Avatar, Burger, Group, Menu, TextInput, Tooltip } from "@mantine/core";
import { IconBell, IconSearch, IconSettings2 } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import Link from "next/link";
import { PATH_ACCOUNT } from "@/routes";
import { useLayout } from "../LayoutContext";

type Props = {
    tabletMatch?: boolean;
};

export function Header({ tabletMatch }: Props) {
    const {
        toggleOpened, opened, toggleAside, asideOpen,
    } = useLayout();

    return (
        <Group h="100%" px="md" align="center" justify="space-between" style={{ flexWrap: "nowrap" }}>
            <Group>
                <Burger opened={opened} onClick={toggleOpened} hiddenFrom="sm" size="sm" />
                <Burger opened={asideOpen} onClick={toggleAside} visibleFrom="lg" size="sm" />
                <Logo />
            </Group>
            <Group style={{ flexGrow: 1, justifyContent: "center" }}>
                <TextInput
                    size="xs"
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: "1 1 auto", minWidth: "60px", maxWidth: tabletMatch ? "350px" : "500px" }}
                    visibleFrom="sm"
                />
            </Group>
            <Group>
                <Tooltip label="Search">
                    <ActionIcon hiddenFrom="md" title="search" variant="transparent">
                        <IconSearch size={18} />
                    </ActionIcon>
                </Tooltip>
                <ColorSchemeToggle />
                <Tooltip label="Notifications">
                    <ActionIcon title="notifications" variant="transparent">
                        <IconBell size={18} />
                    </ActionIcon>
                </Tooltip>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <ActionIcon title="user menu" variant="transparent">
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
                                radius="50%"
                            />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            component={Link}
                            href={PATH_ACCOUNT.settings}
                            leftSection={<IconSettings2 size={16} />}
                        >
                            Settings
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}
