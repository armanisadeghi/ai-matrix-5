// app/mainModule/settings/aiRequestOptions.ts

export const SOCKET_EVENTS = [
    'matrix_chat',
    'playground_stream',
    'run_recipe',
    'validation',
    'workflow',
] as const;

export const EVENT_TASKS = [
    'simpleChat',
    'runRecipe',
    'runAction',
    'validateRequest',
    'processWorkflow',
    'dataProcessing',
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
    // Add unique source for each separate page
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
