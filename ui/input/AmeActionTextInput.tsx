// app/samples/chat-sidebar/AmeActionTextInput.tsx

import React, { useState, useRef, FocusEvent, ChangeEvent } from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import useColorUtils from "@/utils/colorUtils";

interface AmeActionTextInputProps extends TextInputProps {
    initialValue: string;
    editable?: boolean;
}

const AmeActionTextInput: React.FC<AmeActionTextInputProps> = ({ initialValue, editable = true, ...others }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const { getModerateTextColor } = useColorUtils();

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextInput
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={inputRef}
            variant="unstyled"
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

export default AmeActionTextInput;
