import React, { HTMLAttributes, ReactNode } from "react";

type TextInputProps = HTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    icon?: ReactNode;
};

export const TextInput: React.FC<TextInputProps> = ({
    label,
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    className = "",
    icon,
}) => {
    const baseClass =
        "px-2 py-1 border border-transparent bg-neutral-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-700 outline-none transition duration-150 ease-in-out placeholder:text-sm";
    const inputClass = `${baseClass} ${className}`;

    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">{label}</label>}
            <div className="flex">
                {icon}
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
