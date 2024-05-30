import React, { useEffect, useRef } from 'react';
import { Box, Grid } from '@mantine/core';
import HistoryEntries from "@/app/dashboard/intelligence/ai-chatbot/components/response/HistoryEntries";

const ResponseArea = ({ bottomPadding }: { bottomPadding: number }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            const observer = new MutationObserver(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            });
            observer.observe(scrollRef.current, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <Box style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
            <Box ref={scrollRef} style={{ position: 'absolute', top: 0, left: 0, right: -25, bottom: -20, overflow: 'scroll' }}>
                <Grid>
                    <Grid.Col span={.5}></Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{ paddingBottom: bottomPadding }}>
                            <HistoryEntries chatId="1002" />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={.5}></Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
};

export default ResponseArea;
