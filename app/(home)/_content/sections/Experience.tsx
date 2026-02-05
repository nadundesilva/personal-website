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
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import Experiences, { type Experience } from "@/constants/experience";
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
    Box,
    Card,
    type Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import type React from "react";

const Experience = (): React.ReactElement => {
    const isAllContentRightAligned = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );

    return (
        <Timeline
            position={isAllContentRightAligned ? "right" : "alternate"}
            sx={{
                px: 0,
                [`& .MuiTimelineItem-root:before`]: isAllContentRightAligned
                    ? {
                          flex: 0,
                          padding: 0,
                      }
                    : {},
            }}
        >
            {Object.values(Experiences).map(
                (item: Experience, index: number) => {
                    const isContentOnRight =
                        isAllContentRightAligned || index % 2 === 0;
                    return (
                        <TimelineItem key={item.timePeriod.format()}>
                            {!isAllContentRightAligned && (
                                <TimelineOppositeContent
                                    sx={{
                                        ...(isContentOnRight && { pl: 0 }),
                                        ...(!isContentOnRight && { pr: 0 }),
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: { xs: 12, md: 13 },
                                            fontWeight: 400,
                                            letterSpacing: "0.04em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {item.timePeriod.format()}
                                    </Typography>
                                </TimelineOppositeContent>
                            )}
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{
                                        "backgroundColor": "primary.main",
                                        "width": 18,
                                        "height": 18,
                                        "boxShadow": "none",
                                        "border": "3.5px solid",
                                        "borderColor": "background.paper",
                                        "transition":
                                            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "scale(1.1)",
                                            boxShadow: (theme) =>
                                                `0 0 0 4px ${theme.palette.primary.main}1A`,
                                        },
                                    }}
                                />
                                <TimelineConnector
                                    sx={{
                                        backgroundColor: "divider",
                                        opacity: 0.25,
                                        width: 1,
                                    }}
                                />
                            </TimelineSeparator>
                            <TimelineContent
                                sx={{
                                    ...(isContentOnRight && { pr: 0 }),
                                    ...(!isContentOnRight && { pl: 0 }),
                                }}
                            >
                                <Card
                                    sx={{
                                        p: { xs: 2.5, md: 4.5 },
                                        mb: 7,
                                        ...(isContentOnRight
                                            ? {
                                                  borderLeft: "3px solid",
                                                  borderLeftColor:
                                                      "primary.main",
                                                  pl: { xs: 2.5, md: 4.5 },
                                              }
                                            : {
                                                  borderRight: "3px solid",
                                                  borderRightColor:
                                                      "primary.main",
                                                  pr: { xs: 2.5, md: 4.5 },
                                              }),
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        mb={2.5}
                                        fontWeight={500}
                                        sx={{
                                            textAlign: isContentOnRight
                                                ? "left"
                                                : "right",
                                            fontSize: { xs: 19, md: 20 },
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    {isAllContentRightAligned && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            mb={2}
                                            sx={{
                                                fontSize: { xs: 10, md: 13 },
                                                fontWeight: 700,
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {item.timePeriod.format()}
                                        </Typography>
                                    )}
                                    <Typography
                                        variant="body2"
                                        mb={3}
                                        color="text.secondary"
                                        sx={{
                                            textAlign: isContentOnRight
                                                ? "left"
                                                : "right",
                                            lineHeight: 1.8,
                                            fontWeight: 400,
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1.25}
                                        justifyContent={
                                            isContentOnRight
                                                ? "flex-start"
                                                : "flex-end"
                                        }
                                        pt={1}
                                    >
                                        {isContentOnRight && (
                                            <LocationCity
                                                fontSize="small"
                                                sx={{ opacity: 0.6 }}
                                            />
                                        )}
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.3,
                                                fontSize: { xs: 13 },
                                                fontWeight: 400,
                                                letterSpacing: "0em",
                                            }}
                                        >
                                            {item.institute}
                                        </Typography>
                                        {!isContentOnRight && (
                                            <LocationCity
                                                fontSize="small"
                                                sx={{ opacity: 0.6 }}
                                            />
                                        )}
                                    </Box>
                                </Card>
                            </TimelineContent>
                        </TimelineItem>
                    );
                },
            )}
        </Timeline>
    );
};

export default Experience;
