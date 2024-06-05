import { Group, GroupProps, Text, UnstyledButton, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { ReactElement } from "react";

interface LogoProps extends Partial<GroupProps> {}

export function Logo({ ...others }: LogoProps): ReactElement {
    const { colorScheme } = useMantineColorScheme();

    return (
        <Group gap="xs" component={UnstyledButton} {...others}>
            <Image
                src={colorScheme === "dark" ? "/logo-dark.svg" : "/logo-white.svg"}
                alt="ai matrix logo"
                height={24}
                width={24}
                style={{ borderRadius: "6px" }}
            />
            <Text fw={600} fz="lg">
                AI Matrix
            </Text>
        </Group>
    );
}
