// use this for back and forward navigation

import { useRouter } from "next/navigation";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import AmeButton from "@/ui/buttons/AmeButton";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ActionIconProps, ButtonProps } from "@mantine/core";

interface AmeNavButtonProps {
    navigateTo: "back" | "next";
    asIcon?: boolean; // prefer icon buttons or full buttons
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
        let canNav = true;
        if (typeof window !== "undefined") {
            // todo: will look for alternatives instead of using experimental navigation api supported in chrome and edge
            // @ts-ignore
            let isChromium = window.chrome;

            if (isChromium) {
                // @ts-ignore
                if (typeof navigation !== undefined) {
                    if (navigateTo == "back") {
                        // @ts-ignore
                        canNav = navigation.canGoBack;
                    } else {
                        // @ts-ignore
                        canNav = navigation.canGoForward;
                    }
                }
            }
        }

        return canNav;
    };

    const text = navigateTo === "back" ? "Go back" : "Go forward";
    const icon = navigateTo === "back" ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />;

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
