// /atoms/aiRequestAtoms.tsx

import { atom } from 'jotai';
import { derivedMetadataAtom } from './metadataAtoms';
import { derivedUserAtom } from './userAtoms';
import { derivedChatDataAtom } from './chatDataAtoms';
import { derivedRecipeAtom } from './recipeAtoms';
import { derivedSettingsAtom } from './settingsAtoms';
import { AIRequest } from '../types/aiRequest';

// Atom for the entire AIRequest data
export const aiRequestAtom = atom<AIRequest | null>(null);

// Individual atoms for each property in AIRequest
export const aiRequestMetadataAtom = atom((get) => get(aiRequestAtom)?.metadata || get(derivedMetadataAtom));
export const aiRequestUserAtom = atom((get) => get(aiRequestAtom)?.user || get(derivedUserAtom));
export const aiRequestChatDataAtom = atom((get) => get(aiRequestAtom)?.chatData || get(derivedChatDataAtom));
export const aiRequestRecipeAtom = atom((get) => get(aiRequestAtom)?.recipe || get(derivedRecipeAtom));
export const aiRequestSettingsAtom = atom((get) => get(aiRequestAtom)?.settings || get(derivedSettingsAtom));

// Derived atom for full AIRequest
export const derivedAIRequestAtom = atom<AIRequest>((get) => ({
    metadata: get(aiRequestMetadataAtom),
    user: get(aiRequestUserAtom),
    chatData: get(aiRequestChatDataAtom),
    recipe: get(aiRequestRecipeAtom),
    settings: get(aiRequestSettingsAtom),
}));
