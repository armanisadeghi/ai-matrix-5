// app/mainModule/settings/aiRequestOptions.ts




export const EVENT_TASKS = [
    'directChat',
    'simpleChat',
    'runRecipe',
    'runAction',
    'validateRequest',
    'processWorkflow',
    'dataProcessing',
    'directStream',
    'openai_stream_request',
] as const;


export const SOCKET_EVENTS = [
    'matrix_chat',
    'playground_stream',
    'run_recipe',
    'validation',
    'workflow',
] as const;

export const SOURCES = [
    'ai-chat',
    'matrixChat',
    'quickChat',
    'sidebarChat',
    'playground',
    'wordpress',
    'shopify',
    'thirdParty',
    'ai-tests',
] as const;


export const CHANNELS = [
    'text',
    'voice',
    'video',
    'image',
] as const;

export const ROLE_TYPES = [
    'system',
    'user',
    'assistant',
] as const;

export const AI_PREFERENCES_MAIN = [
    'default',
    'custom1',
    'custom2',
    // Add other main AI preferences here
] as const;

export const AI_PREFERENCES_SECOND = [
    'assistant',
    'helper',
    'advisor',
    // Add other second AI preferences here
] as const;
