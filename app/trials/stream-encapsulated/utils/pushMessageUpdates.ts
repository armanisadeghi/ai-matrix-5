import { activeChatIdAtom, activeChatMessagesArrayAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { updateAllMessages, updateSomeMessages } from '@/utils/supabase/chatDb';
import { useRecoilState, useRecoilValue } from 'recoil';


const deepEqual = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export async function pushAsyncUpdates(dbReplace = false) {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    if (activeChatId === null) { return; }
    const [activeMessages, setActiveMessages ] = useRecoilState(activeChatMessagesArrayAtom);
    const [loadingStateMessages, setAllMessages] = useRecoilState(messagesFamily(activeChatId));

    let originalMessages = loadingStateMessages;
    setAllMessages(activeMessages);

    if (dbReplace) {
        await updateAllMessages(activeChatId, activeMessages);

    } else {

        const newEntries = activeMessages.filter(item => !originalMessages.some(cv => cv.id === item.id));


        const changedEntries = activeMessages.filter(item => {
            const existingItem = originalMessages.find(cv => cv.id === item.id);
            return existingItem && !deepEqual(existingItem, item);
        });
        const deletedEntries = originalMessages.filter(item => !activeMessages.some(uao => uao.id === item.id)).map(item => item.id);

        await updateSomeMessages(activeChatId, {newEntries, changedEntries, deletedEntries});
    }
}

export default pushAsyncUpdates;


/*
One way to get this to go last.

async function handleUserSubmission() {
    try {
        // Kick off all asynchronous operations
        const operation1 = asyncOperation1();
        const operation2 = asyncOperation2();
        const operation3 = asyncOperation3();

        // Wait for all operations to complete
        await Promise.all([operation1, operation2, operation3]);

        // Call pushAsyncUpdates as the last step
        await pushAsyncUpdates();

    } catch (error) {
        console.error('An error occurred:', error);
    }
}
*/
