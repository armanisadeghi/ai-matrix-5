import { Burger, Group, MantineSize } from "@mantine/core";
import { IconBell, IconMenu, IconSearch } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import { useHeader } from "@/context/HeaderContext";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useNavbar } from "@/context/NavbarContext";
import { useSidebar } from "@/context/SidebarContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRecoilState } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { useEffect } from "react";
import { UserMenu } from "@/components/User/UserMenu";

type Props = {
    state: "large" | "medium" | "compact";
    tabletMatch?: boolean;
};

export function Header({ tabletMatch }: Props) {
    const { user, error, isLoading } = useUser();
    const { toggleOpened, opened, toggleNavbar, navbarState } = useNavbar();
    const { toggleAside, asideState } = useSidebar();
    const { headerState } = useHeader();
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);

    useEffect(() => {
        if (user && !activeUser) {
            setActiveUser(user);
        }
    }, [user, activeUser, setActiveUser]);

    const componentSize: MantineSize = headerState === "large" ? "md" : "sm";

    const handleNavToggle = () => {
        if (navbarState === "full") {
            toggleNavbar("compact");
        } else {
            toggleNavbar("full");
        }
    };

    return (
        <Group h="100%" px="md" align="center" justify="space-between" style={{ flexWrap: "nowrap" }}>
            <Group>
                <Burger opened={opened} onClick={toggleOpened} hiddenFrom="sm" size="sm" />
                <Burger opened={navbarState === "full"} onClick={handleNavToggle} visibleFrom="sm" size="sm" />
                <Logo />
            </Group>
            <Group visibleFrom="md" style={{ flexGrow: 1, justifyContent: "center" }}>
                <AmeSearchInput
                    size={componentSize}
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: "1 1 auto", minWidth: "60px", maxWidth: tabletMatch ? "350px" : "500px" }}
                    visibleFrom="sm"
                />
            </Group>
            <Group>
                <AmeActionIcon hiddenFrom="md" size={componentSize} tooltip="search">
                    <IconSearch size={18} />
                </AmeActionIcon>
                <ColorSchemeToggle size={componentSize} />
                <AmeActionIcon tooltip="notifications" size={componentSize}>
                    <IconBell size={18} />
                </AmeActionIcon>
                <AmeActionIcon
                    tooltip="toggle sidebar"
                    size={componentSize}
                    onClick={() => {
                        if (asideState === "hidden") toggleAside("full");
                        else toggleAside("hidden");
                    }}
                >
                    <IconMenu size={18} />
                </AmeActionIcon>
                <UserMenu componentSize={componentSize} />
            </Group>
        </Group>
    );
}
