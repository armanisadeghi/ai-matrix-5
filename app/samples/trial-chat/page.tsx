// app/samples/trial-chat/page.tsx
"use client";

import React from "react";
import AtomPage from "@/app/samples/ai-tests/shared/chatAtoms";
import ChatComponent from "@/app/samples/trial-chat/SimpleChatPage";

const SampleParentPage = () => {
    return (
        <div>
            <ChatComponent/>

            <AtomPage/>
        </div>
    );
};

export default SampleParentPage;

/*
import ChatStateInitializer from "@/app/samples/trial-chat/components/ChatStateInitializer";
<ChatStateInitializer />

 */

/*

import ChatComponent from "@/app/samples/trial-chat/components/TrialChat";
      <ChatComponent />

 */

/*
import AtomPage from "@/app/samples/trial-chat/components/atom-3";
        <AtomPage />

 */