import React, { HTMLAttributes, ReactNode } from "react";

type TextInputProps = HTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    icon?: ReactNode;
    size?: "sm" | "md" | "lg";
};

export const TextInput: React.FC<TextInputProps> = ({
    label,
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    className = "",
    icon,
    size = "md",
}) => {
    const baseClass =
        "border border-transparent bg-neutral-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-700 outline-none transition duration-150 ease-in-out placeholder:text-sm";

    // Define size-specific classes
    const sizeClass = {
        sm: "px-2 py-1 text-sm", // Small size: smaller padding and text size
        md: "px-3 py-1.5 text-base", // Medium size: default padding and text size
        lg: "px-4 py-2 text-lg", // Large size: larger padding and text size
    };

    const inputClass = `${baseClass} ${sizeClass[size]} ${className}`;

    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">{label}</label>}
            <div className="flex">
                {/* Render icon if provided */}
                {icon && <span className="mr-2">{icon}</span>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`${inputClass}`}
                />
            </div>
        </div>
    );
};
