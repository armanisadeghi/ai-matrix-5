import { Image } from '@mantine/core';

interface BrokerImageProps {
    src: string;
    alt?: string;
    w?: number | "auto";
    h?: number | "auto";
    radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
    fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

export const BrokerImage = ({ src, alt, w, h, radius, fit }: BrokerImageProps) => {
    return (
        <Image
            radius={radius}
            w={w}
            h={h}
            fit={fit}
            src={src}
            alt={alt}
        />
    );
}