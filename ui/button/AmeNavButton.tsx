/*
// use this for back and forward navigation
// Commented out for now so we don't get errors during build process
// Also, I'm not sure this is a all that valuable.


import { useRouter } from "next/navigation";
import AmeActionIcon from "@/ui/button/AmeActionIcon";
import AmeButton from "@/ui/button/AmeButton";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ActionIconProps, ButtonProps } from "@mantine/core";

interface AmeNavButtonProps {
    navigateTo: "back" | "next";
    asIcon?: boolean;
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

            canNav = navigation.canGoBack;
        } else {

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
        <AmeActionIcon tooltip={text} onClick={handleNavigate} {...actionIconProps}>
            {icon}
        </AmeActionIcon>
    ) : (
        <AmeButton title={text} onClick={handleNavigate} {...buttonProps}>
            {text}
        </AmeButton>
    );
}

export default AmeNavButton;
*/
