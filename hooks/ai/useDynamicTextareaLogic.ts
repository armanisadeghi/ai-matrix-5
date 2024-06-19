import { useState, useRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { activeChatMessagesArrayAtom, userTextInputAtom } from '@/state/aiAtoms/chatAtoms'
import { MatrixMessage, MessageEntry } from '@/types/chat'
import { useChatDbAtoms } from '@/hooks/ai/useChatDbAtoms'

const useDynamicTextareaLogic = () => {
    const [userInput, setUserInput] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom)
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(
        activeChatMessagesArrayAtom
    )
    const [streamTrigger, setStreamTrigger] = useState(false)
    const { pushUpdatedArrayToDb } = useChatDbAtoms()

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value)
    }

    const handleSendMessage = async (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
        const text = textareaRef.current?.value || ''

        setUserTextInput(text.trim())

        if (userTextInput) {
            const newUserMessage: MatrixMessage = {
                index: activeChatMessagesArray.length,
                role: 'user',
                text: userTextInput
            }

            const updatedMessages = [...activeChatMessagesArray, newUserMessage]
            setActiveChatMessagesArray(updatedMessages)

            handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>)
            textareaRef.current?.focus()

            setStreamTrigger(true)

            await pushUpdatedArrayToDb()
        }
    }

    return {
        userInput,
        handleInputChange,
        handleSendMessage,
        textareaRef,
        streamTrigger,
        setStreamTrigger
    }
}

export default useDynamicTextareaLogic
