import { ActionIcon } from "@mantine/core";
import { FaMicrophone } from "react-icons/fa";
import { atom, useRecoilState } from "recoil";

export const audioStateAtom = atom({
    key: "microAudioState",
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
            variant="transparent"
            size="sm"
            radius="xl"
            color={audioState ? "blue" : "#909090"}
        >
            <FaMicrophone />
        </ActionIcon>
    );
};

export default MicrophoneButton;
