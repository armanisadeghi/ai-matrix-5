// use this for back and forward navigation

import { useRouter } from "next/navigation";
import AmeActionIcon from "@/ui/button/AmeActionIcon";
import AmeButton from "@/ui/button/AmeButton";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ActionIconProps, ButtonProps } from "@mantine/core";

interface AmeNavButtonProps {
    navigateTo: "back" | "next";
    asIcon?: boolean; // prefer icon button or full button
}

function AmeNavButton({ navigateTo, asIcon }: AmeNavButtonProps) {
    const router = useRouter();

    const handleNavigate = () => {
        if (navigateTo === "back") {
            router.back();
        } else {
            router.forward();
        }
    };

    const canNavigate = () => {
        // todo: will look for alternatives instead of using experimental navigation api
        let canNav = true;
        if (navigateTo == "back") {
            // @ts-ignore
            canNav = navigation.canGoBack;
        } else {
            // @ts-ignore
            canNav = navigation.canGoForward;
        }

        return canNav;
    };

    const text = navigateTo === "back" ? "Go back" : "Go forward";
    const icon = navigateTo === "back" ? <IconChevronLeft /> : <IconChevronRight />;

    let buttonProps: ButtonProps = {
        disabled: !canNavigate(),
    };

    let actionIconProps: ActionIconProps = {
        disabled: !canNavigate(),
    };

    if (navigateTo == "back") {
        buttonProps.leftSection = icon;
    } else {
        buttonProps.rightSection = icon;
    }

    return asIcon ? (
        <AmeActionIcon title={text} onClick={handleNavigate} {...actionIconProps}>
            {icon}
        </AmeActionIcon>
    ) : (
        <AmeButton title={text} onClick={handleNavigate} {...buttonProps}>
            {text}
        </AmeButton>
    );
}

export default AmeNavButton;
