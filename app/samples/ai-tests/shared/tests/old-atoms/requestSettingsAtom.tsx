
interface QuickChatSettings {
    aiPreferencesMain: string;
    aiPreferencesSecond: string;
    makeSmallTalk: boolean;
    quickAnswer: boolean;
    improveQuestions: boolean;
    submitOnEnter: boolean;
}

interface RequestSettings {
    quickChatSettings: QuickChatSettings;
    // Define other settings interfaces here...
    pageSettings?: any; // Placeholder for other settings interfaces
    userSettings?: any;
    matrixSettings?: any;
    clientSettings?: any;
    agencySettings?: any;
    variablesSettings?: any;
    responseSettings?: any;
    brokerSettings?: any;
    aiModelSettings?: any;
    controlSettings?: any;
}

//@ts-ignore
export const requestSettingsAtom = atom<RequestSettings>({
    quickChatSettings: {
        aiPreferencesMain: 'default',
        aiPreferencesSecond: 'assistant',
        makeSmallTalk: true,
        quickAnswer: false,
        improveQuestions: true,
        submitOnEnter: true,
    },
    // Initialize other settings as empty objects or with appropriate default values if necessary
    pageSettings: {},
    userSettings: {},
    matrixSettings: {},
    clientSettings: {},
    agencySettings: {},
    variablesSettings: {},
    responseSettings: {},
    brokerSettings: {},
    aiModelSettings: {},
    controlSettings: {}
});
