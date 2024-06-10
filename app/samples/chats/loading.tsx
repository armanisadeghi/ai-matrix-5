'use client';

import { Grid, Loader, Skeleton, Container, SimpleGrid } from "@mantine/core";

const LoadingPage = () => {
    return (
        <SimpleGrid cols={1} spacing="xl" verticalSpacing="xl">
            <div>
                <Grid>
                    <Grid.Col span={4}></Grid.Col>
                    <Grid.Col span={4} style={{textAlign: 'center'}}>
                        <Loader size={50}/>
                        <Loader color="blue" size="xl" type="dots"/>
                        <Skeleton height={8} radius="xl"/>
                        <Skeleton height={8} radius="xl"/>
                        <Skeleton height={8} mt={6} radius="xl"/>
                        <Skeleton height={8} mt={6} radius="xl"/>
                        <Skeleton height={8} mt={6} radius="xl"/>
                        <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                        <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                        <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                    </Grid.Col>
                    <Grid.Col span={4}></Grid.Col>
                </Grid>

            </div>
        </SimpleGrid>

    );
};

export default LoadingPage;
