function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_MATRIX = ROOTS_DASHBOARD + "/matrix-apps";
const ROOTS_INTELLIGENCE = ROOTS_DASHBOARD + "/intelligence";
const ROOTS_AGENCY = ROOTS_DASHBOARD + "/agency";
const ROOTS_ADMIN = ROOTS_DASHBOARD + "/admin";
const ROOTS_ACCOUNT = ROOTS_DASHBOARD + "/user";

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
};

export const PATH_MATRIX = {
    root: ROOTS_MATRIX,
    build: path(ROOTS_MATRIX, "/build"),
};

export const PATH_INTELLIGENCE = {
    root: ROOTS_INTELLIGENCE,
    aiChat: path(ROOTS_INTELLIGENCE, "/ai-chats"),
    bots: path(ROOTS_INTELLIGENCE, "/bots"),
    botBuilder: path(ROOTS_INTELLIGENCE, "/bot-builder"),
    chatbot: path(ROOTS_INTELLIGENCE, "/chatbot"),
};

export const PATH_AGENCY = {
    root: ROOTS_AGENCY,
    clients: {
        root: path(ROOTS_AGENCY, "/clients"),
        add: path(ROOTS_AGENCY, "/clients/add"),
        view: (id: string | number) => path(ROOTS_AGENCY, `/clients/view/${id}`),
    },
};

export const PATH_ADMIN = {
    root: ROOTS_ADMIN,
    clients: {
        root: path(ROOTS_ADMIN, "/clients"),
        add: path(ROOTS_ADMIN, "/clients/add"),
        view: (id: string | number) => path(ROOTS_ADMIN, `/clients/view/${id}`),
    },
};
export const PATH_USER = {
    root: ROOTS_ACCOUNT,
    settings: ROOTS_ACCOUNT + "/settings",
    tabs: (tab: string) => path(ROOTS_ACCOUNT, `/settings/${tab}`),
};
