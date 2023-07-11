/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { LocationCity } from "@mui/icons-material";
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from "@mui/lab";
import {
    Paper,
    Slide,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";

import { useScrollOffset } from "@/components/layout";

interface ExperienceItem {
    name: string;
    timePeriod: string;
    description: string;
    institute: string;
}

const Experience = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLUListElement>();
    const theme = useTheme();
    const isTimelineLeftAligned = useMediaQuery(theme.breakpoints.down("sm"));

    const experienceItems: ExperienceItem[] = [
        {
            name: "Senior Software Engineer",
            timePeriod: "Nov 2022 to Now",
            description: "Joined as a Senior Software Engineer at Orion Health",
            institute: "Orion Health, Auckland, New Zealand",
        },
        {
            name: "Associate Technical Lead",
            timePeriod: "June 2021 to Nov 2022",
            description:
                "Lead Choreo Observability Team as well as other Teams in Choreo",
            institute: "WSO2, Colombo 03, Sri Lanka",
        },
        {
            name: "Senior Software Engineer",
            timePeriod: "July 2019 to June 2021",
            description:
                "Lead Choreo Observability Team in creating the initial PoC as well as the Platform",
            institute: "WSO2, Colombo 03, Sri Lanka",
        },
        {
            name: "Software Engineer",
            timePeriod: "Jan 2018 to July 2019",
            description:
                "Designed & developed several components in middle-ware & cloud projects",
            institute: "WSO2, Colombo 03, Sri Lanka",
        },
        {
            name: "Google Summer of Code Intern",
            timePeriod: "May 2017 to Sep 2017",
            description:
                "Designed and implemented a maven plugin for automatically generating documentation for Siddhi extensions using annotated data written in the java code.",
            institute: "WSO2, Colombo 03, Sri Lanka",
        },
        {
            name: "Software Engineering Trainee",
            timePeriod: "July 2016 to Dec 2019",
            description:
                "Implemented a Notebook prototype for the Data Analytics Server",
            institute: "WSO2, Colombo 03, Sri Lanka",
        },
    ];
    const locationIcon = <LocationCity />;

    return (
        <Timeline
            ref={rootRef}
            position={isTimelineLeftAligned ? "left" : "alternate"}
        >
            {experienceItems.map((item: ExperienceItem, index: number) => {
                const isOnLeft = isTimelineLeftAligned || index % 2 === 0;
                return (
                    <TimelineItem key={item.timePeriod}>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {item.timePeriod}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Slide
                                direction={isOnLeft ? "left" : "right"}
                                in={offset > 0.5}
                                timeout={1000}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{ padding: 2, marginBottom: 5 }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="h2"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {item.description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {isOnLeft && (
                                            <React.Fragment>
                                                {locationIcon}{" "}
                                            </React.Fragment>
                                        )}
                                        {item.institute}
                                        {!isOnLeft && (
                                            <React.Fragment>
                                                {" "}
                                                {locationIcon}
                                            </React.Fragment>
                                        )}
                                    </Typography>
                                </Paper>
                            </Slide>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};

export default Experience;
