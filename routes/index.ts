function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_MATRIX = ROOTS_DASHBOARD + '/matrix-apps';
const ROOTS_INTELLIGENCE = ROOTS_DASHBOARD + '/intelligence';

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
};

export const PATH_MATRIX = {
    root: ROOTS_MATRIX,
    build: path(ROOTS_MATRIX, '/build'),
}

export const PATH_INTELLIGENCE = {
    root: ROOTS_INTELLIGENCE,
    aiChat: path(ROOTS_INTELLIGENCE, '/ai-chats'),
    bots: path(ROOTS_INTELLIGENCE, '/bots'),
    botBuilder: path(ROOTS_INTELLIGENCE, '/bot-builder'),
    chatbot: path(ROOTS_INTELLIGENCE, '/chatbot'),
}

