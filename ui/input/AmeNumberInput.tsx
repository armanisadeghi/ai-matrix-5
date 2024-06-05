// app/samples/chat-sidebar/AmeActionTextInput.tsx

import React, { FocusEvent, useRef, useState } from "react";
import { NumberInput, NumberInputProps } from "@mantine/core";
import useColorUtils from "@/utils/colorUtils";

interface AmeNumberInputProps extends NumberInputProps {
    initialValue?: string | number;
    editable?: boolean;
}

const AmeActionNumberInput: React.FC<AmeNumberInputProps> = ({ initialValue, editable = true, ...others }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const { getModerateTextColor } = useColorUtils();

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const handleChange = (value: string | number) => {
        setValue(value);
    };

    return (
        <NumberInput
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={inputRef}
            variant="default"
            size="sm"
            readOnly={!editable}
            placeholder="Enter text here..."
            styles={{
                input: {
                    cursor: "pointer",
                    color: getModerateTextColor(),
                },
            }}
            {...others}
        />
    );
};

export default AmeActionNumberInput;
