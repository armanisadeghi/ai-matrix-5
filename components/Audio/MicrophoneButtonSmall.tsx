import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { FaMicrophone } from 'react-icons/fa';
import { ActionIcon } from '@mantine/core';

export const audioStateAtom = atom({
    key: 'audioState',
    default: false,
});

const MicrophoneButton = () => {
    const [audioState, setAudioState] = useRecoilState(audioStateAtom);

    const handleClick = () => {
        setAudioState(!audioState);
    };

    return (
        <ActionIcon
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            variant="transparent"
            size="sm"
            radius="xl"
            color={audioState ? 'blue' : '#909090'}
        >
            <FaMicrophone />
        </ActionIcon>
    );
};

export default MicrophoneButton;
