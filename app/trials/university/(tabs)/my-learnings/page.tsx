import AmeTitle from "@/ui/typography/AmeTitle";
import { SimpleGrid, Stack } from "@mantine/core";
import { CourseCard } from "../../components";
import AmePaper from "@/ui/surfaces/AmePaper";
import { IconHourglassEmpty } from "@tabler/icons-react";
import AmeText from "@/ui/typography/AmeText";
import AmeButton from "@/ui/buttons/AmeButton";

const data = [
    {
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best forests to visit in North America",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Hawaii beaches review: better than you think",
        category: "beach",
    },
    {
        image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Mountains at night: 12 best locations to enjoy the view",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Aurora in Norway: when to visit for best experience",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best places to visit this winter",
        category: "tourism",
    },
    {
        image: "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Active volcanos reviews: travel at your own risk",
        category: "nature",
    },
];

export default function MyLearningPage() {
    return (
        <div>
            <AmeTitle mb="md">Stay on top of your learning! </AmeTitle>

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={{ base: 10, sm: "sm", md: "md", lg: "lg" }}
                verticalSpacing={{ base: "md", sm: "xl" }}
            >
                {data.map((item) => (
                    <CourseCard key={item.title} {...item} />
                ))}
            </SimpleGrid>
        </div>
    );
}
