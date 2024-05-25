import { ActionIcon, Avatar, Burger, BurgerProps, Group, Menu, rem, TextInput } from "@mantine/core";
import { IconBell, IconSearch, IconSettings2 } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import Link from "next/link";
import { PATH_ACCOUNT } from "@/routes";

type Props = {
    opened: BurgerProps["opened"];
    toggle: () => void;
    desktopOpened: boolean; // toggle control on large screens
    toggleDesktop: () => void;
};

export function Header(props: Props) {
    const { toggle, opened, toggleDesktop, desktopOpened } = props;

    return (
        <Group h="100%" px="md" align="center" justify="space-between" style={{ flexWrap: "nowrap" }}>
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="lg" size="sm" />
                <Logo />
            </Group>
            <Group style={{ flexGrow: 1, justifyContent: "center" }}>
                <TextInput
                    leftSection={<IconSearch size={14} />}
                    placeholder="Search information, messages and resources"
                    style={{ flex: "1 1 auto", minWidth: "60px", maxWidth: "400px" }}
                    visibleFrom="md"
                />
            </Group>
            <Group>
                <ActionIcon hiddenFrom="md" title="search">
                    <IconSearch size={18} />
                </ActionIcon>
                <ColorSchemeToggle />
                <ActionIcon title="notifications">
                    <IconBell size={18} />
                </ActionIcon>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <ActionIcon title="user menu">
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
                            leftSection={<IconSettings2 style={{ width: rem(16), height: rem(16) }} />}
                        >
                            Settings
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}
