import { useSelector, useDispatch } from 'react-redux';
import { selectActiveChatId, selectChatMessages, setActiveChatId, addUserMessage, fetchChatMessages, } from '../store/chatSlice';
import { selectActiveUser } from '../store/userSlice';

// In your component
const Component = () => {
    const dispatch = useDispatch();
    const activeChatId = useSelector(selectActiveChatId);
    const chatMessages = useSelector((state) => selectChatMessages(state, activeChatId));
    const activeUser = useSelector(selectActiveUser);

    // Use dispatch to update state
    dispatch(setActiveChatId('some-chat-id'));
    dispatch(addUserMessage({chatId: 'some-chat-id', message: /* message object */}));
    dispatch(fetchChatMessages('some-chat-id'));
};
