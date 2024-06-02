// /atoms/recipeAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import {
    IdType,
    NameType,
    TagsType,
    DescriptionType,
    SampleOutputType,
    PublicType,
    GroupsType,
    OrgsType,
    UsersType,
    Permissions,
    ModelsType,
    BrokersType,
    OverridesType,
    CallParams,
    ReturnBrokerType,
    ProcessorsType,
    DefaultDisplayType,
    NextStepOptionsType,
    PostParams,
    Recipe
} from '../types/recipe';
import { brokersAtom } from "@/org/atoms/brokerAtoms";

// Primitive atom for AI Models -- This will probably come from somewhere else.
export const aiModelsAtom = atom<string[]>([]);

// Primitive atoms for the properties of `post_params`
export const postParamsOutputVariableAtom = atom<ReturnBrokerType>({});
export const postParamsProcessorsPermanentAtom = atom<ProcessorsType>({});
export const postParamsProcessorsOptionalAtom = atom<ProcessorsType>({});
export const postParamsDefaultDisplayAtom = atom<DefaultDisplayType>({ text_area: true });
export const postParamsNextStepOptionsAtom = atom<NextStepOptionsType>({});

// Derived atom for the `processors` object within `post_params`
export const postParamsProcessorsAtom = atom(
    (get) => ({
        permanent: get(postParamsProcessorsPermanentAtom),
        optional: get(postParamsProcessorsOptionalAtom),
    })
);

// Derived atom for the entire `post_params` data
export const postParamsAtom = atom<PostParams>(
    (get) => ({
        returnBroker: get(postParamsOutputVariableAtom),
        processors: get(postParamsProcessorsAtom),
        defaultDisplay: get(postParamsDefaultDisplayAtom),
        nextStepOptions: get(postParamsNextStepOptionsAtom),
    })
);

// Primitive atoms for the properties of `models`
export const verifiedModelsAtom = atom<ModelsType>({});
export const eliteModelAtom = atom<string>('');
export const trialModelsAtom = atom<ModelsType>({});

// Derived atom for the `models` object within `call_params`
export const modelsAtom = atom(
    (get) => ({
        verified_models: get(aiModelsAtom),
        elite_model: get(eliteModelAtom),
        trial_models: get(aiModelsAtom),
    })
);

// Primitive atom for `overrides` object
export const overridesAtom = atom<OverridesType>({});

// Derived atom for the entire `call_params` data
export const callParamsAtom = atom<CallParams>(
    (get) => ({
        models: get(modelsAtom),
        brokers: get(brokersAtom),
        overrides: get(overridesAtom),
    })
);

// Primitive atoms for the properties of `recipes`
export const recipeNameAtom = atom<NameType>('');
export const recipeTagsAtom = atom<TagsType>([]);
export const recipeDescriptionAtom = atom<DescriptionType>('');
export const recipeSampleOutputAtom = atom<SampleOutputType>('');

// Primitive atoms for the properties of `permissions`
export const permissionsPublicAtom = atom<PublicType>(false);
export const permissionsGroupsAtom = atom<GroupsType>([]);
export const permissionsOrgsAtom = atom<OrgsType>([]);
export const permissionsUsersAtom = atom<UsersType>([]);

// Derived atom for the `permissions` object within `recipes`
export const permissionsAtom = atom<Permissions>(
    (get) => ({
        public: get(permissionsPublicAtom),
        groups: get(permissionsGroupsAtom),
        orgs: get(permissionsOrgsAtom),
        users: get(permissionsUsersAtom),
    })
);

// Primitive atoms for the properties of `messages`
export const messageIndexAtom = atom<number>(0);
export const messageRoleTypeAtom = atom<string>(''); // 'system', 'user', or 'assistant'
export const messageTextAtom = atom<string>('');

// Atom family for `recipeMessages`
export const recipeMessagesFamily = atomFamily((index: number) => atom({
    index: index,
    roleType: '', // 'system', 'user', or 'assistant'
    text: '',
}));

// Derived atom for the entire recipe data
export const recipeAtom = atom(
    (get) => ({
        id: '', // Assuming IdType is set elsewhere or use a default value
        name: get(recipeNameAtom),
        tags: get(recipeTagsAtom),
        description: get(recipeDescriptionAtom),
        permissions: get(permissionsAtom),
        messages: [ // Need a way to get the number of messages to be able to use this method.
            get(recipeMessagesFamily(0)),
            get(recipeMessagesFamily(1))
        ],
        callParams: get(callParamsAtom),
        postParams: get(postParamsAtom),
        sampleOutput: get(recipeSampleOutputAtom),
    })
);
