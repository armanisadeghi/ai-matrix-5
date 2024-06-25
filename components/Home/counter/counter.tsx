import { Title, SimpleGrid, Text, Container, Grid } from '@mantine/core';
import classes from './counter.module.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';


interface IconCircleProps {
    title: string;
    description: string;
    index: number;
    /* category: string; */
}
  
function IconCircle({ title, description, index}: IconCircleProps) {  

    const elementsRef = useScrollAnimation(index * 200);

    return (
        <div className={classes.girdItem}>
            <div className="animate-on-scroll1" ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}>
                <div className={`${classes.gridCircle} `} >
                    <div className={`${classes.gridCircleInner}`} >
                        <svg width="100%" height="100%" viewBox="0 0 200 200">
                            <circle className={`${classes.clock} animate-clock`} cx="100" cy="100" r="98" ></circle>
                        </svg>
                    </div>
                </div>
                <div className={classes.itemImage}>
                    <img src="assets/images/icon-arrow-up.svg" alt="Arrow pointing up" className="anim-fade-in" style={{ opacity: 1 }} />
                </div>
            </div>
            
            <div className={`${classes.itemContent}`} >
                <Title mb={15} order={3} className={`${classes.innerTitle} animate-on-scroll`} ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}>
                    {title}
                </Title>
                <Text className={`${classes.innerDesc} animate-on-scroll`} ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}>
                    {description}
                </Text>
            </div>
        </div>
    );
}


const features = [
    {
        title: '70% Increase',
        description: 'In Drafting Speed',
    },
    {
        title: '85% Increase',
        description: 'In Productivity',
    },
    {
        title: '241% Increase',
        description: 'In Success Rates',
    },
    {
        title: '100% Increase ',
        description: 'In Bids Submitted',
    },
];

export function Counter() {
    const elementsRef = useScrollAnimation(250);

    const items = features.map((feature, index) => (
        
        <div key={index}>
            <IconCircle {...feature} index={index} />
        </div>
    ));

    return (
        <section className={classes.myCounter}>
            <Container className={classes.myContainer}>
                {/* <div className={classes.inner}>
                    <div className={classes.content}> */}
                        <div className={classes.wrapper}>
                            <Grid justify="center" align="center" className={classes.row}>
                                <Grid.Col span={{ xs: 12, sm: 5 }} className={classes.columnContentFirst} >
                                    <div className="animate-on-scroll" ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}>
                                        <Title className={classes.title} order={2} pb="0.4445em">
                                            A new way of bid writing
                                        </Title>
                                        <div className={classes.borderLine}></div>
                                    </div>
                                    
                                    <Text className={`${classes.text} animate-on-scroll`} ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}>
                                        Bid teams spend 80% of their time in the drafting stage with little scope to edit, enhance and elevate the quality of their work. Our world class engineers have dedicated over 50,000 hours to building software that allows you to spend more time on the activities that get you to a winning bid.
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, sm: 5 }} className={classes.columnContentSecond}>
                                    <SimpleGrid cols={{ xs: 2, sm: 2 }} className={classes.columnInner}>
                                        {items}
                                    </SimpleGrid>
                                </Grid.Col>
                            </Grid>
                        </div>
                    {/* </div>
                </div> */}
            </Container>
        </section>
    );
}
