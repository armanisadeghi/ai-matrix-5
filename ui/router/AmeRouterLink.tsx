'use client';

import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { eventTriggerFamily } from '@/app/trials/nested/state/atoms';

interface AmeRouterLinkProps {
    uniqueId: string;
    startPath: string;
    linkTo: string;
    UrlQueryParams?: Record<string, string>;
    children: React.ReactNode;
    active?: boolean;
}

const AmeRouterLink = ({ uniqueId, startPath, linkTo, UrlQueryParams = {}, children, active = true }: AmeRouterLinkProps) => {
    const [eventTrigger, setEventTrigger] = useRecoilState(eventTriggerFamily(uniqueId));
    const router = useRouter();
    const query = new URLSearchParams(UrlQueryParams).toString();
    const link = `${startPath}/${encodeURIComponent(linkTo)}${query ? `?${query}` : ''}`;

    const handleProgrammaticNavigation = () => {
        if (active) {
            router.push(link);
        }
    };

    useEffect(() => {
        if (active && eventTrigger === 'triggerNavigation') {
            handleProgrammaticNavigation();
            setEventTrigger(null);
        }
    }, [eventTrigger, active, link, router, setEventTrigger]);

    if (!active) {
        return (
            <div style={{ cursor: 'not-allowed', opacity: 0.5 }}>
                {children}
            </div>
        );
    }

    return (
        <Link href={link}>
            <div style={{ cursor: 'pointer' }}>
                {children}
            </div>
        </Link>
    );
};

export default AmeRouterLink;
