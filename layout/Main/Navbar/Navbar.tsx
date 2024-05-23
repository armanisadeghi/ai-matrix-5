import {rem, ScrollArea, Stack, TextInput} from '@mantine/core';
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
    IconSearch,
    IconSettings,
    IconSettingsCog,
    IconTools,
} from '@tabler/icons-react';
import {CollapseNavLinks, LinksGroup} from '@/components';

import classes from './Navbar.module.css';
import {UserButton} from '@/components/UserButton';
import {PATH_INTELLIGENCE, PATH_MATRIX} from "@/routes";
import {ReactElement} from "react";

const navItems = [
    {
        label: 'Intelligence',
        icon: IconGauge,
        links: [
            {label: 'AI Chat', link: PATH_INTELLIGENCE.chatbot},
            {label: 'Custom Bots', link: '/'},
            {label: 'Bot Builder', link: '/'},
        ],
    },
    {
        label: 'AI Apps',
        icon: IconAi,
        links: [
            {label: 'Legal', link: '/'},
            {label: 'Medical', link: '/'},
            {label: 'Marketing', link: '/'},
            {label: 'SEO', link: '/'},
            {label: 'Kids', link: '/'},
            {label: 'School', link: '/'},
            {label: 'Fun', link: '/'},
            {label: 'Image', link: '/'},
            {label: 'Video', link: '/'},
            {label: 'Others', link: '/'},
        ],
    },
    {
        label: 'Productivity',
        icon: IconCalendarStats,
        links: [
            {label: 'Messenger', link: '/'},
            {label: 'Email', link: '/'},
            {label: 'Task Manager', link: '/'},
            {label: 'Calendar', link: '/'},
            {label: 'Meetings', link: '/'},
        ],
    },
    {
        label: 'Tools',
        icon: IconTools,
        links: [
            {label: 'Audio', link: '/'},
            {label: 'Image', link: '/'},
            {label: 'Video', link: '/'},
            {label: 'PDF', link: '/'},
            {label: 'Text', link: '/'},
            {label: 'Web', link: '/'},
            {label: 'Writing', link: '/'},
            {label: 'Marketing', link: '/'},
            {label: 'SEO', link: '/'},
        ],
    },
    {
        label: 'Integrations',
        icon: IconLayersIntersect,
        links: [
            {label: 'Shopify', link: '/'},
            {label: 'Wordpress', link: '/'},
            {label: 'Zappier', link: '/'},
            {label: 'Google', link: '/'},
            {label: 'Microsoft', link: '/'},
            {label: 'GitHub', link: '/'},
        ],
    },
    {
        label: 'Matrix Engine',
        icon: IconGrid3x3,
        links: [
            {label: 'Prompt Playground', link: '/'},
            {label: 'Agents', link: '/'},
            {label: 'Super Agents', link: '/'},
            {label: 'Recipes', link: '/'},
            {label: 'Tools', link: '/'},
            {label: 'Knowledge', link: '/'},
            {label: 'System Brokers', link: '/'},
            {label: 'Custom Brokers', link: '/'},
        ],
    },
    {
        label: 'Automation Matrix',
        icon: IconAutomation,
        links: [
            {label: 'Actions', link: '/'},
            {label: 'Tasks', link: '/'},
            {label: 'Clusters', link: '/'},
            {label: 'Hyperclustures', link: '/'},
            {label: 'Automation', link: '/'},
        ],
    },
    {
        label: 'Matrix Apps',
        icon: IconGrid4x4,
        links: [
            {label: 'App Builder', link: PATH_MATRIX.build},
            {label: 'App Tester', link: '/'},
            {label: 'App Components', link: '/'},
        ],
    },
    {
        label: 'Analytics',
        icon: IconPresentationAnalytics,
        links: [
            {label: 'Google Analytics', link: '/'},
            {label: 'Google Search Console', link: '/'},
            {label: 'Social Media', link: '/'},
            {label: 'AI Matrix Stats', link: '/'},
        ],
    },
    {
        label: 'Agency Manager',
        icon: IconCurrency,
        links: [
            {label: 'Manage Clients', link: '/'},
            {label: 'Manage Users', link: '/'},
            {label: 'Agency Settings', link: '/'},
            {label: 'Secrets Manager', link: '/'},
        ],
    },
    {
        label: 'Admin',
        icon: IconSettings,
        links: [
            {label: 'Agencies', link: '/'},
            {label: 'Clients', link: '/'},
            {label: 'Users', link: '/'},
            {label: 'Configuration', link: '/'},
        ],
    },
    {
        label: 'Super Admin',
        icon: IconSettingsCog,
        links: [
            {label: 'Function Manager', link: '/'},
            {label: 'System Apps', link: '/'},
            {label: 'Access Management', link: '/'},
        ],
    },
];

interface NavbarProps {
    desktopOpened?: boolean
    tabletOpened?: boolean
    mobileOpened?: boolean
}

// TODO: Kevin - I made changes to make the navbar smaller, but we need to control the break points now
// Ideally, we should have the big one for the dashboard, but this smaller one for the inner pages.
// Also, we should have it first get tighter (less space and smaller text maybe. (truncate long text)
// Then, it should only show the icons and then it should go away.

export function Navbar(props: NavbarProps): ReactElement {
    const { tabletOpened, mobileOpened} = props
    const links = navItems.map((item) => {
        return (tabletOpened && mobileOpened) ?
            <CollapseNavLinks {...item} key={item.label}/> : <LinksGroup {...item} key={item.label}/>
    });

    return (
        <>
            <div>
                <TextInput
                    placeholder="Search"
                    size="xs"
                    leftSection={<IconSearch style={{width: rem(16), height: rem(16)}}
                                             stroke={1.5}/>} // Correct usage of CSS in JS
                    rightSectionWidth={70}
                    mb="sm"
                    styles={{section: {pointerEvents: 'none'}}}
                />
            </div>

            <ScrollArea className={classes.links}>
                {(tabletOpened && mobileOpened) ? <Stack align="center">{links}</Stack> :
                    <div>{links}</div>}
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton collapsed={tabletOpened && mobileOpened}/>
            </div>
        </>
    );
}
