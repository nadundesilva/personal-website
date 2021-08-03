import React from "react";
import { createStyles, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { LocationOn as LocationOnIcon } from "@material-ui/icons";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => {
    const instituteIconPadding = 0.5;
    return createStyles({
        timeLineItemContent: {
            padding: theme.spacing(2)
        },
        instituteIconRight: {
            marginLeft: theme.spacing(instituteIconPadding)
        },
        instituteIconLeft: {
            marginRight: theme.spacing(instituteIconPadding)
        }
    });
});

interface ExperienceItem {
    name: string,
    timePeriod: string,
    description: string,
    institute: string,
}

const Experience = (): React.ReactElement => {
    const classes = useStyles();
    const experienceItems: ExperienceItem[] = [
        {
            name: "Senior Software Engineer",
            timePeriod: "July 2019 - Present",
            description: "Lead Observability Team in creating the PoC as well as the project in Choreo",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Software Engineer",
            timePeriod: "Jan 2018 - July 2019",
            description: "Designed & developed several components in middle-ware & cloud projects",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Google Summer of Code Intern",
            timePeriod: "May 2017 - Sep 2017",
            description: "Designed and implemented a maven plugin for automatically generating documentation for Siddhi extensions using annotated data written in the java code.",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Software Engineering Trainee",
            timePeriod: "July 2016 - Dec 2019",
            description: "Implemented a Notebook prototype for the Data Analytics Server",
            institute: "WSO2, Colombo 03, Sri Lanka"
        }
    ];
    return (
        <Timeline align="alternate">
            {
                experienceItems.map((item: ExperienceItem, index: number) => (
                    <TimelineItem key={item.name}>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {item.timePeriod}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary"/>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.timeLineItemContent}>
                                <Typography variant="body1" component="h6">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {index % 2 === 0 && <LocationOnIcon className={classes.instituteIconLeft} fontSize="inherit"/>}
                                    {item.institute}
                                    {index % 2 === 1 && <LocationOnIcon className={classes.instituteIconRight} fontSize="inherit"/>}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))
            }
        </Timeline>
    );
};

export default Experience;
