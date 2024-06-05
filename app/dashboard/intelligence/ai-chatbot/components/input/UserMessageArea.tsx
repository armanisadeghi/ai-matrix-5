// chatbot/components/UserMessageArea.tsx
import React, { forwardRef, useState } from 'react';
import { ActionIcon, Grid, rem, Slider, Space, Textarea, Text } from '@mantine/core';
import { isStreamingAtom, submitOnEnterAtom } from '@/org/atoms/ChatAtoms';
import { useAtom } from 'jotai';
import { CgAttachment } from "react-icons/cg";
import { RiSettings3Line } from "react-icons/ri";
import { SlArrowUpCircle } from "react-icons/sl";
import { LuPauseOctagon } from "react-icons/lu";
import { IoReturnDownBackOutline, IoPlayForwardCircleOutline } from "react-icons/io5";

type UserMessageAreaProps = {
    userInput: string,
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSendMessage: () => void
};

const UserMessageArea = forwardRef<HTMLDivElement, UserMessageAreaProps>(
    ({
         userInput,
         handleInputChange,
         handleSendMessage
     }, ref) => {
        const [submitOnEnter, setSubmitOnEnter] = useAtom(submitOnEnterAtom);
        const [isStreaming, setIsStreaming] = useAtom(isStreamingAtom);
        const [file, setFile] = useState<File | null>(null);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
            }
        };

        return (
            <div ref={ref} style={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
                <div style={{ height: '2px' }}></div>

                <div style={{ position: 'absolute', top: 15, right: 10, zIndex: 10 }}>
                    <ActionIcon
                        size={22}
                        variant="subtle"
                        onClick={handleSendMessage}
                    >
                        <SlArrowUpCircle style={{ width: rem(24), height: rem(24) }} />
                    </ActionIcon>
                    <Space />
                    <ActionIcon
                        size={20}
                        variant="subtle"
                        component="label"
                    >
                        <CgAttachment style={{ width: rem(18), height: rem(18) }} />
                        <input type="file" hidden onChange={handleFileChange} />
                    </ActionIcon>
                    <Space />
                    {file && (
                        <Text size="sm" ta="center" mt="sm">
                            Picked file: {file.name}
                        </Text>
                    )}
                    <ActionIcon
                        size={20}
                        variant="subtle"
                        onClick={() => setSubmitOnEnter(!submitOnEnter)}
                    >
                        <IoReturnDownBackOutline style={{ width: rem(24), height: rem(24), opacity: submitOnEnter ? 1 : 0.5 }} />
                    </ActionIcon>
                </div>
                {isStreaming && (
                    <div style={{ position: 'absolute', top: 33, right: 10, zIndex: 10 }}>
                        <ActionIcon
                            size={40}
                            variant="subtle"
                            onClick={() => {
                                console.log(isStreaming ? 'Pause' : 'Play');
                                setIsStreaming(!isStreaming);
                            }}
                        >
                            {isStreaming ? (
                                <LuPauseOctagon style={{ width: rem(30), height: rem(30) }} />
                            ) : (
                                <IoPlayForwardCircleOutline style={{ width: rem(30), height: rem(30) }} />
                            )}
                        </ActionIcon>
                    </div>
                )}
                <Textarea
                    placeholder="Type your message..."
                    style={{ width: '100%' }}
                    autosize
                    minRows={4}
                    maxRows={15}
                    resize="vertical"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && submitOnEnter) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <div style={{ height: '10px', marginTop: '7px', alignItems: 'center' }}>
                    <Grid>
                        <Grid.Col span={1}></Grid.Col>
                        <Grid.Col span={10}>
                            <Slider
                                color="gray"
                                size="xs"
                                min={0}
                                max={10}
                                marks={[
                                    { value: 0, label: 'Matrix AI' },
                                    { value: 2, label: 'GPT-4o' },
                                    { value: 4, label: 'Conductor' },
                                    { value: 6, label: 'Lattice' },
                                    { value: 8, label: 'Cluster' },
                                    { value: 10, label: 'Hypercluster' },
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col span={1}></Grid.Col>
                    </Grid>
                </div>
                <div style={{ height: '10px' }}></div>
            </div>
        );
    }
);

UserMessageArea.displayName = 'UserMessageArea';

export default UserMessageArea;



/*
        <div ref={ref} style={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
            <div style={{ height: '2px' }}></div>
            <Textarea
                placeholder="Type your message..."
                style={{ width: '100%' }}
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <div style={{ height: '10px' }}></div>
        </div>

                    <ActionIcon
                        size={20}
                        variant="subtle">
                        <RiSettings3Line style={{
                            width: rem(24),
                            height: rem(24)
                        }}/>
                    </ActionIcon>


 */