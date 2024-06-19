// chat-app/nice-working/settings/ChatSettings.tsx
'use client'

import React, { useContext } from 'react'
import settingsComponents from './SettingsRegistry'
import { SettingsContext } from '@/context/AiContext/SettingsContext'
import type { ChatSettings } from '@/types/settings'

const ChatSettings = () => {
    const { settings, updateSettings } = useContext(SettingsContext)

    // This should be dynamically determined based on the chat type, but currently hard-coded for ease of use.
    const chatType = 'simpleChat'

    const SettingsComponent = settingsComponents[chatType]

    const handleChange = (field: keyof ChatSettings, value: boolean | string) => {
        const updatedChatSettings = { ...settings.chatSettings, [field]: value }
        updateSettings({ chatSettings: updatedChatSettings })
    }

    const handleSubmit = () => {
        // Logic needs to be added here to handle the submit action
    }

    if (!SettingsComponent) {
        return <div>No settings available for this chat type.</div>
    }

    return (
        <SettingsComponent
            settings={settings.chatSettings}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    )
}

export default ChatSettings
