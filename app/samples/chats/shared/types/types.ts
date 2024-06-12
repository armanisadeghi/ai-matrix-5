interface User {
    userId: string;
    userToken: string;
}

interface Metadata {
    requestId: string;
    requestIndex: number;
    requestTimestamp: string;
    requestType: string;
    requestSource: string;
    requestChannel: string;
}

interface PromptMessage {
    role: string;
    message: string;
}

interface FormResponse {
    question: string;
    response: string;
}

interface CustomInput {
    inputType: string;
    inputValue: string;
}

interface ChatHistory {
    role: string;
    message: string;
}

interface QuickChatSettings {
    aiPreferencesMain: string;
    aiPreferencesSecond: string;
    makeSmallTalk: boolean;
    quickAnswer: boolean;
    improveQuestions: boolean;
    submitOnEnter: boolean;
}

interface PageSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface UserSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface MatrixSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface ClientSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface AgencySettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface VariablesSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface ResponseSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface BrokerSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface AIModelSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface ControlSettings {
    // INCOMPLETE: TBD... Define fields as necessary
    fields: string;
}

interface RequestSettings {
    quickChatSettings: QuickChatSettings;
    pageSettings: PageSettings;
    userSettings: UserSettings;
    matrixSettings: MatrixSettings;
    clientSettings: ClientSettings;
    agencySettings: AgencySettings;
    variablesSettings: VariablesSettings;
    responseSettings: ResponseSettings;
    brokerSettings: BrokerSettings;
    aiModelSettings: AIModelSettings;
    controlSettings: ControlSettings;
}

const requestSettings: RequestSettings = {
    quickChatSettings: {
        aiPreferencesMain: "default",
        aiPreferencesSecond: "assistant",
        makeSmallTalk: true,
        quickAnswer: false,
        improveQuestions: true,
        submitOnEnter: true
    },
    pageSettings: {
        fields: "removed for brevity"
    },
    userSettings: {
        fields: "removed for brevity"
    },
    matrixSettings: {
        fields: "removed for brevity"
    },
    clientSettings: {
        fields: "removed for brevity"
    },
    agencySettings: {
        fields: "removed for brevity"
    },
    variablesSettings: {
        fields: "removed for brevity"
    },
    responseSettings: {
        fields: "removed for brevity"
    },
    brokerSettings: {
        fields: "removed for brevity"
    },
    aiModelSettings: {
        fields: "removed for brevity"
    },
    controlSettings: {
        fields: "removed for brevity"
    }
};


interface PromptData {
    chatId: string;
    promptMessage: PromptMessage;
    formResponses: FormResponse[];
    customInputs: CustomInput[];
    chatHistory: ChatHistory[];
    requestSettings: RequestSettings;
}

interface EventData {
    event: string;
    eventTask: string;
    user: User;
    metadata: Metadata;
    recipe: Recipe;
    promptData: PromptData;
}

interface Recipe {
    id: string;
    name: string;
    tags: string[];
    description: string;
    permissions: Permission;
    messages: Message[];
    callParams: CallParams;
    postParams: PostParams;
    sampleOutput: string;
}

interface AIModel {
    id: string;
    model: string;
    name: string;
    class: string;
    type: string;
    api: API;
    limitations: Limitations;
    controls: Control[];
}




/*
const eventData: EventData = {
    event: "matrix_chat",
    task: "simple_chat",
    user: {
        userId: "user123",
        userToken: "auth0_token_example"
    },
    metadata: {
        requestId: "request123",
        requestIndex: 1,
        requestTimestamp: "2024-05-25T12:00:00Z",
        requestType: "aiChat",
        requestSource: "simpleChat",
        requestChannel: "text"
    },
    recipe: {
        id: "",
        name: "",
        tags: [],
        description: "",
        permissions: {'sample': "data"},
        messages: [],
        "callParams": {},
        "postParams": {},
        sampleOutput: ""
    },
    promptData: {
        chatId: "chat123",
        promptMessage: {
            role: "user",
            message: "Can you help me with travel tips?"
        },
        formResponses: [
            {
                question: "What type of travel plans are you looking for?",
                response: "Information on things to do"
            }
        ],
        customInputs: [
            {
                inputType: "text",
                inputValue: "Sample input"
            }
        ],
        chatHistory: [
            {
                role: "assistant",
                message: "Sure, I can help you with that. What do you need help with?"
            },
            {
                role: "user",
                message: "I'm taking my kids to New York. What are some fun things to do there?"
            }
        ],
        requestSettings: {
            quickChatSettings: {
                aiPreferencesMain: "default",
                aiPreferencesSecond: "assistant",
                makeSmallTalk: true,
                quickAnswer: false,
                improveQuestions: true,
                submitOnEnter: true
            },
            // Add additional settings as necessary
        }
    }
};

// Now you can use eventData in your React TypeScript application as needed
*/