// matrix-apps/page.tsx
"use client";

import React from "react";
import { Text, Title } from "@mantine/core";
import classes from "@/components/HomePage/Home.module.css";

const SampleHomePage = () => {
    return (
        <>
            <Title className={classes.title} ta="center" mt={100}>
                The Only No-Code{' '}
                <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                    Artificial Intelligence Business Automation Framework.
                </Text>
            </Title>
            <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
                AI Matrix bridges the gap between current AI capabilities
                and your real-world business{' '}
            </Text>

        </>
  );
};

export default SampleHomePage;
