//chatbot interfaces

export enum eRoleType {
    USER = 'user',
    ASSISTANT = 'assistant'
}

export interface iMessage {
    role: eRoleType,
    content: string
}

export interface iChat {
    title: string,
    msgArr: iMessage[]
}
