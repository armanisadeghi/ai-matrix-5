import { MantineSize, ThemeIcon, ThemeIconProps } from "@mantine/core";
import { ReactNode } from "react";

type AmeIconWrapperProps = {
    children: ReactNode;
    size?: MantineSize;
    variant?: ThemeIconProps["variant"];
} & Partial<ThemeIconProps>;

export function AmeIconWrapper({ children, size = "sm", variant = "transparent", ...others }: AmeIconWrapperProps) {
    return (
        <ThemeIcon size={size} variant={variant} {...others}>
            {children}
        </ThemeIcon>
    );
}
