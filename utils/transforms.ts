// utils/transforms.ts

import { Chat } from '../types/chat';

// Chat transformations
const chatsDbToFrontend = (dbRecord: any): Chat => ({
    chatId: dbRecord.chat_id,
    createdAt: dbRecord.created_at,
    userId: dbRecord.user_id,
    chatTitle: dbRecord.chat_title,
    messagesArray: dbRecord.messages_array,
    lastEdited: dbRecord.last_edited,
    metadata: dbRecord.metadata,
});

const chatFrontendToDb = (frontendRecord: Chat): any => ({
    chat_id: frontendRecord.chatId,
    created_at: frontendRecord.createdAt,
    user_id: frontendRecord.userId,
    chat_title: frontendRecord.chatTitle,
    messages_array: frontendRecord.messagesArray,
    last_edited: frontendRecord.lastEdited,
    metadata: frontendRecord.metadata,
});

// User transformations
const userDbToFrontend = (dbRecord: any) => ({
    userId: dbRecord.id,
    // Add other fields if needed
});

const userFrontendToDb = (frontendRecord: any) => ({
    id: frontendRecord.userId,
    // Add other fields if needed
});

const transformMap: { [key: string]: { toFrontend: Function; toBackend: Function } } = {
    chats: {
        toFrontend: chatsDbToFrontend,
        toBackend: chatFrontendToDb,
    },
    user: {
        toFrontend: userDbToFrontend,
        toBackend: userFrontendToDb,
    },
    // Add other table transformations here
};

const transformData = (table: string, transformTo: 'toFrontend' | 'toBackend', record: any) => {
    console.log(`Transforming data for table: ${table}, direction: ${transformTo}, record: ${JSON.stringify(record)}`);
    const transformer = transformMap[table]?.[transformTo];
    if (transformer) {
        const transformedRecord = transformer(record);
        console.log(`Transformed record: ${JSON.stringify(transformedRecord)}`);
        return transformedRecord;
    }
    console.log(`No transformation found for table: ${table}. Returning original record.`);
    return record;
};

export { transformData };
