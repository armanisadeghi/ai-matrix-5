import { NavLink, NavLinkProps } from "@mantine/core";
import { ReactNode } from "react";

type AmeNavLinkProps = {
    children?: ReactNode;
    variant?: NavLinkProps["variant"];
} & Partial<NavLinkProps>;

export function AmeNavLink({ children, variant = "light", ...others }: AmeNavLinkProps) {
    return (
        <NavLink variant={variant} label={others.label} {...others}>
            {children}
        </NavLink>
    );
}
