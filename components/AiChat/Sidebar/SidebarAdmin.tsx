import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import styles from "./SidebarAdmin.module.css";

import {
    activeChatIdAtom,
    chatTransitionAtom,
    isNewChatAtom,
    streamStatusAtom,
    submitChatIdAtom,
} from "@/state/aiAtoms/aiChatAtoms";
import AmeButton from "@/ui/buttons/AmeButton";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";

interface SidebarAdminProps {
    chatSelectCount: number;
    newChatCount: number;
}

const atomList = [
    "isNewChat",
    "chatTransition",
    "chatSelectCount",
    "newChatCount",
    "activeChatId",
    "submitChatId",
    "streamStatus",
];

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ chatSelectCount, newChatCount }) => {
    const atomValues = {
        isNewChat: useRecoilValue(isNewChatAtom),
        chatTransition: useRecoilValue(chatTransitionAtom),
        chatSelectCount,
        newChatCount,
        activeChatId: useRecoilValue(activeChatIdAtom),
        submitChatId: useRecoilValue(submitChatIdAtom),
        streamStatus: useRecoilValue(streamStatusAtom),
    };

    const [keys, setKeys] = useState<Record<string, string>>(
        atomList.reduce(
            (acc, atom) => {
                acc[atom] = v4();
                return acc;
            },
            {} as Record<string, string>,
        ),
    );

    useEffect(() => {
        const newKeys = Object.assign({}, keys);
        atomList.forEach((atom) => {
            newKeys[atom] = v4();
        });
        setKeys(newKeys);
    }, Object.values(atomValues));

    const formatAtomName = (name: string) => {
        return name
            .split(/(?=[A-Z])/)
            .join(" ")
            .replace(/^\w/, (c) => c.toUpperCase());
    };

    const openAdminModal = () => {
        console.log("Open Admin Modal");
    };

    return (
        <AmePaper withBorder p="sm">
            <AmeTitle order={6} mb="sm">
                Sidebar Admin
            </AmeTitle>
            <Stack gap="xs">
                {atomList.map((atom) => (
                    <div className={`${styles.gridItem} ${styles.highlightAnimation}`} key={keys[atom]}>
                        <AmeText size="sm">{formatAtomName(atom)}:</AmeText>
                        <AmeText size="sm">
                            {atomValues[atom as keyof typeof atomValues]?.toString() || "No Value"}
                        </AmeText>
                    </div>
                ))}
            </Stack>
            <AmeButton title="admin modal" onClick={openAdminModal} fullWidth>
                Admin modal
            </AmeButton>
        </AmePaper>
    );
};

export default SidebarAdmin;
