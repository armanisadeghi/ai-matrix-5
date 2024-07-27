import React from 'react';
import { useRecoilState } from 'recoil';
import { autoscrollStateAtom } from '@/state/layoutAtoms';
import { ActionIcon, Button } from '@mantine/core';
import { HiDownload } from 'react-icons/hi';


const FloatingActionIcon: React.FC = () => {
        const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom);

        const handleClick = () => {
            setIsAutoscroll(true);
        };

        if (isAutoscroll) {
            return null;
        }

        return (
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <ActionIcon
                    variant="transparent"
                    color="violet"
                    size="xl"
                    style={{zIndex: 1000}}
                >
                    <HiDownload/>
                </ActionIcon>
            </div>

        );
    }
;

export default FloatingActionIcon;
