// app/samples/chat-sidebar/AmeActionTextInput.tsx

import React, { ChangeEvent, FocusEvent, useRef, useState } from "react";
import { Textarea, TextareaProps } from "@mantine/core";
import useColorUtils from "@/utils/colorUtils";

interface AmeTextareaProps extends TextareaProps {
    initialValue?: string;
    editable?: boolean;
}

const AmeActionTextarea: React.FC<AmeTextareaProps> = ({ initialValue, editable = true, ...others }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { getModerateTextColor } = useColorUtils();

    const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
        event.target.select();
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return (
        <Textarea
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={inputRef}
            variant={"default"}
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

export default AmeActionTextarea;
