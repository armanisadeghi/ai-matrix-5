// /org/types/recipe.ts

// IdType
export type IdType = string; // e.g., '48ccae16-1864-4735-84ba-414e4e30b201'

// NameType
export type NameType = string; // e.g., 'Blog writer extraordinaire'

// TagsType
export type TagsType = string[]; // Tags associated with the recipe

// DescriptionType
export type DescriptionType = string; // e.g., 'Writes amazing blog articles and so much more'

// SampleOutputType
export type SampleOutputType = string; // Sample output of the recipe

// PublicType
export type PublicType = boolean; // e.g., false

// GroupsType
export type GroupsType = string[]; // Groups with permission

// OrgsType
export type OrgsType = string[]; // Organizations with permission

// UsersType
export type UsersType = string[]; // Users with permission

// Permissions interface
export interface Permissions {
    public: PublicType;
    groups: GroupsType;
    orgs: OrgsType;
    users: UsersType;
}

// ModelsType
export type ModelsType = Record<string, unknown>; // Models involved in the recipe

// BrokersType
export type BrokersType = Record<string, unknown>[]; // Brokers involved in the recipe

// OverridesType
export type OverridesType = Record<string, unknown>; // Overrides for the recipe

// CallParams interface
export interface CallParams {
    models: ModelsType;
    brokers: BrokersType;
    overrides: OverridesType;
}

// ReturnBrokerType
export type ReturnBrokerType = Record<string, unknown>; // Return broker parameters

// ProcessorsType
export type ProcessorsType = Record<string, unknown>; // Processors involved

// DefaultDisplayType
export type DefaultDisplayType = Record<string, unknown>; // Default display settings

// NextStepOptionsType
export type NextStepOptionsType = Record<string, unknown>; // Options for the next step

// PostParams interface
export interface PostParams {
    returnBroker: ReturnBrokerType;
    processors: ProcessorsType;
    defaultDisplay: DefaultDisplayType;
    nextStepOptions: NextStepOptionsType;
}

// Recipe interface
export interface Recipe {
    id: IdType;
    name: NameType;
    tags: TagsType;
    description: DescriptionType;
    permissions: Permissions;
    messages: string[]; // Messages related to the recipe
    callParams: CallParams;
    postParams: PostParams;
    sampleOutput: SampleOutputType;
}
