import { Group, GroupProps, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { ReactElement } from "react";

interface LogoProps extends Partial<GroupProps> {}

export function Logo({ ...others }: LogoProps): ReactElement {
    return (
        <Group gap="xs" component={UnstyledButton} {...others}>
            <Image src="/logo-circle.png" alt="ai matrix logo" height={24} width={24} />
            <Text fw={600} fz="lg">
                AI Matrix
            </Text>
        </Group>
    );
}
