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
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    LocationCity,
} from "@mui/icons-material";
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
    Button,
    Card,
    type Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { visuallyHidden } from "@mui/utils";
import type React from "react";
import { useState } from "react";

import Experiences, { type Experience } from "@/constants/experience";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";
import { KeywordChip } from "@/components/primitives";

const SKILLS_PREVIEW_COUNT = 5;

interface ExperienceSkillsProps {
    skills: string[];
    isContentOnRight: boolean;
}

const ExperienceSkills = ({
    skills,
    isContentOnRight,
}: ExperienceSkillsProps): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Box
            role="group"
            aria-label="Skills used"
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.625,
                mt: 2,
                justifyContent: isContentOnRight ? "flex-start" : "flex-end",
            }}
        >
            {skills
                .slice(0, expanded ? undefined : SKILLS_PREVIEW_COUNT)
                .map((skill) => (
                    <KeywordChip key={skill} label={skill} />
                ))}
            {skills.length > SKILLS_PREVIEW_COUNT && (
                <Button
                    size="small"
                    variant="text"
                    onClick={() => setExpanded((prev) => !prev)}
                    sx={{
                        fontSize: "0.625rem",
                        px: 0.5,
                        py: 0,
                        minWidth: 0,
                        height: "1.25rem",
                        fontWeight: 400,
                        color: "text.secondary",
                        alignSelf: "center",
                        gap: 0.25,
                    }}
                >
                    {expanded ? (
                        <>
                            Show less
                            <KeyboardArrowUp sx={{ fontSize: "0.75rem" }} />
                        </>
                    ) : (
                        <>
                            +{skills.length - SKILLS_PREVIEW_COUNT} more
                            <KeyboardArrowDown sx={{ fontSize: "0.75rem" }} />
                        </>
                    )}
                </Button>
            )}
        </Box>
    );
};

const Experience = (): React.ReactElement => {
    const theme = useTheme();
    const isAllContentRightAligned = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );

    const pulseColor =
        theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.primary.light;

    // Defined inside the component (after useTheme) so theme-aware colors can be
    // interpolated. Module-level keyframes cannot use theme callbacks.
    const timelinePulse = keyframes`
        0%   { box-shadow: 0 0 0 0   ${alpha(pulseColor, theme.palette.mode === "light" ? 0.35 : 0.4)}; }
        70%  { box-shadow: 0 0 0 8px ${alpha(pulseColor, 0)}; }
        100% { box-shadow: 0 0 0 0   ${alpha(pulseColor, 0)}; }
    `;

    return (
        <Timeline
            position={isAllContentRightAligned ? "right" : "alternate"}
            aria-label="Experience Timeline"
            role="list"
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
                        <TimelineItem
                            key={item.timePeriod.format()}
                            role="listitem"
                        >
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
                                    sx={(theme) => ({
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        width: 18,
                                        height: 18,
                                        boxShadow: "none",
                                        border: "3.5px solid",
                                        borderColor:
                                            theme.palette.background.paper,
                                        // Stagger each dot's pulse by 0.4s so they don't all pulse in sync
                                        [MOTION_OK_QUERY]: {
                                            "animation": `${timelinePulse} 2.5s ease-out ${index * 0.4}s infinite`,
                                            "transition":
                                                theme.transitions.create(
                                                    "all",
                                                    {
                                                        duration:
                                                            theme.transitions
                                                                .duration.short,
                                                    },
                                                ),
                                            "&:hover": {
                                                transform: "scale(1.15)",
                                            },
                                        },
                                    })}
                                />
                                <TimelineConnector
                                    sx={{
                                        background: (theme) =>
                                            theme.palette.mode === "light"
                                                ? `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.33)}, transparent)`
                                                : `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.27)}, transparent)`,
                                        backgroundColor: "transparent",
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
                                        "p": { xs: 2.5, md: 4.5 },
                                        "mb": 7,
                                        "transition": (theme) =>
                                            theme.transitions.create(
                                                "border-color",
                                                {
                                                    duration:
                                                        theme.transitions
                                                            .duration.shortest,
                                                },
                                            ),
                                        "&:hover": {
                                            ...(isContentOnRight
                                                ? {
                                                      borderLeftColor: (
                                                          theme,
                                                      ) =>
                                                          theme.palette.primary
                                                              .main,
                                                  }
                                                : {
                                                      borderRightColor: (
                                                          theme,
                                                      ) =>
                                                          theme.palette.primary
                                                              .main,
                                                  }),
                                        },
                                        "borderTop": "none",
                                        ...(isContentOnRight
                                            ? {
                                                  borderLeft: "3px solid",
                                                  borderLeftColor: (theme) =>
                                                      theme.palette.mode ===
                                                      "light"
                                                          ? alpha(
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                                0.33,
                                                            )
                                                          : alpha(
                                                                theme.palette
                                                                    .primary
                                                                    .light,
                                                                0.27,
                                                            ),
                                                  pl: { xs: 2.5, md: 4.5 },
                                              }
                                            : {
                                                  borderRight: "3px solid",
                                                  borderRightColor: (theme) =>
                                                      theme.palette.mode ===
                                                      "light"
                                                          ? alpha(
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                                0.33,
                                                            )
                                                          : alpha(
                                                                theme.palette
                                                                    .primary
                                                                    .light,
                                                                0.27,
                                                            ),
                                                  pr: { xs: 2.5, md: 4.5 },
                                              }),
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        mb={2.5}
                                        sx={{
                                            textAlign: isContentOnRight
                                                ? "left"
                                                : "right",
                                            fontSize: { xs: 19, md: 20 },
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
                                                fontSize: { xs: 12, md: 13 },
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
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={visuallyHidden}
                                            >
                                                Company:{" "}
                                            </Box>
                                            {item.institute}
                                        </Typography>
                                        {!isContentOnRight && (
                                            <LocationCity
                                                fontSize="small"
                                                sx={{ opacity: 0.6 }}
                                            />
                                        )}
                                    </Box>
                                    {item.skills.length > 0 && (
                                        <ExperienceSkills
                                            skills={item.skills}
                                            isContentOnRight={isContentOnRight}
                                        />
                                    )}
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
