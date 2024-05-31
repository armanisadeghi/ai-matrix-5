// /atoms/recipeAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Recipe, Permissions, CallParams, PostParams } from '../types/recipe';

// Atom for the entire recipe data
export const recipeAtom = atom<Recipe | null>(null);

// Individual atoms for each property in Recipe
export const recipeIdAtom = atom((get) => get(recipeAtom)?.id || '');
export const recipeNameAtom = atom((get) => get(recipeAtom)?.name || '');
export const recipeTagsAtom = atom((get) => get(recipeAtom)?.tags || []);
export const recipeDescriptionAtom = atom((get) => get(recipeAtom)?.description || '');
export const recipePermissionsAtom = atom((get) => get(recipeAtom)?.permissions || {} as Permissions);
export const recipeMessagesAtom = atom((get) => get(recipeAtom)?.messages || []);
export const recipeCallParamsAtom = atom((get) => get(recipeAtom)?.callParams || {} as CallParams);
export const recipePostParamsAtom = atom((get) => get(recipeAtom)?.postParams || {} as PostParams);
export const recipeSampleOutputAtom = atom((get) => get(recipeAtom)?.sampleOutput || '');

// Individual atoms for each property in Permissions
export const permissionsPublicAtom = atom((get) => get(recipePermissionsAtom)?.public || false);
export const permissionsGroupsAtom = atom((get) => get(recipePermissionsAtom)?.groups || []);
export const permissionsOrgsAtom = atom((get) => get(recipePermissionsAtom)?.orgs || []);
export const permissionsUsersAtom = atom((get) => get(recipePermissionsAtom)?.users || []);

// Individual atoms for each property in CallParams
export const callParamsModelsAtom = atom((get) => get(recipeCallParamsAtom)?.models || {});
export const callParamsBrokersAtom = atom((get) => get(recipeCallParamsAtom)?.brokers || []);
export const callParamsOverridesAtom = atom((get) => get(recipeCallParamsAtom)?.overrides || {});

// Individual atoms for each property in PostParams
export const postParamsReturnBrokerAtom = atom((get) => get(recipePostParamsAtom)?.returnBroker || {});
export const postParamsProcessorsAtom = atom((get) => get(recipePostParamsAtom)?.processors || {});
export const postParamsDefaultDisplayAtom = atom((get) => get(recipePostParamsAtom)?.defaultDisplay || {});
export const postParamsNextStepOptionsAtom = atom((get) => get(recipePostParamsAtom)?.nextStepOptions || {});

// Atom families for dynamic elements in Permissions
export const permissionsGroupAtomFamily = atomFamily((index: number) =>
    atom((get) => get(permissionsGroupsAtom)?.[index] || '')
);

export const permissionsOrgAtomFamily = atomFamily((index: number) =>
    atom((get) => get(permissionsOrgsAtom)?.[index] || '')
);

export const permissionsUserAtomFamily = atomFamily((index: number) =>
    atom((get) => get(permissionsUsersAtom)?.[index] || '')
);

// Atom families for dynamic elements in CallParams
export const callParamsBrokerAtomFamily = atomFamily((index: number) =>
    atom((get) => get(callParamsBrokersAtom)?.[index] || {})
);

// Derived atom for full Recipe
export const derivedRecipeAtom = atom<Recipe>((get) => ({
    id: get(recipeIdAtom),
    name: get(recipeNameAtom),
    tags: get(recipeTagsAtom),
    description: get(recipeDescriptionAtom),
    permissions: get(recipePermissionsAtom),
    messages: get(recipeMessagesAtom),
    callParams: get(recipeCallParamsAtom),
    postParams: get(recipePostParamsAtom),
    sampleOutput: get(recipeSampleOutputAtom),
}));

// Derived atom for Permissions
export const derivedPermissionsAtom = atom<Permissions>((get) => ({
    public: get(permissionsPublicAtom),
    groups: get(permissionsGroupsAtom),
    orgs: get(permissionsOrgsAtom),
    users: get(permissionsUsersAtom),
}));

// Derived atom for CallParams
export const derivedCallParamsAtom = atom<CallParams>((get) => ({
    models: get(callParamsModelsAtom),
    brokers: get(callParamsBrokersAtom),
    overrides: get(callParamsOverridesAtom),
}));

// Derived atom for PostParams
export const derivedPostParamsAtom = atom<PostParams>((get) => ({
    returnBroker: get(postParamsReturnBrokerAtom),
    processors: get(postParamsProcessorsAtom),
    defaultDisplay: get(postParamsDefaultDisplayAtom),
    nextStepOptions: get(postParamsNextStepOptionsAtom),
}));
