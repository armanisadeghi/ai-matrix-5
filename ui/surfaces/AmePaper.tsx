import { Paper, PaperProps } from "@mantine/core";
import { ComponentProps, ReactNode } from "react";

interface AmePaperProps extends PaperProps {
    children: ReactNode;
    component?: ComponentProps<any>;
}

function AmePaper({ children, ...others }: AmePaperProps) {
    return <Paper {...others}>{children}</Paper>;
}

export default AmePaper;
