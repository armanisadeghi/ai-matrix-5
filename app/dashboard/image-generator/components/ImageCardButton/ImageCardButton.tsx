"use client";

import AmeButton from "@/ui/buttons/AmeButton";
import { Card, CardProps, Flex, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { StaticImageData } from "next/image";

import { HTMLAttributes } from "react";
import classes from "./ImageCardButton.module.css";

export type ImageCardButtonProps = CardProps & {
    title: string;
    description?: string;
    bgImageUrl: StaticImageData | string;
    buttonProps?: {
        btnTitle?: string;
        onClick?: HTMLAttributes<HTMLButtonElement>["onClick"];
        showBtnIcon?: boolean;
    };
};

export function ImageCardButton(props: ImageCardButtonProps) {
    const {
        bgImageUrl,
        buttonProps: { onClick, btnTitle, showBtnIcon },
        description,
        title,
    } = props;

    const handleClick = (evt) => {
        onClick(evt);
    };

    return (
        <Card p="md" shadow="md" className={classes.card} radius="md">
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${typeof bgImageUrl === "object" ? bgImageUrl.src : bgImageUrl})`,
                }}
            />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <Flex direction="column" gap="xs">
                    <Text size="lg" className={classes.title} fw={500}>
                        {title}
                    </Text>
                    <Text size="sm" className={classes.author}>
                        {description}
                    </Text>
                </Flex>

                <AmeButton
                    title={btnTitle}
                    rightSection={showBtnIcon ? <IconArrowRight size={18} /> : <></>}
                    variant="white"
                    size="sm"
                    onClick={handleClick}
                >
                    {btnTitle}
                </AmeButton>
            </div>
        </Card>
    );
}
