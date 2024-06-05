// /atoms/settingsAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Settings, QuickChatSettings, AIModelSettings, API, Limitations, ControlSettings, Choice } from '../types/settings';
import { quickChatSettingsAtom } from "@/org/atoms/quickChatSettings";
import { aiModelSettingsAtom, controlSettingsAtom } from "@/org/atoms/modelSettings";


// Primitive atoms for each property in Settings
export const pageSettingsAtom = atom<Record<string, any>>({});
export const userSettingsAtom = atom<Record<string, any>>({});
export const matrixSettingsAtom = atom<Record<string, any>>({});
export const clientSettingsAtom = atom<Record<string, any>>({});
export const agencySettingsAtom = atom<Record<string, any>>({});
export const variablesSettingsAtom = atom<Record<string, any>>({});
export const responseSettingsAtom = atom<Record<string, any>>({});
export const brokerSettingsAtom = atom<Record<string, any>>({});

// Derived atom for the entire settings data
export const settingsAtom = atom(
    (get) => ({
        quickChatSettingsAtom: get(quickChatSettingsAtom),
        aiModelSettings: get(aiModelSettingsAtom),
        controlSettings: get(controlSettingsAtom),
        pageSettings: get(pageSettingsAtom),
        userSettings: get(userSettingsAtom),
        matrixSettings: get(matrixSettingsAtom),
        clientSettings: get(clientSettingsAtom),
        agencySettings: get(agencySettingsAtom),
        variablesSettings: get(variablesSettingsAtom),
        responseSettings: get(responseSettingsAtom),
        brokerSettings: get(brokerSettingsAtom),
    })
);
