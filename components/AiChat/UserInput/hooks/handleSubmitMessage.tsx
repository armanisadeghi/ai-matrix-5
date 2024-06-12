import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, activeChatMessagesArrayAtom, allowSubmitMessageState,systemMessagesAtom
} from "@/state/aiAtoms/chatAtoms";
import { MatrixMessage } from '@/types/chat';
import { v4 as uuidv4 } from "uuid";
import { useChatDbAtoms } from "@/hooks/ai/useChatDbAtoms";


export const useHandleSubmitMessage = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const [systemMessage] = useRecoilState(systemMessagesAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [allowSubmitMessage, setAllowSubmitMessage] = useRecoilState(allowSubmitMessageState);
    const [streamTrigger, setStreamTrigger] = useState(false);

    const { addNewChatToDatabase, addUserMessageToDb, pushUpdatedArrayToDb, handleCreateChatLocal } = useChatDbAtoms();

    const handleSubmitMessage = async () => {
        setAllowSubmitMessage(false);
        const text = textareaRef.current?.value || '';
        const userTextInput = text.trim();

        if (userTextInput) {
            textareaRef.current?.setAttribute('disabled', 'true');

            const newUserMessageEntry: MatrixMessage = {
                index: activeChatMessagesArray.length,
                role: 'user',
                text: userTextInput,
            };

            if (currentChatId) {
                const updatedChatArray = [...activeChatMessagesArray, newUserMessageEntry];
                setActiveChatMessagesArray(updatedChatArray);
                setStreamTrigger(true);

                // Step 3A: Display the new user message in the response area
                // TODO: Logic missing here (Armani needs to add it here)

                // a lot of this code was changed to make the build pass
                // TODO: all of this needs to be fixed

                try {
                    const result = await pushUpdatedArrayToDb();

                    // await addUserMessageToDb(updatedChatArray, currentChatId);

                    console.log('Message added successfully');
                } catch (error) {
                    console.error('There was a problem adding the message:', error);
                }
            } else {
                const newChatArray = [systemMessage, newUserMessageEntry];
                setActiveChatMessagesArray(newChatArray);

                try {
                    await addNewChatToDatabase();
                    const newChatId = uuidv4();
                    setCurrentChatId(newChatId);
                    setStreamTrigger(true);
                } catch (error) {
                    console.error('There was a problem creating a new chat:', error);
                }
            }

            textareaRef.current.removeAttribute('disabled');
            textareaRef.current.value = '';
            textareaRef.current.focus();
        }
    };

    return { handleSubmitMessage, streamTrigger, setStreamTrigger };
};
