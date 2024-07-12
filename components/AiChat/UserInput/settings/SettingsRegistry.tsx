// chat-app/nice-working/settings/SettingsRegistry.tsx

import SimpleChatSettingsModal from './SimpleChatSettingsModal';
// import PlaygroundChatSettings from './playgroundChatSettings';
// import BusinessChatSettings from './businessChatSettings';
// import SidebarChatSettings from './sidebarChatSettings';
// import CustomChatSettings from './customChatSettings';
// import MatrixAppsChatSettings from './matrixAppsChatSettings';
 import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';

const settingsComponents = {
    simpleChat: SimpleChatSettingsModal,
    // playground: PlaygroundChatSettings,
    // business: BusinessChatSettings,
    // sidebar: SidebarChatSettings,
    // custom: CustomChatSettings,
    // matrixApps: MatrixAppsChatSettings,
};

export default settingsComponents;
