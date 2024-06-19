import supabase from '@/utils/supabase/client'

/*
const { data, error } = await supabase
    .rpc('fetch_user_chats', { user_matrix_id: userId });

if (error) console.error('Error fetching user chats:', error);
else console.log('User chats:', data);


const { data, error } = await supabase
    .from('chat_messages_view')
    .select('*')
    .eq('chat_id', specific_chat_id);

if (error) console.error('Error fetching chat messages:', error);
else console.log('Chat messages:', data);

const { data, error } = await supabase
    .rpc('add_system_message', { chat_id: specific_chat_id, message: 'Your system message here' });

if (error) console.error('Error adding system message:', error);
else console.log('System message added:', data);

const { data, error } = await supabase
    .rpc('add_user_message', { chat_id: specific_chat_id, message: 'Your user message here' });

if (error) console.error('Error adding user message:', error);
else console.log('User message added:', data);

const { data, error } = await supabase
    .rpc('add_assistant_message', { chat_id: specific_chat_id, message: 'Your assistant message here' });

if (error) console.error('Error adding assistant message:', error);
else console.log('Assistant message added:', data);

const { data, error } = await supabase
    .rpc('add_custom_message', {
        chat_id: specific_chat_id,
        role: 'custom_role',
        message: 'Your custom message here',
        message_index: null, // or provide a specific index if needed
        message_created_at: new Date().toISOString() // or provide a specific timestamp if needed
    });

if (error) console.error('Error adding custom message:', error);
else console.log('Custom message added:', data);



const { data, error } = await supabase
    .rpc('start_new_chat', {
        user_matrix_id: userId,
        system_message: 'System message here',
        user_message: 'User message here'
    });

if (error) console.error('Error starting new chat:', error);
else console.log('New chat started:', data);


const { data, error } = await supabase
    .rpc('clone_chat', {
        original_chat_id: specific_chat_id
    });

if (error) console.error('Error cloning chat:', error);
else console.log('Cloned chat:', data);

const { data, error } = await supabase
    .rpc('clone_and_edit_chat', {
        original_chat_id: specific_chat_id,
        edited_index: editedIndex,
        new_message: 'Edited message here',
        new_message_role: 'user' // or 'system', 'assistant', etc.
    });

if (error) console.error('Error cloning and editing chat:', error);
else console.log('Cloned and edited chat:', data);

*/
