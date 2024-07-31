"use client";

import { atom, useRecoilState } from "recoil";
import { FaMicrophone } from "react-icons/fa";
import { ActionIcon } from "@mantine/core";

export const audioStateAtom = atom({
    key: "audioState",
    default: false,
});

const MicrophoneButton = () => {
    const [audioState, setAudioState] = useRecoilState(audioStateAtom);

    const handleClick = () => {
        setAudioState(!audioState);
    };

    return (
        <ActionIcon
            onClick={(e) => {
                e.stopPropagation();
                handleClick();
            }}
            variant="outline"
            size="sm"
            radius="xl"
            color={audioState ? "blue" : undefined}
            aria-label="Toggle Microphone"
            style={{ transition: "box-shadow 0.3s", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)")}
        >
            <FaMicrophone style={{ width: "60%", height: "60%" }} />
        </ActionIcon>
    );
};

export default MicrophoneButton;
