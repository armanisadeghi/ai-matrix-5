import { ActionIcon, Avatar, MantineRadius, Menu } from "@mantine/core";
import { IconPalette, IconSettings2 } from "@tabler/icons-react";
import { TbLogout } from "react-icons/tb";

import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { PATH_USER } from "@/routes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MantineSize } from "@mantine/core";
import AmeText from "@/ui/typography/AmeText";

type UserMenuProps = {
    componentSize: MantineSize;
    radius?: MantineRadius;
};

export function UserMenu({ componentSize, radius }: UserMenuProps) {
    const { user, isLoading } = useUser();
    const userPictureLink = user?.picture;

    if (isLoading) {
        return (
            <ActionIcon
                title="user menu"
                size={componentSize}
                variant="transparent"
                style={{ visibility: "hidden" }}
            ></ActionIcon>
        );
    }

    return (
        <Menu width={200} shadow="md" position="bottom-end" offset={17} trigger="hover">
            <Menu.Target>
                <ActionIcon title="user menu" size={componentSize} variant="transparent" radius={radius}>
                    {userPictureLink ? (
                        <Avatar src={userPictureLink} radius="xs" size={componentSize} />
                    ) : (
                        <FaRegUser size={componentSize === "md" ? 24 : 18} />
                    )}
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>
                    <AmeText>{user?.name}</AmeText>
                    <AmeText>{user?.email}</AmeText>
                </Menu.Label>
                <Menu.Divider></Menu.Divider>
                <Menu.Item component={Link} href={PATH_USER.tabs("personal")} leftSection={<IconSettings2 size={16} />}>
                    Settings
                </Menu.Item>
                <Menu.Item component={Link} href={PATH_USER.tabs("appearance")} leftSection={<IconPalette size={16} />}>
                    Appearance
                </Menu.Item>
                <Menu.Item component={Link} href={"/api/auth/logout"} leftSection={<TbLogout size={16} />}>
                    Log out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
