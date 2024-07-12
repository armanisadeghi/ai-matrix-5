/*
// @ts-nocheck

import { atom } from 'recoil';


const userPreferencesAtom = atom({
    key: 'userPreferences',
    default: {
        theme: 'light',
        notifications: true,
        language: 'en'
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
            itemKey: `myItem-${param}`,
            storeKey: 'storeA',
            refine: string(),
        }),
    ],
});



const currentTabState = atom<string>({
    key: 'CurrentTab',
    default: 'FirstTab', // Fallback default for first-use
    effects: [
        // Initialize default with per-user default from the cloud
        syncEffect({ storeKey: 'user_defaults', refine: string() }),

        // Override with state stored in URL if reloading or sharing
        syncEffect({ storeKey: 'url', refine: string() }),
    ],
});


function manyToOneSyncEffect() {
    syncEffect({
        refine: object({ foo: nullable(number()), bar: nullable(number()) }),
        read: ({read}) => ({foo: read('foo'), bar: read('bar')}),
        write: ({write, reset}, newValue) => {
            if (newValue instanceof DefaultValue) {
                reset('foo');
                reset('bar');
            } else {
                write('foo', newValue.foo);
                write('bar', newValue.bar);
            }
        },
    });
}

atom<{foo: number, bar: number}>({
    key: 'MyObject',
    default: {},
    effects: [manyToOneSyncEffect()],
});



function oneToManySyncEffect(prop: string) {
    const validate = assertion(dict(nullable(number())));
    syncEffect({
        refine: nullable(number()),
        read: ({read}) => validate(read('compound'))[prop],
        write: ({write, read}, newValue) => {
            const compound = {...validate(read('compound'))};
            if (newValue instanceof DefaultValue) {
                delete compound[prop];
                write('compound', compound);
            } else {
                write('compound', {...compound, [prop]: newValue});
            }
        },
    });
}

atom<number>({
    key: 'MyNumber',
    default: 0,
    effects: [oneToManySyncEffect('foo')],
});




function userProfileSyncEffect() {
    return syncEffect({
        refine: object({
            chatId: string(),
            messages: array(
                object({
                    createdAt: string(),
                    id: string(),
                    index: number(),
                    text: string(),
                    role: string(),
                })
            ).optional()
        }),
        read: async ({ read }) => {
            const chatId = read('currentChatId');
            const chat = await db.chats.findById(chatId);
            const messages = await db.chatMessages.findByChatId(chatId);
            return {
                ...chat,
                messages
            };
        },
        write: async ({ write }, newValue) => {
            if (newValue instanceof DefaultValue) {
                // Handle reset case
            } else {
                await db.chats.update(newValue.chatId, {
                    chatTitle: newValue.chatTitle,
                    createdAt: newValue.createdAt,
                    lastEdited: newValue.lastEdited,
                    matrixId: newValue.matrixId,
                    metadata: newValue.metadata,
                });
                // Update messages
                if (newValue.messages) {
                    for (const message of newValue.messages) {
                        await db.chatMessages.update(message.id, message);
                    }
                }
            }
        },
    });
}

const userProfileAtom = atom({
    key: 'userProfile',
    default: {},
    effects: [userProfileSyncEffect()]
});



// Atom to store the active chat ID
const activeChatIdAtom = atom({
    key: 'activeChatIdAtom',
    default: '',
});

// Atom family to store messages for each chat
const messagesAtomFamily = atomFamily({
    key: 'messagesAtomFamily',
    default: [],
    effects: (chatId) => [MessagesSyncEffect(chatId)],
});

// Selector to get messages for the active chat ID
const activeChatMessagesSelector = selector({
    key: 'activeChatMessagesSelector',
    get: ({ get }) => {
        const chatId = get(activeChatIdAtom);
        return get(messagesAtomFamily(chatId));
    },
});


function MessagesSyncEffect(chatId) {
    return ({ setSelf, onSet }) => {
        if (!chatId) return;

        // Fetch messages when the effect is first applied
        const loadMessages = async () => {
            const messages = await db.messages.fetchAllChatMessages(chatId);
            setSelf(messages);
        };

        loadMessages();

        // Listen for changes to the atom's value and write them to the database
        onSet(async (newValue, oldValue, isReset) => {
            if (isReset) {
                // Handle reset logic if needed
            } else {
                for (const message of newValue) {
                    await db.chatMessages.update(message.id, {
                        chatId: message.chatId,
                        createdAt: message.createdAt,
                        id: message.id,
                        index: message.index,
                        text: message.text,
                        role: message.role,
                    });
                }
            }
        });
    };
}
*/
