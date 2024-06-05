// /types/settings.ts
import { AI_PREFERENCES_MAIN, AI_PREFERENCES_SECOND } from '../config/aiRequestOptions';


// QuickChatSettings
export type AiPreferencesMainType = typeof AI_PREFERENCES_MAIN[number];
export type AiPreferencesSecondType = typeof AI_PREFERENCES_SECOND[number];
export type MakeSmallTalkType = boolean; // DEFAULT: false
export type QuickAnswerType = boolean; // DEFAULT: true
export type ImproveQuestionsType = boolean; // DEFAULT: false
export type SubmitOnEnterType = boolean; // DEFAULT: true

export interface QuickChatSettings {
    aiPreferencesMain: AiPreferencesMainType;
    aiPreferencesSecond: AiPreferencesSecondType;
    makeSmallTalk: MakeSmallTalkType;
    quickAnswer: QuickAnswerType;
    improveQuestions: ImproveQuestionsType;
    submitOnEnter: SubmitOnEnterType;
}

// api
export type ProviderType = string; // API provider
export type EndpointType = string; // API endpoint

export interface API {
    provider: ProviderType;
    endpoint: EndpointType;
}

// limitations
export type ContextWindowType = number; // Context window size
export type MaxTokensType = number; // Maximum tokens allowed
export type CapabilitiesType = string[]; // Capabilities of the model

export interface Limitations {
    contextWindow: ContextWindowType;
    maxTokens: MaxTokensType;
    capabilities: CapabilitiesType;
}

// controlSettings
export type ControlIdType = string; // Control ID
export type ComponentTypeType = string; // Type of the component, e.g., 'slider'
export type LabelType = string; // Label for the control, e.g., 'Temperature'
export type HelpTextType = string; // Help text for the control
export type ControlTypeType = string; // Type of the control, e.g., 'float'
export type ValueType = number; // Default value of the control
export type MinType = number; // Minimum value
export type MaxType = number; // Maximum value
export type StepType = number; // Step value for the control

export interface ControlSettings {
    id: ControlIdType;
    componentType: ComponentTypeType;
    label: LabelType;
    helpText: HelpTextType;
    type: ControlTypeType;
    value: ValueType;
    min: MinType;
    max: MaxType;
    step: StepType;
    choices: Choice[];
}

// choice
export type ChoiceIdType = string; // Choice ID
export type ChoiceLabelType = string; // Label for the choice
export type ChoiceValueType = boolean; // Value of the choice

export interface Choice {
    id: ChoiceIdType;
    label: ChoiceLabelType;
    value: ChoiceValueType;
}

// Individual types for AIModelSettings
export type ModelIdType = string; // Model ID (uuid generated by the backend)
export type ModelNameType = string; // Model name (official name)
export type CommonNameType = string; // Common name for the model
export type ModelClassType = string; // Model class
export type ModelTypeType = string; // Model type
export type ModelControlsType = Record<string, unknown>; // Model controls

// AIModelSettings interface
export interface AIModelSettings {
    id: ModelIdType;
    api: API;
    model: ModelNameType;
    commonName: CommonNameType;
    class: ModelClassType;
    type: ModelTypeType;
    limitations: Limitations;
    controls: ModelControlsType;
}


// Placeholder interfaces
export interface PageSettings {
    // Add individual properties here, after adding them individually first.
};

export interface UserSettings {
    // Add individual properties here, after adding them individually first.
};
export interface MatrixSettings {
    // Add individual properties here, after adding them individually first.
};
export interface ClientSettings {
    // Add individual properties here, after adding them individually first.
};
export interface AgencySettings {
    // Add individual properties here, after adding them individually first.
};
export interface VariablesSettings {
    // Add individual properties here, after adding them individually first.
};
export interface ResponseSettings {
    // Add individual properties here, after adding them individually first.
};
export interface BrokerSettings {
    // Add individual properties here, after adding them individually first.
};

export interface Settings {
    quickChatSettings: QuickChatSettings;
    aiModelSettings: AIModelSettings;
    controlSettings: ControlSettings;
    pageSettings: PageSettings; // Page settings fields (omitted for brevity)
    userSettings: UserSettings; // User settings fields (omitted for brevity)
    matrixSettings: MatrixSettings; // Matrix settings fields (omitted for brevity)
    clientSettings: ClientSettings; // Client settings fields (omitted for brevity)
    agencySettings: AgencySettings; // Agency settings fields (omitted for brevity)
    variablesSettings: VariablesSettings; // Variables settings fields (omitted for brevity)
    responseSettings: ResponseSettings; // Response settings fields (omitted for brevity)
    brokerSettings: BrokerSettings; // Broker settings fields (omitted for brevity)
}
