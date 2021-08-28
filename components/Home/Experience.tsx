import React from "react";
import { Paper, Theme, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@material-ui/lab";
import { useScrollOffset } from "@/components/Layout";

const useStyles = makeStyles((theme: Theme) => {
    const instituteIconPadding = 0.5;
    return createStyles({
        timeLineItemContent: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(5)
        },
        timeLineItemTitle: {
            fontWeight: "bold"
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
    const { ref: rootRef, offset } = useScrollOffset<Element>();
    const theme = useTheme();
    const isTimelineLeftAligned = useMediaQuery(theme.breakpoints.down("xs"));

    const experienceItems: ExperienceItem[] = [
        {
            name: "Associate Technical Lead",
            timePeriod: "June 2021 to Now",
            description: "Lead Choreo Observability Team as well as other Teams in Choreo",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Senior Software Engineer",
            timePeriod: "July 2019 to June 2021",
            description: "Lead Choreo Observability Team in creating the initial PoC as well as the Platform",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Software Engineer",
            timePeriod: "Jan 2018 to July 2019",
            description: "Designed & developed several components in middle-ware & cloud projects",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Google Summer of Code Intern",
            timePeriod: "May 2017 to Sep 2017",
            description: "Designed and implemented a maven plugin for automatically generating documentation for Siddhi extensions using annotated data written in the java code.",
            institute: "WSO2, Colombo 03, Sri Lanka"
        },
        {
            name: "Software Engineering Trainee",
            timePeriod: "July 2016 to Dec 2019",
            description: "Implemented a Notebook prototype for the Data Analytics Server",
            institute: "WSO2, Colombo 03, Sri Lanka"
        }
    ];
    const instituteIcon = <FontAwesomeIcon className={classes.instituteIconLeft} icon={faMapMarkerAlt}/>;

    const translation = (1 - offset) * 20;
    return (
        <Timeline ref={rootRef} align={isTimelineLeftAligned ? "left" : "alternate"}>
            {
                experienceItems.map((item: ExperienceItem, index: number) => {
                    const isOnLeft = isTimelineLeftAligned || index % 2 === 0;
                    return (
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
                                <Paper elevation={3} className={classes.timeLineItemContent}
                                    style={{
                                        transform: `translateX(${isOnLeft ? translation : -translation}vw)`,
                                        opacity: offset
                                    }}
                                >
                                    <Typography variant="body1" component="h6" className={classes.timeLineItemTitle}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {isOnLeft && (
                                            <React.Fragment>{instituteIcon}&nbsp;</React.Fragment>
                                        )}
                                        {item.institute}
                                        {!isOnLeft && (
                                            <React.Fragment>&nbsp;{instituteIcon}</React.Fragment>
                                        )}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })
            }
        </Timeline>
    );
};

export default Experience;
