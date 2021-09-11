import React, { useRef } from "react";
import Layout, { LayoutContent } from "@/components/Layout";
import Heading from "@/components/Heading";
import { AboutMe, Achievements, ContributedProjects, Certifications, Experience, Profiles, Skills, WelcomeBanner } from "@/components/Home";
import { Button, Container, Hidden, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import Head from "next/head";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        section: {
            padding: theme.spacing(1),
            margin: theme.spacing(5)
        }
    })
);

interface Section {
    name: string,
    ref: React.RefObject<HTMLDivElement>,
    Component: () => React.ReactElement,
}

const Home = (): React.ReactElement => {
    const classes = useStyles();

    const pageSections: Section[] = [
        {
            name: "Experience",
            ref: useRef<HTMLDivElement>(null),
            Component: Experience
        },
        {
            name: "Achievements",
            ref: useRef<HTMLDivElement>(null),
            Component: Achievements
        },
        {
            name: "Skills",
            ref: useRef<HTMLDivElement>(null),
            Component: Skills
        },
        {
            name: "Certifications",
            ref: useRef<HTMLDivElement>(null),
            Component: Certifications
        },
        {
            name: "Profiles",
            ref: useRef<HTMLDivElement>(null),
            Component: Profiles
        },
        {
            name: "Contributed Projects",
            ref: useRef<HTMLDivElement>(null),
            Component: ContributedProjects
        }
    ];

    const generateGoToSectionHandler = (sectionRef: React.RefObject<HTMLDivElement>) => () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const generateSection = (title: string, section: React.ReactElement): React.ReactElement => (
        <React.Fragment>
            <Heading>{title}</Heading>
            <Container maxWidth={false} disableGutters={true} sx={{ padding: 3 }}>
                {section}
            </Container>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Head>
                <title>Nadun De Silva | An aspiring Software Engineer and ML Enthusiast</title>
            </Head>
            <Layout appBarItems={
                <Hidden lgDown>
                    {
                        pageSections.map((section: Section) => (
                            <Button key={section.name} variant={"contained"} color="primary" disableElevation
                                onClick={generateGoToSectionHandler(section.ref)}>
                                {section.name}
                            </Button>
                        ))
                    }
                </Hidden>
            }>
                <WelcomeBanner/>
                <LayoutContent>
                    <Container maxWidth={false} disableGutters={true} className={classes.section}>
                        {generateSection("About Me", <AboutMe/>)}
                    </Container>
                    <React.Fragment>
                        {
                            pageSections.map((section: Section) => (
                                <Container maxWidth={false} disableGutters={true} ref={section.ref}
                                    className={classes.section} key={section.name}
                                >
                                    {generateSection(section.name, <section.Component/>)}
                                </Container>
                            ))
                        }
                    </React.Fragment>
                </LayoutContent>
            </Layout>
        </React.Fragment>
    );
};

export default Home;
