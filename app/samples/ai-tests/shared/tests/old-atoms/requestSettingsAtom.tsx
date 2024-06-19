import { atom } from 'recoil'

interface QuickChatSettings {
    aiPreferencesMain: string
    aiPreferencesSecond: string
    makeSmallTalk: boolean
    quickAnswer: boolean
    improveQuestions: boolean
    submitOnEnter: boolean
}

interface RequestSettings {
    quickChatSettings: QuickChatSettings
    // Define other settings interfaces here...
    pageSettings?: {}
    userSettings?: {}
    matrixSettings?: {}
    clientSettings?: {}
    agencySettings?: {}
    variablesSettings?: {}
    responseSettings?: {}
    brokerSettings?: {}
    aiModelSettings?: {}
    controlSettings?: {}
}

export const requestSettingsAtom = atom<RequestSettings>({
    key: 'requestSettings',
    default: {
        quickChatSettings: {
            aiPreferencesMain: 'default',
            aiPreferencesSecond: 'assistant',
            makeSmallTalk: true,
            quickAnswer: false,
            improveQuestions: true,
            submitOnEnter: true
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
    }
})
