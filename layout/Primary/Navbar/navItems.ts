// layout/Primary/Navbar/navItems.ts

import {
    IconAi,
    IconAutomation,
    IconCalendarStats,
    IconCurrency,
    IconGauge,
    IconGrid3x3,
    IconGrid4x4,
    IconLayersIntersect,
    IconPresentationAnalytics,
    IconSettings,
    IconSettingsCog,
    IconTools
} from "@tabler/icons-react";
import { PATH_ADMIN, PATH_AGENCY } from "@/routes";

export interface NavLink {
    label: string;
    link: string;
}

export interface NavItem {
    label: string;
    icon: React.ElementType;
    initiallyOpened?: boolean;
    links: NavLink[];
}

export const navItems: NavItem[] = [
    {
        label: "Intelligence",
        icon: IconGauge,
        initiallyOpened: false,
        links: [
            {
                label: "AI Chat",
                link: "dashboard/intelligence/ai-chat"
            },
            {
                label: "Custom Bots",
                link: "dashboard/intelligence/ai-chat/custom"
            },
            {
                label: "Bot Builder",
                link: "dashboard/intelligence/ai-chat/build"
            },
        ],
    },
    {
        label: "AI Apps",
        icon: IconAi,
        links: [
            {
                label: "Legal",
                link: "/"
            },
            {
                label: "Medical",
                link: "/"
            },
            {
                label: "Marketing",
                link: "/"
            },
            {
                label: "SEO",
                link: "/"
            },
            {
                label: "Kids",
                link: "/"
            },
            {
                label: "School",
                link: "/"
            },
            {
                label: "Fun",
                link: "/"
            },
            {
                label: "Image",
                link: "/"
            },
            {
                label: "Video",
                link: "/"
            },
            {
                label: "Others",
                link: "/"
            },
        ],
    },
    {
        label: "Productivity",
        icon: IconCalendarStats,
        links: [
            {
                label: "Messenger",
                link: "/"
            },
            {
                label: "Email",
                link: "/"
            },
            {
                label: "Task Manager",
                link: "/"
            },
            {
                label: "Calendar",
                link: "/"
            },
            {
                label: "Meetings",
                link: "/"
            },
        ],
    },
    {
        label: "Tools",
        icon: IconTools,
        links: [
            {
                label: "Audio",
                link: "/"
            },
            {
                label: "Image",
                link: "/"
            },
            {
                label: "Video",
                link: "/"
            },
            {
                label: "PDF",
                link: "/"
            },
            {
                label: "Text",
                link: "/"
            },
            {
                label: "Web",
                link: "/"
            },
            {
                label: "Writing",
                link: "/"
            },
            {
                label: "Marketing",
                link: "/"
            },
            {
                label: "SEO",
                link: "/"
            },
        ],
    },
    {
        label: "Integrations",
        icon: IconLayersIntersect,
        links: [
            {
                label: "Shopify",
                link: "/"
            },
            {
                label: "Wordpress",
                link: "/"
            },
            {
                label: "Zappier",
                link: "/"
            },
            {
                label: "Google",
                link: "/"
            },
            {
                label: "Microsoft",
                link: "/"
            },
            {
                label: "GitHub",
                link: "/"
            },
        ],
    },
    {
        label: "Matrix Engine",
        icon: IconGrid3x3,
        links: [
            {
                label: "Prompt Playground",
                link: "/"
            },
            {
                label: "Agents",
                link: "/"
            },
            {
                label: "Super Agents",
                link: "/"
            },
            {
                label: "Recipes",
                link: "/"
            },
            {
                label: "Tools",
                link: "/"
            },
            {
                label: "Knowledge",
                link: "/"
            },
            {
                label: "System Brokers",
                link: "/"
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
                link: "/"
            },
            {
                label: "Tasks",
                link: "/"
            },
            {
                label: "Clusters",
                link: "/"
            },
            {
                label: "Hyperclustures",
                link: "/"
            },
            {
                label: "Automation",
                link: "/"
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
                link: "/"
            },
            {
                label: "App Components",
                link: "/"
            },
        ],
    },
    {
        label: "Analytics",
        icon: IconPresentationAnalytics,
        links: [
            {
                label: "Google Analytics",
                link: "/"
            },
            {
                label: "Google Search Console",
                link: "/"
            },
            {
                label: "Social Media",
                link: "/"
            },
            {
                label: "AI Matrix Stats",
                link: "/"
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
                link: "/"
            },
            {
                label: "Agency Settings",
                link: "/"
            },
            {
                label: "Secrets Manager",
                link: "/"
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
                link: "/"
            },
            {
                label: "Users",
                link: "/"
            },
            {
                label: "Configuration",
                link: "/"
            },
        ],
    },
    {
        label: "Super Admin",
        icon: IconSettingsCog,
        links: [
            {
                label: "Function Manager",
                link: "/"
            },
            {
                label: "System Apps",
                link: "/"
            },
            {
                label: "Access Management",
                link: "/"
            },
        ],
    },
];
