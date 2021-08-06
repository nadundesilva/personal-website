import React from "react";
import { Box, Button, createStyles, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

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

interface EducationItem {
    name: string,
    timePeriod: string,
    description: string,
    institute: string,
}

const Education = (): React.ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const educationItems: EducationItem[] = [
        {
            name: "Bachelor of Science in Engineering",
            timePeriod: "Dec 2017",
            description: "Studied Computer Science and Engineering & completed a First Class Honors Degree.",
            institute: "University of Moratuwa"
        },
        {
            name: "Certified Kubernetes Application Developer",
            timePeriod: "Jan 2020",
            description: "Achieved Certified Kubernetes Application Developer Certification.",
            institute: "Linux Foundation"
        },
        {
            name: "Certified Kubernetes Administrator",
            timePeriod: "Dec 2020",
            description: "Achieved Certified Kubernetes Administrator Certification.",
            institute: "Linux Foundation"
        }
    ];
    const instituteIcon = <FontAwesomeIcon className={classes.instituteIconLeft} icon={faMapMarkerAlt}/>;
    const timeline = (
        <Timeline align="alternate">
            {
                educationItems.map((item: EducationItem, index: number) => (
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
                                <Typography variant="body1" component="h6" className={classes.timeLineItemTitle}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {index % 2 === 0 && (
                                        <React.Fragment>{instituteIcon}&nbsp;</React.Fragment>
                                    )}
                                    {item.institute}
                                    {index % 2 === 1 && (
                                        <React.Fragment>&nbsp;{instituteIcon}</React.Fragment>
                                    )}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))
            }
        </Timeline>
    );
    const viewMore = (): void => history.push("/certifications");
    return (
        <React.Fragment>
            {timeline}
            <Box display="flex" justifyContent="flex-end">
                <Button size="small" color="primary" variant="contained" onClick={viewMore}>
                    View Certifications
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default Education;
