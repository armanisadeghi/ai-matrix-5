// /org/types/recipe.ts

export interface Recipe {
    id: string; // e.g., '48ccae16-1864-4735-84ba-414e4e30b201'
    name: string; // e.g., 'Blog writer extraordinaire'
    tags: string[]; // Tags associated with the recipe
    description: string; // e.g., 'Writes amazing blog articles and so much more'
    permissions: Permissions;
    messages: string[]; // Messages related to the recipe
    callParams: CallParams;
    postParams: PostParams;
    sampleOutput: string; // Sample output of the recipe
}

export interface Permissions {
    public: boolean; // e.g., false
    groups: string[]; // Groups with permission
    orgs: string[]; // Organizations with permission
    users: string[]; // Users with permission
}

export interface CallParams {
    models: Record<string, unknown>; // Models involved in the recipe
    brokers: Record<string, unknown>[]; // Brokers involved in the recipe
    overrides: Record<string, unknown>; // Overrides for the recipe
}

export interface PostParams {
    returnBroker: Record<string, unknown>; // Return broker parameters
    processors: Record<string, unknown>; // Processors involved
    defaultDisplay: Record<string, unknown>; // Default display settings
    nextStepOptions: Record<string, unknown>; // Options for the next step
}
