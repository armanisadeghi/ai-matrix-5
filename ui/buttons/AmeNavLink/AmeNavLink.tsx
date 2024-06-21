import { NavLink, NavLinkProps } from "@mantine/core";
import { ReactNode } from "react";

import classes from "./AmeNavLink.module.css";

type AmeNavLinkProps = {
    component?: any;
    children?: ReactNode;
    variant?: NavLinkProps["variant"];
    href?: string;
} & Partial<NavLinkProps>;

export function AmeNavLink({ children, component, href, variant = "light", ...others }: AmeNavLinkProps) {
    return (
        <NavLink
            variant={variant}
            label={others.label}
            className={classes.link}
            component={component}
            href={href}
            {...others}
        >
            {children}
        </NavLink>
    );
}
