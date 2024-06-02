// /atoms/aiRequestAtoms.tsx

import { atom } from 'jotai';
import { metadataAtom } from './metadataAtoms';
import { userAtom } from './userAtoms';
import { chatDataAtom } from './chatDataAtoms';
import { recipeAtom } from './recipeAtoms';
import { settingsAtom } from './settingsAtoms';
import { aiRequest } from '../types/aiRequest';

// Derived atom for full AIRequest
export const aiRequestAtom = atom((get) => ({
    metadata: get(metadataAtom),
    user: get(userAtom),
    chatData: get(chatDataAtom),
    recipe: get(recipeAtom),
    settings: get(settingsAtom)
}));
