// recoil/aiAtoms/userAtoms.ts
import { atom, selector } from 'recoil';
import { MatrixUser } from '@/types/user.types';
import { combinedSettingsState } from '@/state/aiAtoms/settingsAtoms';

export const activeUserAtom = atom<MatrixUser>({
    key: 'activeUserAtom',
    default: undefined,
});

export const userProcessedAtom = atom({
    key: 'userProcessed',
    default: false,
});

export const userCredentialsSelector = selector<{ userid: string | null; token: string | null }>({
    key: 'userCredentialsSelector',
    get: ({ get }) => {
        const activeUser = get(activeUserAtom);
        const userid = activeUser.matrixId || null;
        const token = activeUser.auth0Id || null;
        return { userid, token };
    },
});



import { useRecoilValue } from 'recoil';

const makeApiCall = async () => {
    const userCredentials = useRecoilValue(userCredentialsSelector);
    const combinedSettings = useRecoilValue(combinedSettingsState);

    if (!userCredentials.userid || !userCredentials.token) {
        throw new Error('No active user found');
    }

    const data = {
        user_credentials: userCredentials,
        settings: combinedSettings,

        data: 'some data',
    };

    try {
        const response = await fetch('/api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('API call successful:', responseData);
    } catch (error) {
        console.error('API call failed:', error);
    }
};
