import React, { useRef, useState } from "react";
import { rem, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface AmeSearchInputProps extends Partial<TextInputProps> {}

const SearchIcon = (): JSX.Element => {
    return <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
};

const AmeSearchInput: React.FC<AmeSearchInputProps> = ({ w, ...others }: AmeSearchInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState<string>("");

    const handleFocus = () => {
        inputRef.current?.select();
    };

    return (
        <TextInput
            ref={inputRef}
            placeholder={"search"}
            size="sm"
            leftSection={<SearchIcon />}
            w={w}
            value={displayValue}
            onFocus={handleFocus}
            styles={{ section: { pointerEvents: "none" } }}
            aria-label={others.placeholder}
            {...others}
        />
    );
};

export default AmeSearchInput;
