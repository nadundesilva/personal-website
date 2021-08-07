import React, { useRef } from "react";
import { Heading, Layout, LayoutContent } from "../../components";
import AboutMe from "./AboutMe";
import Achievements from "./Achievements";
import ContributedProjects from "./ContributedProjects";
import Education from "./Education";
import Experience from "./Experience";
import Profiles from "./Profiles";
import Skills from "./Skills";
import WelcomeBanner from "./WelcomeBanner";
import { Button, createStyles, Hidden, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        section: {
            padding: theme.spacing(1),
            margin: theme.spacing(5)
        },
        sectionContent: {
            padding: theme.spacing(3)
        }
    })
);

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
        },
        {
            name: "Achievements",
            ref: useRef<HTMLDivElement>(null),
            Component: Achievements
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
            <div className={classes.sectionContent}>{section}</div>
        </React.Fragment>
    );
    return (
        <Layout appBarItems={
            <Hidden mdDown>
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
                <div className={classes.section}>
                    {generateSection("About Me", <AboutMe/>)}
                </div>
                <React.Fragment>
                    {
                        pageSections.map((section: Section) => (
                            <div ref={section.ref} className={classes.section} key={section.name}>
                                {generateSection(section.name, <section.Component/>)}
                            </div>
                        ))
                    }
                </React.Fragment>
            </LayoutContent>
        </Layout>
    );
};

export default Home;
