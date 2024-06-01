// /atoms/aiModelSettingsAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

// Primitive atoms for the properties of `aiModelSettings`
export const aiModelIdAtom = atom<string>('');
export const aiModelAtom = atom<string>('');
export const aiModelCommonNameAtom = atom<string>('');
export const aiModelClassAtom = atom<string>('');
export const aiModelTypeAtom = atom<string>('');
export const aiModelApiProviderAtom = atom<string>('');
export const aiModelApiEndpointAtom = atom<string>('');
export const aiModelLimitationsContextWindowAtom = atom<number>(0);
export const aiModelLimitationsMaxTokensAtom = atom<number>(0);
export const aiModelLimitationsCapabilitiesAtom = atom<string[]>([]);

// Primitive atoms for the properties of `controlSettings`
export const controlIdAtom = atom<string>('');
export const controlComponentTypeAtom = atom<string>('slider');
export const controlLabelAtom = atom<string>('Temperature');
export const controlHelpTextAtom = atom<string>('');
export const controlTypeAtom = atom<string>('float');
export const controlValueAtom = atom<number>(0.0);
export const controlMinAtom = atom<number>(0.0);
export const controlMaxAtom = atom<number>(0.0);
export const controlStepAtom = atom<number>(0.01);

// Primitive atoms for the properties of `choices`
export const choiceIdAtom = atom<string>('');
export const choiceLabelAtom = atom<string>('');
export const choiceValueAtom = atom<boolean>(false);


// Derived atom for the `api` object
export const aiModelApiAtom = atom(
    (get) => ({
        provider: get(aiModelApiProviderAtom),
        endpoint: get(aiModelApiEndpointAtom),
    })
);

// Derived atom for the `limitations` object
export const aiModelLimitationsAtom = atom(
    (get) => ({
        contextWindow: get(aiModelLimitationsContextWindowAtom),
        maxTokens: get(aiModelLimitationsMaxTokensAtom),
        capabilities: get(aiModelLimitationsCapabilitiesAtom),
    })
);



// Atom family for `choices`
export const choiceFamily = atomFamily(
    (id: string) => atom(
        (get) => ({
            id: get(choiceIdAtom),
            label: get(choiceLabelAtom),
            value: get(choiceValueAtom),
        }),
    ),
);

// Derived atom for the `choices` array
export const choicesAtom = atom((get) => {
    const choices: { id: string; label: string; value: boolean }[] = [];
    // Add logic here to dynamically populate choiceIds
    const choiceIds: string[] = []; // This should be populated dynamically based on your application logic
    for (const id of choiceIds) {
        choices.push(get(choiceFamily(id)));
    }
    return choices;
});


// Derived atom for the entire `controlSettings` data
export const controlSettingsAtom = atom(
    (get) => ({
        id: get(controlIdAtom),
        componentType: get(controlComponentTypeAtom),
        label: get(controlLabelAtom),
        helpText: get(controlHelpTextAtom),
        type: get(controlTypeAtom),
        value: get(controlValueAtom),
        min: get(controlMinAtom),
        max: get(controlMaxAtom),
        step: get(controlStepAtom),
        choices: get(choicesAtom),
    })
);


// Derived atom for the entire `aiModelSettings` data
export const aiModelSettingsAtom = atom(
    (get) => ({
        id: get(aiModelIdAtom),
        model: get(aiModelAtom),
        commonName: get(aiModelCommonNameAtom),
        class: get(aiModelClassAtom),
        type: get(aiModelTypeAtom),
        api: get(aiModelApiAtom),
        limitations: get(aiModelLimitationsAtom),
        controls: get(controlSettingsAtom), // Include the controlSettings here
    })
);
