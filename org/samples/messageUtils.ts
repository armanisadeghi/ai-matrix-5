// utils/messageUtils.ts
import { v4 as uuidv4 } from 'uuid';
import { UserEntry, SystemEntry, AssistantEntry, MessageIDType, TimestampType, RoleType } from '../types/chatData';


// I assume this will be replaced with atoms, but it's good to see it here.

export function createMessageEntry(text: string, role: RoleType): UserEntry | SystemEntry | AssistantEntry {
    return {
        id: uuidv4() as MessageIDType,
        timestamp: Date.now() as TimestampType,
        text,
        role,
    };
}

export default createMessageEntry;
