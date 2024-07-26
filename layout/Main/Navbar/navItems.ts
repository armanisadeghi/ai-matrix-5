// layout/Main/Navbar/navItems.ts

import {
    IconAi,
    IconAutomation,
    IconCalendarStats, IconCurrency,
    IconGauge,
    IconGrid3x3, IconGrid4x4,
    IconLayersIntersect, IconPresentationAnalytics, IconSettings, IconSettingsCog,
    IconTools
} from "@tabler/icons-react";
import { GrTest } from "react-icons/gr";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { SiKnowledgebase } from "react-icons/si";
import { SiMusicbrainz } from "react-icons/si";


import { PATH_ADMIN, PATH_AGENCY } from "@/routes";

export const navItems = [
    {
        label: "Intelligence",
        icon: SiMusicbrainz,
        initiallyOpened: false,
        links: [
            {
                label: "AI Chat",
                link: "/dashboard/intelligence/ai-chat"
            },
            {
                label: "Custom Bots",
                link: "/dashboard/intelligence/ai-chat/custom"
            },
            {
                label: "Bot Builder",
                link: "/dashboard/intelligence/ai-chat/build"
            },
        ],
    },
    {
        label: "AI Apps",
        icon: IconAi,
        links: [
            {
                label: "Legal",
                link: "/dashboard"
            },
            {
                label: "Medical",
                link: "/dashboard"
            },
            {
                label: "Marketing",
                link: "/dashboard"
            },
            {
                label: "SEO",
                link: "/dashboard"
            },
            {
                label: "Kids",
                link: "/dashboard"
            },
            {
                label: "School",
                link: "/dashboard"
            },
            {
                label: "Fun",
                link: "/dashboard"
            },
            {
                label: "Image",
                link: "/dashboard"
            },
            {
                label: "Video",
                link: "/dashboard"
            },
            {
                label: "Others",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Productivity",
        icon: IconCalendarStats,
        links: [
            {
                label: "Messenger",
                link: "/dashboard"
            },
            {
                label: "Email",
                link: "/dashboard"
            },
            {
                label: "Task Manager",
                link: "/dashboard"
            },
            {
                label: "Calendar",
                link: "/dashboard"
            },
            {
                label: "Meetings",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Knowledge Base",
        icon: SiKnowledgebase,
        links: [
            {
                label: "File Manager",
                link: "/samples/suites/file-suite"
            },
            {
                label: "PDF",
                link: "/samples/suites/pdf-suite"
            },
            {
                label: "Text",
                link: "/samples/suites/text-suite"
            },
            {
                label: "Audio",
                link: "/samples/suites/audio-suite"
            },
            {
                label: "Image",
                link: "/samples/suites/image-suite"
            },
            {
                label: "Video",
                link: "/samples/suites/video-suite"
            },
            {
                label: "Slides",
                link: "/samples/suites/slide-suite"
            },
            {
                label: "Spreadsheets",
                link: "/samples/suites/spreadsheet-suite"
            },
            {
                label: "Web Pages",
                link: "/samples/suites/web-suite"
            },
        ],
    },
    {
        label: "Tools",
        icon: IconTools,
        links: [
            {
                label: "Writing",
                link: "/dashboard"
            },
            {
                label: "Marketing",
                link: "/dashboard"
            },
            {
                label: "SEO",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Integrations",
        icon: IconLayersIntersect,
        links: [
            {
                label: "Shopify",
                link: "/dashboard"
            },
            {
                label: "Wordpress",
                link: "/dashboard"
            },
            {
                label: "Zappier",
                link: "/dashboard"
            },
            {
                label: "Google",
                link: "/dashboard"
            },
            {
                label: "Microsoft",
                link: "/dashboard"
            },
            {
                label: "GitHub",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Matrix Engine",
        icon: IconGrid3x3,
        links: [
            {
                label: "Prompt Playground",
                link: "/dashboard"
            },
            {
                label: "Agents",
                link: "/dashboard"
            },
            {
                label: "Super Agents",
                link: "/dashboard"
            },
            {
                label: "Recipes",
                link: "/dashboard"
            },
            {
                label: "Tools",
                link: "/dashboard"
            },
            {
                label: "Knowledge",
                link: "/dashboard"
            },
            {
                label: "System Brokers",
                link: "/dashboard"
            },
            {
                label: "Custom Brokers",
                link: "/dashboard/matrix-engine/custom-brokers"
            },
        ],
    },
    {
        label: "Automation Matrix",
        icon: IconAutomation,
        links: [
            {
                label: "Actions",
                link: "/dashboard"
            },
            {
                label: "Tasks",
                link: "/dashboard"
            },
            {
                label: "Clusters",
                link: "/dashboard"
            },
            {
                label: "Hyperclustures",
                link: "/dashboard"
            },
            {
                label: "Automation",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Matrix Apps",
        icon: IconGrid4x4,
        links: [
            {
                label: "App Builder",
                link: "/dashboard/matrix-apps/build/"
            },
            {
                label: "App Tester",
                link: "/dashboard"
            },
            {
                label: "App Components",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Analytics",
        icon: IconPresentationAnalytics,
        links: [
            {
                label: "Google Analytics",
                link: "/dashboard"
            },
            {
                label: "Google Search Console",
                link: "/dashboard"
            },
            {
                label: "Social Media",
                link: "/dashboard"
            },
            {
                label: "AI Matrix Stats",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Agency Manager",
        icon: IconCurrency,
        links: [
            {
                label: "Manage Clients",
                link: PATH_AGENCY.clients.root
            },
            {
                label: "Manage Users",
                link: "/dashboard"
            },
            {
                label: "Agency Settings",
                link: "/dashboard"
            },
            {
                label: "Secrets Manager",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Admin",
        icon: IconSettings,
        links: [
            {
                label: "Agencies",
                link: PATH_ADMIN.clients.root
            },
            {
                label: "Clients",
                link: "/dashboard"
            },
            {
                label: "Users",
                link: "/dashboard"
            },
            {
                label: "Configuration",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Super Admin",
        icon: IconSettingsCog,
        links: [
            {
                label: "Function Manager",
                link: "/dashboard"
            },
            {
                label: "System Apps",
                link: "/dashboard"
            },
            {
                label: "Access Management",
                link: "/dashboard"
            },
        ],
    },
    {
        label: "Samples",
        icon: VscWorkspaceTrusted,
        initiallyOpened: false,
        links: [
            {
                "label": "Socket Test",
                "link": "/samples/socket-test"
            },
            {
                "label": "Atom tester",
                "link": "/samples/atom-tester"
            },
            {
                "label": "Center content",
                "link": "/samples/center-content"
            },
            {
                "label": "Chats",
                "link": "/samples/chats"
            },
            {
                "label": "Code highlight",
                "link": "/samples/code-highlight"
            },
            {
                "label": "Contrast",
                "link": "/samples/code-highlight/contrast"
            },
            {
                "label": "Tabs",
                "link": "/samples/code-highlight/tabs"
            },
            {
                "label": "Component tester",
                "link": "/samples/component-tester"
            },
            {
                "label": "Css tests",
                "link": "/samples/css-tests"
            },
            {
                "label": "Dependency selects",
                "link": "/samples/dependency-selects"
            },
            {
                "label": "Dynamic textarea",
                "link": "/samples/dynamic-textarea"
            },
            {
                "label": "Textarea",
                "link": "/samples/dynamic-textarea/textarea"
            },
            {
                "label": "Editor",
                "link": "/samples/editor"
            },
            {
                "label": "With content",
                "link": "/samples/editor/with-content"
            },
            {
                "label": "Fancy text",
                "link": "/samples/fancy-text"
            },
            {
                "label": "Grid layout",
                "link": "/samples/grid-layout"
            },
            {
                "label": "Home",
                "link": "/samples/home"
            },
            {
                "label": "Json utils",
                "link": "/samples/json-utils"
            },
            {
                "label": "Layout controller",
                "link": "/samples/layout-controller"
            },
            {
                "label": "Animation",
                "link": "/samples/layout-controller/Animation"
            },
            {
                "label": "Markdown",
                "link": "/samples/markdown"
            },
            {
                "label": "Matrix events",
                "link": "/samples/matrix-events"
            },
            {
                "label": "Progress slider",
                "link": "/samples/progress-slider"
            },
            {
                "label": "Redis sample",
                "link": "/samples/redis-sample"
            },
            {
                "label": "Right click",
                "link": "/samples/right-click"
            },
            {
                "label": "Module",
                "link": "/samples/right-click/module"
            },
            {
                "label": "Submodule",
                "link": "/samples/right-click/module/submodule"
            },
            {
                "label": "Supabase",
                "link": "/samples/supabase"
            },
            {
                "label": "New db",
                "link": "/samples/supabase/new-db"
            },
            {
                "label": "Tree view",
                "link": "/samples/tree-view"
            },
            {
                "label": "Vertical split",
                "link": "/samples/vertical-split"
            },
            {
                "label": "Dual split",
                "link": "/samples/vertical-split/dual-split"
            },
            {
                "label": "Horizontal splitter",
                "link": "/samples/vertical-split/horizontal-splitter"
            }
        ],
    },
    {
        label: "Trials",
        icon: GrTest,
        initiallyOpened: false,
        links: [
            {
                "label": "All in one",
                "link": "/trials/all-in-one"
            },
            {
                "label": "Chat cache",
                "link": "/trials/chat-cache"
            },
            {
                "label": "Core chat trial",
                "link": "/trials/core-chat-trial"
            },
            {
                "label": "Crud",
                "link": "/trials/crud"
            },
            {
                "label": "Crud trials",
                "link": "/trials/crud-trials"
            },
            {
                "label": "Grids",
                "link": "/trials/grids"
            },
            {
                "label": "Features",
                "link": "/trials/grids/features"
            },
            {
                "label": "Nested",
                "link": "/trials/nested"
            },
            {
                "label": "Next related",
                "link": "/trials/next-related"
            },
            {
                "label": "Quick test",
                "link": "/trials/quick-test"
            },
            {
                "label": "Atom tester",
                "link": "/trials/recoil/atom-tester"
            },
            {
                "label": "Callback trial",
                "link": "/trials/recoil/callback-trial"
            },
            {
                "label": "Chat v43",
                "link": "/trials/recoil/chat-v43"
            },
            {
                "label": "Components",
                "link": "/trials/recoil/chat-v43/components"
            },
            {
                "label": "Destructuring",
                "link": "/trials/recoil/destructuring"
            },
            {
                "label": "Loadable trial",
                "link": "/trials/recoil/loadable-trial"
            },
            {
                "label": "Local",
                "link": "/trials/recoil/local"
            },
            {
                "label": "Splitters",
                "link": "/trials/splitters"
            },
            {
                "label": "Dual",
                "link": "/trials/splitters/dual"
            },
            {
                "label": "Horizontal",
                "link": "/trials/splitters/horizontal"
            },
            {
                "label": "Vertical",
                "link": "/trials/splitters/vertical"
            },
            {
                "label": "Stream encapsulated",
                "link": "/trials/stream-encapsulated"
            },
            {
                "label": "Stream tester",
                "link": "/trials/stream-tester"
            },
            {
                "label": "Text classification",
                "link": "/trials/text-classification"
            }
        ],
    },

];
