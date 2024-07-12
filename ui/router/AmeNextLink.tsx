'use client';

import Link from 'next/link';

interface AmeRouterLinkLightProps {
    startPath: string;
    linkTo: string;
    UrlQueryParams?: Record<string, string>;
    children: React.ReactNode;
    active?: boolean;
}

const AmeNextLink = ({ startPath, linkTo, UrlQueryParams = {}, children, active = true }: AmeRouterLinkLightProps) => {
    const query = new URLSearchParams(UrlQueryParams).toString();
    const link = `${startPath}/${encodeURIComponent(linkTo)}${query ? `?${query}` : ''}`;

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

export default AmeNextLink;
