import { useEffect, useRef, useState } from "react";
import { Container, Group, Burger, Box, Drawer, Anchor, Image, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Header.module.css";

const links = [
    { link: "#", label: "Product" },
    { link: "#", label: "Security" },
    { link: "#", label: "About Us" },
    { link: "#", label: "Articles" },
    { link: "#", label: "Careers" },
];

const logoSrc = `${process.env.PUBLIC_URL}/assets/images/AutogenAI-logo-white.png`;
const logoSrcSet = `
  ${process.env.PUBLIC_URL}/assets/images/AutogenAI-logo-white.png 1024w, 
  ${process.env.PUBLIC_URL}/assets/images/AutogenAI-logo-white-300x61.png 300w, 
  ${process.env.PUBLIC_URL}/assets/images/AutogenAI-logo-white-768x156.png 768w
`;

export function Header() {
    const headerRef = useRef<HTMLDivElement>(null);

    const [isSticky, setIsSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [headerHeight]);

    useEffect(() => {
        if (headerRef.current?.clientHeight) {
            setHeaderHeight(headerRef.current.clientHeight);
        }
    }, [headerRef]);

    const headerClasses = `${classes.siteHeader} ${isSticky ? classes.stickyHeader : ""}`;

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    /* const customDrawerHeader = (
    <a className="logo-link" href="/">
        <img src="assets/images/AutogenAI-logo-white.png" alt="AutogenAI logo (white)" className="skip-lazy" srcSet="assets/images/AutogenAI-logo-white.png 1024w, assets/images/AutogenAI-logo-white-300x61.png 300w, assets/images/AutogenAI-logo-white-768x156.png 768w" sizes="(min-width: 768px) 30vw, 100vw" />
    </a>
  ); */

    const items = links.map((link, index) => (
        <li
            key={link.label}
            className={`${classes.navItem} ${index !== 0 && classes.specialNavItem ? classes.specialNavItem : ""}`}
        >
            <Anchor
                href={link.link}
                className={classes.navLink}
                data-active={active === link.link || undefined}
                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    event.preventDefault();
                    setActive(link.link);
                }}
            >
                <span className={classes.navText}>{link.label}</span>
            </Anchor>
        </li>
    ));

    return (
        <>
            <header className={headerClasses} ref={headerRef}>
                <Group className={classes.headerGroup}>
                    <div className={classes.headerWrapper}>
                        <div className={classes.logoHeaderWrapper}>
                            <div className={classes.headerLogo}>
                                <Anchor href="/" className={classes.logoLink}>
                                    <Image
                                        src={logoSrc}
                                        alt="AutogenAI logo (white)"
                                        className={classes.skipLazy}
                                        srcSet={logoSrcSet}
                                        sizes="(min-width: 768px) 30vw, 100vw"
                                        style={{ width: "auto", height: "100%" }} // Adjust dimensions as needed
                                    />
                                </Anchor>
                            </div>
                        </div>
                        <div className={classes.wrapperNavPrimary}>
                            <Group visibleFrom="md" style={{ display: "block" }}>
                                <nav className={classes.navPrimary}>
                                    <div className={classes.navbarPrimary}>
                                        <Container fluid className={classes.navContainer}>
                                            <ul className={classes.navBarNav}>
                                                {items}
                                                <li className={`${classes.navItem} ${classes.btnNav}`}>
                                                    <Button
                                                        component="a"
                                                        href="#"
                                                        size="xl"
                                                        className={classes.navLink}
                                                    >
                                                        Contact
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Container>
                                    </div>
                                </nav>
                            </Group>
                            <Box className={classes.collapseWrapper} hiddenFrom="md">
                                <Burger
                                    opened={drawerOpened}
                                    className={classes.collapseBtn}
                                    size="xl"
                                    onClick={toggleDrawer}
                                    hiddenFrom="md"
                                />
                            </Box>
                        </div>
                        {/* <Container className={classes.inner} px={0} >
              <a className="logo-link" href="/">
                  <img
                      src="/assets/images/AutogenAI-logo-white.png"
                      alt="AutogenAI logo (white)"
                      className="skip-lazy"
                      srcSet="/assets/images/AutogenAI-logo-white.png 1024w, /assets/images/AutogenAI-logo-white-300x61.png 300w, /assets/images/AutogenAI-logo-white-768x156.png 768w"
                      sizes="(min-width: 768px) 30vw, 100vw"
                      style={{ width: 'auto', height: '100%' }} // Adjust dimensions as needed
                  />
              </a>
              <Group gap={5} visibleFrom="xs">
              {items}
              </Group>

              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Container> */}
                    </div>
                </Group>
            </header>
            <Drawer.Root
                opened={drawerOpened}
                onClose={closeDrawer}
                position="top"
                transitionProps={{ transition: "fade-down", duration: 200, timingFunction: "ease" }}
            >
                <Drawer.Overlay />
                <Drawer.Content className={classes.drawerContent}>
                    {/* <Drawer.Header>
            <Drawer.Title>Drawer title</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header> */}
                    <Drawer.Body className={classes.drawerBody}>
                        {/* <ScrollArea style={{ height: 'calc(100vh - 80px)' }} mx="-md"> */}
                        {/* {customDrawerHeader} */}
                        {/* <Divider my="sm" /> */}
                        <Group
                            gap={5}
                            hiddenFrom="md"
                            className={classes.responsiveNavGrp}
                            style={{ display: isSmallScreen ? "block" : "flex" }}
                        >
                            <ul className={classes.navBarNav}>
                                {items}
                                <li className={classes.navItem}>
                                    <Anchor href="#" className={classes.navLink}>
                                        Contact
                                    </Anchor>
                                </li>
                            </ul>
                        </Group>
                        {/* <Divider my="sm" /> */}
                        {/* </ScrollArea> */}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
            <div id="site-content" style={{ marginTop: isSticky ? headerHeight : 0 }}></div>
        </>
    );
}
