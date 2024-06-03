import React from "react";
import { Title, TitleProps } from "@mantine/core";

interface AmeTitleProps extends TitleProps {
    as?: "page-header" | "card-header";
}

function AmeTitle({ as, ...others }: AmeTitleProps) {
    return (
        <Title order={as === "page-header" ? 2 : 5} {...others}>
            {others.children}
        </Title>
    );
}

export default AmeTitle;
