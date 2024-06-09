import { Text, TextProps } from "@mantine/core";
import { ReactNode } from "react";

interface AmeTextProps extends TextProps {
    children: ReactNode;
}

function AmeText({ children, ...others }: AmeTextProps) {
    return <Text {...others}>{children}</Text>;
}

export default AmeText;
