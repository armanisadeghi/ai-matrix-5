"use client";

import { useState } from "react";
import { Terminal } from "./tabs/Terminal";

export const Footer = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabData = [
        { id: 0, title: "Problems", content: "No problems have been detected in the workspace." },
        { id: 1, title: "Output", content: "No output have been detected in the workspace." },
        { id: 2, title: "Terminal", content: <Terminal /> },
        { id: 2, title: "Ports", content: "No ports have been detected in the workspace." },
        { id: 2, title: "Debug Console", content: "No debug console have been detected in the workspace." },
    ];
    return (
        <>
            <div className="w-full mx-auto mt-2 min-h-48 bg-neutral-900">
                {/* Tabs navigation */}
                <div className="flex border-b-2 border-neutral-700 mb-2.5">
                    {tabData.map((tab, index) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 font-normal text-sm transition-colors rounded-t ${
                                activeTab === index
                                    ? "border-b-2 border-neutral-100 text-neutral-100 font-semibold"
                                    : "text-neutral-100 hover:text-neutral-100 hover:bg-neutral-700"
                            }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Tabs content */}
                <div className="rounded">
                    <p className="text-sm">{tabData[activeTab].content}</p>
                </div>
            </div>
        </>
    );
};
