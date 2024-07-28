import { Box, Button, Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

interface PowerPointViewerProps {
    file: string; // URL to the PowerPoint file (converted to images)
    slideCount: number;
}

const PowerPointViewer: React.FC<PowerPointViewerProps> = ({ file, slideCount }) => {
    const [currentSlide, setCurrentSlide] = useState(1);

    const nextSlide = () => {
        if (currentSlide < slideCount) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <Box>
            <Box style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                <img
                    src={`${file}/slide${currentSlide}.jpg`}
                    alt={`Slide ${currentSlide}`}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>
            <Group align="apart" mt="md">
                <Button onClick={prevSlide} disabled={currentSlide === 1} leftSection={<IconChevronLeft size={14} />}>
                    Previous
                </Button>
                <Text>
                    Slide {currentSlide} of {slideCount}
                </Text>
                <Button
                    onClick={nextSlide}
                    disabled={currentSlide === slideCount}
                    rightSection={<IconChevronRight size={14} />}
                >
                    Next
                </Button>
            </Group>
        </Box>
    );
};

export default PowerPointViewer;
