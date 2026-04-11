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
import { InfoOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import type React from "react";

import SkillCategories from "@/constants/skill-categories";
import type { SectionProps } from "../types";
import SkillChip, { proficiencyLevels } from "./components/SkillChip";

const ProficiencyLegend = (): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 2 },
        }}
    >
        {Object.entries(proficiencyLevels)
            .map(([label, data]) => ({ label, ...data }))
            .sort((a, b) => a.bars - b.bars)
            .map(({ label, bars, color }) => (
                <Box
                    key={label}
                    sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                >
                    <Box
                        aria-hidden="true"
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 0.25,
                            height: 12,
                        }}
                    >
                        {([1, 2, 3] as const).map((i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 3,
                                    height: i * 4,
                                    bgcolor:
                                        i <= bars
                                            ? color
                                            : "action.disabledBackground",
                                    borderRadius: 0.125,
                                }}
                            />
                        ))}
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: 11,
                            color: (theme) => theme.palette.text.disabled,
                        }}
                    >
                        {label}
                    </Typography>
                </Box>
            ))}
        <Typography
            variant="caption"
            sx={{
                fontSize: 11,
                color: (theme) => theme.palette.text.disabled,
                opacity: 0.7,
            }}
        >
            <InfoOutlined
                sx={{
                    fontSize: 13,
                    opacity: 0.6,
                    verticalAlign: "middle",
                    mr: 0.5,
                }}
            />
            hover or tap any skill for details
        </Typography>
    </Box>
);

const Skills = ({
    sectionEntranceDelay = 0,
}: SectionProps): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 6, md: 8 },
            width: "100%",
            maxWidth: { xs: "100%", md: 720 },
            mx: "auto",
        }}
    >
        <Box
            component="a"
            href="#skip-skills-target"
            sx={{
                "position": "absolute",
                "width": 1,
                "height": 1,
                "padding": 0,
                "margin": -1,
                "overflow": "hidden",
                "clip": "rect(0, 0, 0, 0)",
                "whiteSpace": "nowrap",
                "border": 0,
                "&:focus-visible": {
                    position: "static",
                    width: "auto",
                    height: "auto",
                    margin: 2,
                    padding: 1,
                    clip: "auto",
                    whiteSpace: "normal",
                    outline: "2px solid",
                    outlineColor: (theme) => theme.palette.primary.main,
                    outlineOffset: "2px",
                    zIndex: (theme) => theme.zIndex.tooltip + 1,
                    display: "block",
                    textAlign: "center",
                    backgroundColor: (theme) => theme.palette.background.paper,
                    color: (theme) => theme.palette.primary.main,
                    borderRadius: 1,
                    textDecoration: "none",
                },
            }}
        >
            Skip Skills
        </Box>
        <ProficiencyLegend />
        {SkillCategories.map((group) => {
            const headingId = `skills-category-${group.category.toLowerCase().replace(/\s+/g, "-")}`;
            return (
                <Box key={group.category} sx={{ mt: 2 }}>
                    <Typography
                        id={headingId}
                        variant="h3"
                        align="center"
                        aria-label={group.category}
                        sx={{
                            "fontWeight": 400,
                            "fontSize": { xs: 18, md: 20 },
                            "letterSpacing": "-0.01em",
                            "lineHeight": 1.6,
                            "mb": { xs: 2, md: 2.5 },
                            "color": (theme) => theme.palette.text.secondary,
                            "&::before": {
                                content: '"<"',
                                fontFamily: "monospace",
                                color: (theme) => theme.palette.primary.main,
                                opacity: 0.6,
                                fontWeight: 300,
                                fontSize: "1.3em",
                                display: "inline-block",
                                verticalAlign: "middle",
                                marginRight: 1,
                                lineHeight: 1,
                            },
                            "&::after": {
                                content: '"/>"',
                                fontFamily: "monospace",
                                color: (theme) => theme.palette.primary.main,
                                opacity: 0.6,
                                fontWeight: 300,
                                fontSize: "1.3em",
                                display: "inline-block",
                                verticalAlign: "middle",
                                marginLeft: 1,
                                lineHeight: 1,
                            },
                        }}
                    >
                        {group.category}
                    </Typography>
                    <Box
                        component="ul"
                        aria-labelledby={headingId}
                        sx={{
                            p: 0,
                            pt: 1,
                            m: 0,
                            listStyle: "none",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            justifyContent: "center",
                        }}
                    >
                        {group.skills.map((skill) => (
                            <Box component="li" key={skill.name}>
                                <SkillChip
                                    skill={skill}
                                    sectionEntranceDelay={sectionEntranceDelay}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            );
        })}
        {/* Invisible target for the skip link */}
        <Box id="skip-skills-target" tabIndex={-1} sx={{ outline: "none" }} />
    </Box>
);

export default Skills;
