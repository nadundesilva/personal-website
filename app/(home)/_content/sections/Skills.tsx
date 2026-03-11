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
import { Box, Typography } from "@mui/material";
import type React from "react";

import SkillCategories from "@/constants/skill-categories";
import SkillChip from "./components/SkillChip";

const Skills = (): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, md: 5 },
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
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                    zIndex: 999,
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "background.paper",
                    color: "primary.main",
                    borderRadius: 1,
                    textDecoration: "none",
                },
            }}
        >
            Skip Skills
        </Box>
        {SkillCategories.map((group) => {
            const headingId = `skills-category-${group.category.toLowerCase().replace(/\s+/g, "-")}`;
            return (
                <Box key={group.category} sx={{ mt: 2 }}>
                    <Typography
                        id={headingId}
                        variant="h3"
                        align="center"
                        sx={{
                            fontWeight: 400,
                            fontSize: { xs: 18, md: 20 },
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                            mb: { xs: 0.5, md: 1 },
                            color: "text.secondary",
                        }}
                    >
                        {group.category}
                    </Typography>
                    <Box
                        component="ul"
                        aria-labelledby={headingId}
                        sx={{
                            pt: 1,
                            pb: 0,
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
                                <SkillChip skill={skill} />
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
