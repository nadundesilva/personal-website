import React, { useRef } from "react";
import { Layout } from "../../../components";
import AboutMe from "./AboutMe";
import Education from "./Education";
import Experience from "./Experience";
import Profiles from "./Profiles";
import Skills from "./Skills";
import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    const sidesPadding = 16;
    return createStyles({
        root: {
            marginLeft: theme.spacing(sidesPadding),
            marginRight: theme.spacing(sidesPadding)
        },
        grow: {
            flexGrow: 1
        },
        section: {
            padding: theme.spacing(1),
            margin: theme.spacing(5)
        },
        sectionContent: {
            padding: theme.spacing(3)
        }
    });
});

interface Section {
    name: string,
    ref: React.RefObject<HTMLDivElement>,
    Component: () => React.ReactElement,
};

const Home = (): React.ReactElement => {
    const classes = useStyles();

    const pageSections: Section[] = [
        {
            name: "Education",
            ref: useRef<HTMLDivElement>(null),
            Component: Education
        },
        {
            name: "Skills",
            ref: useRef<HTMLDivElement>(null),
            Component: Skills
        },
        {
            name: "Experience",
            ref: useRef<HTMLDivElement>(null),
            Component: Experience
        },
        {
            name: "Profiles",
            ref: useRef<HTMLDivElement>(null),
            Component: Profiles
        }
    ];

    const generateGoToSectionHandler = (sectionRef: React.RefObject<HTMLDivElement>) => () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    return (
        <Layout navItems={
            <React.Fragment>
                <div className={classes.grow} />
                {
                    pageSections.map((section: Section) => (
                        <Button key={section.name} variant={"contained"} color="primary" disableElevation
                            onClick={generateGoToSectionHandler(section.ref)}>
                            {section.name}
                        </Button>
                    ))
                }
            </React.Fragment>
        }>
            <div className={classes.root}>
                <Typography variant="h6" align="center">About Me</Typography>
                <AboutMe/>
                <React.Fragment>
                    {
                        pageSections.map((section: Section) => (
                            <div ref={section.ref} className={classes.section} key={section.name}>
                                <Typography variant="h6" align="center">{section.name}</Typography>
                                <div className={classes.sectionContent}>
                                    <section.Component/>
                                </div>
                            </div>
                        ))
                    }
                </React.Fragment>
            </div>
        </Layout>
    );
};

export default Home;
