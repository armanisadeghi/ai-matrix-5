import React from "react";
import { FileButton } from "@mantine/core";
import AmeOverComponentIcon from "@/ui/buttons/AmeOverComponentIcon";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { MdPermMedia } from "react-icons/md";
import useFileUpload from "@/hooks/ui/useFileUpload";

const AmeFileUploadOverComponent = () => {
    const handleFileUpload = useFileUpload();

    return (
        <FileButton onChange={handleFileUpload} accept="*/*">
            {(props) => (
                <AmeOverComponentIcon tooltip="Upload file..." {...props} style={{ outline: "none" }}>
                    <MdPermMedia />
                </AmeOverComponentIcon>
            )}
        </FileButton>
    );
};

const AmeFileUploadActionIcon = () => {
    const handleFileUpload = useFileUpload();

    return (
        <FileButton onChange={handleFileUpload} accept="*/*">
            {(props) => (
                <AmeActionIcon tooltip="Upload file..." {...props} style={{ outline: "none" }}>
                    <MdPermMedia />
                </AmeActionIcon>
            )}
        </FileButton>
    );
};

export { AmeFileUploadOverComponent, AmeFileUploadActionIcon };
