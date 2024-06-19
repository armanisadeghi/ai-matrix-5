import React, { useEffect } from 'react'
import { MatrixMessage, MessageEntry, Role } from '@/types/chat'
import { OpenAiStream } from '@/app/api/openai/route'
import { useRecoilState } from 'recoil'
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from '@/state/aiAtoms/chatAtoms'

const StreamOpenai: React.FC = () => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom)
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(
        activeChatMessagesArrayAtom
    )
    console.log(
        'app/samples/chats/hooks/OpenAiStreamComponent.tsx StreamOpenai activeChatMessagesArray:',
        activeChatMessagesArray
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messages = activeChatMessagesArray.map((chat) => ({
                    role: chat.role as 'system' | 'user' | 'assistant',
                    content: chat.text
                }))

                let assistantMessage: string = ''

                await OpenAiStream(messages, (chunk) => {
                    console.log('Chunk:', chunk)
                    assistantMessage += chunk
                    console.log('Assistant message:', assistantMessage)
                    setAssistantTextStream(assistantMessage)
                })

                const fullResponse: MatrixMessage = {
                    index: activeChatMessagesArray.length, // Calculate the next available index
                    role: 'assistant' as Role,
                    text: assistantMessage
                }

                const updatedArray = [...activeChatMessagesArray, fullResponse]
                setActiveChatMessagesArray(updatedArray)
            } catch (error) {
                console.error('Error during OpenAI stream:', error)
            }
        }

        fetchData()
    }, [activeChatMessagesArray, setAssistantTextStream, setActiveChatMessagesArray])

    return null
}

export default StreamOpenai
