// chat-app/utils/chatDefaults.ts
import { BrokerData } from "@/types/broker";
import { ChatSettings, RequestSettings, VariablesData } from "types/settings.types";

export interface ChatRequest {
    eventName: string;
    userToken: string;
    task: string;
    requestMetadata: string;
    recipeId: string;
    promptData: PromptData[];
    formResponses: FormResponse[];
    customInputs: CustomInput[];
    settings: RequestSettings;
    variablesData: VariablesData;
    responseData: string;
    brokerData: BrokerData;
    modelData: AIModelSettings;
    controls: ControlSettings;
    activeChatId: string | null;
}

export const aiPreferencesMainDefault = "direct_chat";
export const aiPreferencesSecondDefault = "one_ai_chat";
export const makeSmallTalkDefault = false;
export const quickAnswerDefault = false;
export const improveQuestionsDefault = false;
export const submitOnEnterDefault = true;

export const defaultChatSettings: ChatSettings = {
    aiPreferencesMain: aiPreferencesMainDefault,
    aiPreferencesSecond: aiPreferencesSecondDefault,
    makeSmallTalk: makeSmallTalkDefault,
    quickAnswer: quickAnswerDefault,
    improveQuestions: improveQuestionsDefault,
    submitOnEnter: submitOnEnterDefault,
};

export const defaultRequestSettings: RequestSettings = {
    chatSettings: defaultChatSettings,
    variablesData: {},
    responseData: {},
    brokerData: {},
    aiModelSettings: {},
    controlSettings: {},
    pageSettings: {},
    userSettings: {},
    matrixSettings: {},
    clientSettings: {},
    agencySettings: {},
};

export const defaultChatRequest: ChatRequest | any = {
    eventName: "",
    userToken: "",
    task: "",
    requestMetadata: {
        requestId: "",
        requestIndex: 1,
        uid: "",
        requestTimestamp: "",
        requestType: "chat",
        requestSource: "chat_app_main",
        requestChannel: "chat",
    },
    recipeId: "",
    promptData: [],
    formResponses: [],
    customInputs: [],
    settings: defaultRequestSettings,
    variablesData: {},
    responseData: {},
    brokerData: {},
    modelData: {},
    controls: {},
    activeChatId: null,
};
