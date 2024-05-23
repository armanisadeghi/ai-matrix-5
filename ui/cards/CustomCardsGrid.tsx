import { SimpleGrid } from '@mantine/core';
import { CustomCard, CardProps } from './CustomCard';

interface CardsGridProps {
    cardsData: CardProps[];
}

function CardsGrid({ cardsData }: CardsGridProps) {
    return (
        <SimpleGrid
            cols={{ xs: 1, sm: 2, md: 3 }} spacing="lg">
            {cardsData.map((card, index) => (
                <CustomCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    badgeText={card.badgeText}
                    link={card.link}
                />
            ))}
        </SimpleGrid>
    );
}

export default CardsGrid;
