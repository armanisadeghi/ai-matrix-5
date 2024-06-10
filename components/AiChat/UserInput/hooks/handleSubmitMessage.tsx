import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, activeChatMessagesArrayAtom, allowSubmitMessageState,systemMessageAtom
} from "@/state/aiAtoms/chatAtoms";
import { MatrixMessage } from '@/types/chat';
import { v4 as uuidv4 } from "uuid";
import { useChatDbAtoms } from '@/app/samples/chats/hooks/useChatDbAtoms';

export const useHandleSubmitMessage = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
    const [currentChatId, setCurrentChatId] = useRecoilState(activeChatIdAtom);
    const [systemMessage] = useRecoilState(systemMessageAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [allowSubmitMessage, setAllowSubmitMessage] = useRecoilState(allowSubmitMessageState);
    const [streamTrigger, setStreamTrigger] = useState(false);

    const { addNewChatToDatabase, addUserMessageToDb, handleCreateChatLocal } = useChatDbAtoms();

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

                try {
                    //@ts-ignore
                    const result = await saveUpdatedArrayToDb(updatedChatArray);

                    // await addUserMessageToDb(updatedChatArray, currentChatId);

                    console.log('Message added successfully');
                } catch (error) {
                    console.error('There was a problem adding the message:', error);
                }
            } else {
                const newChatArray = [systemMessage, newUserMessageEntry];
                setActiveChatMessagesArray(newChatArray);

                try {
                    //@ts-ignore
                    await addNewChatToDatabase(newChatArray);
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
