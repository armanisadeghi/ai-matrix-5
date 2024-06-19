import { Image } from '@mantine/core'

interface BrokerImageProps {
    src: string
    alt?: string
    w?: number | 'auto'
    h?: number | 'auto'
    radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    onChange?: (value: File | null) => void
}

export const BrokerImage = ({ src, alt, w, h, radius, fit, onChange }: BrokerImageProps) => {
    return (
        <Image
            radius={radius}
            w={w}
            h={h}
            fit={fit}
            src={src}
            alt={alt}
            onChange={() => onChange}
        />
    )
}
