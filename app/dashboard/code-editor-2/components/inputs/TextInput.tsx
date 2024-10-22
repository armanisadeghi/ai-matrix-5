import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

type TextInputProps = HTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    className?: string;
    icon?: ReactNode;
    size?: "xs" | "sm" | "md" | "lg";
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        { label, type = "text", placeholder = "", value = "", onChange, className = "", icon, size = "md", ...props },
        ref,
    ) => {
        const baseClass =
            "border border-neutral-600 bg-neutral-800 rounded-md placeholder:text-sm ease-in-out focus:ring-2 focus:ring-neutral-400 focus:border-neutral-300 outline-none transition duration-150";

        // Define size-specific classes
        const sizeClass = {
            xs: "px-1 py-0.5 text-xs", // Extra small size: smaller padding and text size
            sm: "px-2 py-1 text-sm", // Small size: smaller padding and text size
            md: "px-3 py-1.5 text-base", // Medium size: default padding and text size
            lg: "px-4 py-2 text-lg", // Large size: larger padding and text size
        };

        const inputClass = `${baseClass} ${sizeClass[size]} ${className}`;

        return (
            <div className={`flex flex-col ${className}`}>
                {label && <label className="mb-2 block text-sm font-normal leading-6">{label}</label>}
                <div className="flex">
                    {/* Render icon if provided */}
                    {icon && <span className="mr-2">{icon}</span>}
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={`${inputClass}`}
                        {...props}
                    />
                </div>
            </div>
        );
    },
);

TextInput.displayName = "TextInput";
