"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ActionIcon, TextInput } from "@/app/dashboard/code-editor-2/components";
import { IconChevronLeft, IconChevronRight, IconExternalLink, IconReload } from "@tabler/icons-react";

import "./styles.css";

interface Props {
    initialUrl: string;
}

export const MiniBrowser = forwardRef<HTMLDivElement, Props>(({ initialUrl, ...props }, ref) => {
    const [url, setUrl] = useState("");
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const iframeRef = useRef(null);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    };

    const handleRefresh = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    const handleBack = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.history.back();
        }
    };

    const handleForward = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.history.forward();
        }
    };

    const openInNewTab = () => {
        window.open(url, "_blank");
    };

    const handleIframeLoad = () => {
        try {
            if (iframeRef.current) {
                setCanGoBack(iframeRef.current.contentWindow.history.length > 1);
                setCanGoForward(false); // Reset forward state on new page load
                setUrl(iframeRef.current.contentWindow.location.href);
            }
        } catch (error) {
            // Handle cross-origin restrictions gracefully
            console.log("Cannot access iframe history due to same-origin policy");
        }
    };

    useEffect(() => {
        setUrl(initialUrl);
    }, [initialUrl]);

    return (
        <div ref={ref} className="flex flex-col border rounded overflow-hidden bg-neutral-900 h-[95%]" {...props}>
            <div className="flex items-center gap-2 p-2 border-b bg-neutral-800">
                <div className="flex items-center gap-1">
                    <ActionIcon variant="subtle" onClick={handleBack} disabled={!canGoBack}>
                        <IconChevronLeft />
                    </ActionIcon>
                    <ActionIcon variant="subtle" onClick={handleForward} disabled={!canGoForward}>
                        <IconChevronRight />
                    </ActionIcon>
                    <ActionIcon variant="subtle" onClick={handleRefresh}>
                        <IconReload />
                    </ActionIcon>
                </div>
                <form onSubmit={handleUrlSubmit} className="flex-1 flex gap-2">
                    <TextInput
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        className="flex-1"
                        placeholder="Enter URL"
                    />
                </form>
                <ActionIcon variant="subtle" onClick={openInNewTab} title="Open in new tab">
                    <IconExternalLink />
                </ActionIcon>
            </div>
            <div className="relative w-full h-full">
                <iframe
                    id="frame"
                    ref={iframeRef}
                    src={url}
                    className="absolute top-0 left-0 w-full h-full border-none bg-neutral-900"
                    onLoad={handleIframeLoad}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                />
            </div>
        </div>
    );
});

MiniBrowser.displayName = "MiniBrowser";
