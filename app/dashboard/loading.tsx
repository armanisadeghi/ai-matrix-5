'use client';

import { Grid, Loader, Skeleton, Container, SimpleGrid, LoadingOverlay, Box } from "@mantine/core";

const LoadingPage = () => {
    return (
        <div className="page-layout">
            <Box pos="relative">
                <LoadingOverlay
                    visible={true}
                    zIndex={1000}
                    overlayProps={{radius: 'sm', blur: 2}}
                    loaderProps={{color: 'pink', type: 'bars'}}
                />
                {/* ...other content */}
            </Box>
        </div>

    );
};

export default LoadingPage;

/*
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
                        <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                        <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                    </Grid.Col>
                    <Grid.Col span={4}></Grid.Col>
                </Grid>

            </div>
        </SimpleGrid>

 */