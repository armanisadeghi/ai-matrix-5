/*
import { MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import { string } from '@recoiljs/refine';
import { atom, atomFamily, DefaultValue, selector, useRecoilValue } from 'recoil';
import { syncEffect } from 'recoil-sync';


export const activeChatIdAtom = atom<string>({
    key: 'activeChatIdAtom',
    default: '',
});


// Selector to get messages for the active chat ID
export const activeChatMessagesSelector = selector<MessageType>({
    key: 'activeChatMessagesSelector',
    get: ({ get }) => {
        const chatId = get(activeChatIdAtom);
        const allMessages =  get(messagesAtomFamily);
        // Filter messages for the active chatId
        return allMessages.filter(message => message.chatId === chatId);

    },
});

async function fetchActiveChatMessages(): Promise<MessageType[]> {
    const chatId = useRecoilValue(activeChatIdAtom);
    if (!chatId) throw new Error('Missing chatId');

    const { data, error } = await supabase.rpc('fetch_messages', { matrix_chat_id: chatId });
    if (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    } else {
        console.log('fetchChatMessages Chat messages:', data);
        return data as MessageType[];
    }
}

function MessagesSyncEffect() {
    return ({ setSelf, onSet }: { setSelf: (value: MessageType | DefaultValue) => void, onSet: (handler: (newValue: MessageType, oldValue: MessageType, isReset: boolean) => void) => void }) => {

        const loadMessages = async () => {
            try {
                const messages = await fetchActiveChatMessages();

                messages.forEach((message) => {
                    const individualMessage = {
                        id: message.id,
                        chat_id: message.chatId,
                        role: message.role,
                        message: message.text,
                        index: message.index,
                        created_at: message.createdAt,
                    };

                    setSelf(individualMessage);
                });
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        loadMessages();

        let delayTimeout: NodeJS.Timeout;

        onSet((newValue, oldValue, isReset) => {
            if (delayTimeout) {
                clearTimeout(delayTimeout);
            }

            delayTimeout = setTimeout(async () => {
                if (isReset) {
                    // Handle reset logic if needed
                } else {
                    for (const message of newValue) {
                        if (!message.id || !message.chatId || !message.role || !message.text) {
                            console.error('Missing required fields');
                            continue;
                        }

                        try {
                            const { data, error } = await supabase.rpc('add_custom_message', {
                                id: message.id,
                                chat_id: message.chatId,
                                role: message.role,
                                message: message.text,
                                index: message.index,
                                created_at: message.createdAt,
                            });
                            if (error) throw error;
                            console.log('Custom message added:', data);
                        } catch (error) {
                            console.error('Error adding custom message:', error);
                        }
                    }
                }
            }, 5000);  // use a 5 second delay to ensure updates don't happen in the middle of streams.
        });
    };
}

// Atom family to store messages for each chat
export const messagesAtomFamily = atomFamily<MessageType, null>({
    key: 'messagesAtomFamily',
    default: null,
    effects: [MessagesSyncEffect],
});





const userPreferencesAtom = atom({
    key: 'userPreferences',
    default: {
        id: message.id,
        chat_id: message.chatId,
        role: message.role,
        message: message.text,
        index: message.index,
        created_at: message.createdAt,
    },
    effects: [
        // Effect 1: Initialization and Cleanup
        ({ setSelf, onSet }) => {
            console.log('Initializing userPreferences atom');

            // Load initial value from localStorage
            const storedValue = localStorage.getItem('userPreferences');
            if (storedValue) {
                setSelf(JSON.parse(storedValue));
            }

            // Sync to localStorage on every change
            onSet((newValue, oldValue) => {
                console.log('Preferences changed:', oldValue, '->', newValue);
                localStorage.setItem('userPreferences', JSON.stringify(newValue));
            });

            // Cleanup function
            return () => {
                console.log('Cleaning up userPreferences atom');
                // Perform any necessary cleanup
            };
        },

        // Effect 2: Validation
        ({ onSet, resetSelf }) => {
            onSet((newValue) => {
                if (typeof newValue !== 'object' || newValue === null) {
                    console.error('Invalid value for userPreferences');
                    resetSelf();
                }
            });
        },

        // Effect 3: Derived updates
        ({ setSelf, onSet }) => {
            onSet((newValue) => {
                if (newValue.theme === 'auto') {
                    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setSelf((currentValue) => ({
                        ...currentValue,
                        theme: isDarkMode ? 'dark' : 'light'
                    }));
                }
            });
        },

        // Effect 4: External system synchronization
        ({ onSet }) => {
            onSet((newValue) => {
                // Simulate API call to update user preferences on server
                fetch('/api/updatePreferences', {
                    method: 'POST',
                    body: JSON.stringify(newValue)
                }).then(() => console.log('Preferences synced with server'));
            });
        },

        // Effect 5: Conditional effect based on trigger
        ({ trigger, setSelf, onSet }) => {
            if (trigger === 'get') {
                console.log('Atom was read (get trigger)');
            }

            onSet((newValue, oldValue, isReset) => {
                if (isReset) {
                    console.log('Atom was reset to its default value');
                } else {
                    console.log(`Atom was set from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);
                }
            });
        },

        // Effect 6: Periodic updates
        ({ setSelf }) => {
            const intervalId = setInterval(() => {
                setSelf((currentValue) => ({
                    ...currentValue,
                    lastUpdated: new Date().toISOString()
                }));
            }, 60000); // Update every minute

            return () => clearInterval(intervalId);
        }
    ]
});



atomFamily({
    key: 'AtomKey',
    effects: param => [
        syncEffect({
            itemKey: `chatId-${param}`,
            storeKey: 'messages',
            refine: string(),
        }),
    ],
});
*/
