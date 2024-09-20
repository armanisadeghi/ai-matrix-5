import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
    leftSection?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    rightSection?: ReactNode;
    variant?: "primary" | "secondary" | "light" | "subtle" | "danger";
};

export const Button: React.FC<Props> = ({
    children,
    loading = false,
    leftSection,
    rightSection,
    variant = "subtle",
    disabled = false,
    ...others
}) => {
    const baseStyles =
        "px-3 py-1.5 flex items-center gap-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm";

    const variantStyles = {
        primary: "text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-700 focus:ring-blue-500",
        secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500",
        light: "text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500",
        subtle: "text-white border border-transparent bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-200 focus:ring-neutral-500",
        danger: "text-rose-600 border border-transparent hover:bg-rose-700 hover:text-white active:bg-rose-200 focus:ring-rose-500",
    };

    const loadingStyles = "opacity-50 cursor-not-allowed";

    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${loading ? loadingStyles : ""}`;

    const buttonContent = loading ? "loading" : children;

    return (
        <button className={buttonStyles} disabled={disabled} {...others}>
            {leftSection}
            {buttonContent}
            {rightSection}
        </button>
    );
};
