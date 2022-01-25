/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import { Paper, Slide, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import { useScrollOffset } from "@/components/Layout";

interface ExperienceItem {
    name: string,
    timePeriod: string,
    description: string,
    institute: string,
}

const Experience = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLUListElement>();
    const theme = useTheme();
    const isTimelineLeftAligned = useMediaQuery(theme.breakpoints.down("sm"));

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
    const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt}/>;

    return (
        <Timeline ref={rootRef} position={isTimelineLeftAligned ? "left" : "alternate"}>
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
                                <Slide direction={isOnLeft ? "left" : "right"} in={offset > 0.5} timeout={1000}>
                                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 5 }}>
                                        <Typography variant="body1" component="h2" sx={{ fontWeight: "bold" }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {isOnLeft && (
                                                <React.Fragment>{locationIcon}&nbsp;</React.Fragment>
                                            )}
                                            {item.institute}
                                            {!isOnLeft && (
                                                <React.Fragment>&nbsp;{locationIcon}</React.Fragment>
                                            )}
                                        </Typography>
                                    </Paper>
                                </Slide>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })
            }
        </Timeline>
    );
};

export default Experience;
