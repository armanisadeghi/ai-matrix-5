import { Button as MantineButton, ButtonProps as MantineButtonProps } from "@mantine/core";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
    MantineButtonProps & {
        children: React.ReactNode;
    };

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <MantineButton {...props}>{children}</MantineButton>
);
