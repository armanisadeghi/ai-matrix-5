import { Container, Title, Grid, Anchor, Text } from "@mantine/core";
import { IconBrandLinkedin } from "@tabler/icons-react";
import classes from "./Footer.module.css";

export function Footer() {
    return (
        <>
            <aside className={classes.siteFooter}>
                <Container className={classes.myContainer}>
                    <div className={classes.row}>
                        <Grid justify="center" align="start" className={classes.rowGrid}>
                            <Grid.Col span={{ xs: 12, sm: 6 }} className={classes.footerLinks}>
                                <nav className={classes.navFooter}>
                                    <Title className={classes.navTitle} order={4}>
                                        Content
                                    </Title>
                                    <ul>
                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Articles</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#" target="_blank">
                                                Security
                                            </Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">About Us</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Careers</Anchor>
                                        </li>
                                    </ul>
                                </nav>
                                <nav className={classes.navFooter}>
                                    <Title className={classes.navTitle} order={4}>
                                        Legal
                                    </Title>
                                    <ul>
                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Privacy Policy</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Usage Policy</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Cookie Policy</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Application Cookie Policy</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Customer T&amp;Cs</Anchor>
                                        </li>

                                        <li className={classes.menuItem}>
                                            <Anchor href="#">Application T&amp;Cs</Anchor>
                                        </li>
                                    </ul>
                                </nav>
                            </Grid.Col>
                            <Grid.Col span={{ xs: 12, sm: 6 }} className={classes.footerContact}>
                                <ul className={classes.footerSocials}>
                                    <li>
                                        <Anchor
                                            href="#"
                                            target="_blank"
                                            title="LinkedIn"
                                            className={classes.brandsLinkidin}
                                        >
                                            {/* <i className="fab fa-linkedin-in" aria-hidden="true"></i> */}
                                            <IconBrandLinkedin />
                                        </Anchor>
                                    </li>
                                    <li>
                                        <Anchor href="#" target="_blank" title="X-Twitter" className={classes.brandsX}>
                                            <svg
                                                data-name="Group 268"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 41.597 37.643"
                                            >
                                                <defs>
                                                    <clipPath id="a">
                                                        <path
                                                            data-name="Rectangle 116"
                                                            fill="currentColor"
                                                            d="M0 0h41.597v37.643H0z"
                                                        ></path>
                                                    </clipPath>
                                                </defs>
                                                <g data-name="Group 267" clipPath="url(#a)">
                                                    <path
                                                        data-name="Path 168"
                                                        d="M0 37.523c.891-.973 1.723-1.9 2.577-2.81Q7.334 29.651 12.1 24.6c.9-.955 1.769-1.936 2.679-2.88a.558.558 0 0 0 .042-.861q-4.2-5.825-8.371-11.67Q3.278 4.753.114.311A1.578 1.578 0 0 1 .016.1 1.988 1.988 0 0 1 .4.017C5.012.011 9.626.013 14.239 0a.964.964 0 0 1 .882.466q4.033 5.686 8.093 11.353c.089.125.2.235.346.407.653-.689 1.28-1.343 1.9-2q3.767-4.027 7.53-8.058C33.532 1.582 34.051.98 34.6.407a1.022 1.022 0 0 1 .578-.364c1.684-.029 3.368-.016 5.148.121L25.9 15.581l15.7 22.056h-1.4c-4.236 0-8.472-.011-12.708.007a1.172 1.172 0 0 1-1.08-.556q-4.261-6-8.553-11.981c-.111-.155-.233-.3-.387-.5-.853.9-1.665 1.734-2.462 2.586q-4.724 5.051-9.449 10.1a1.044 1.044 0 0 1-.654.329c-1.551.024-3.1.007-4.653 0a1.1 1.1 0 0 1-.252-.1m7.49-33.577C8.449 5.286 9.3 6.48 10.151 7.67q4.187 5.833 8.377 11.663 4.5 6.268 9.009 12.533c.428.594.768 1.4 1.355 1.691a5.569 5.569 0 0 0 2.23.1c.924.006 1.849 0 2.876 0-.186-.293-.3-.493-.436-.681q-1.19-1.676-2.387-3.347Q24.8 20.745 18.427 11.86c-1.794-2.5-3.577-5.013-5.378-7.51a.883.883 0 0 0-.544-.387c-1.6-.031-3.21-.018-5.013-.018"
                                                        fill="currentColor"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </Anchor>
                                    </li>
                                </ul>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Container>
            </aside>
            <footer className={classes.colophon}>
                <Container className={classes.myContainer}>
                    <div className={classes.colophonRow}>
                        <Grid className={classes.rowGrid}>
                            <Grid.Col span={{ xs: 12, sm: 7 }} className={classes.siteInfo}>
                                <Text className={classes.siteInfoTextFirst}>
                                    © Copyright 2024 AutogenAI. All rights reserved. Company number 13907128
                                </Text>
                                <Text className={classes.siteInfoTextTwo}>
                                    All text on this site was co-created using AutogenAI’s General Language Engine 1
                                    (Genny-1).
                                    <br />
                                    All AI-generated text has been reviewed, approved and verified by humans.
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={{ xs: 0, sm: 1 }}></Grid.Col>
                            <Grid.Col span={{ xs: 12, sm: 4 }} className={classes.address}>
                                <Text className={classes.addressText}>
                                    Registered office address 5th Floor, 123 Pentonville Road, N1 9LG
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Container>
            </footer>
        </>
    );
}
