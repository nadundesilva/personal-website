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
import { Box, Chip, Typography } from "@mui/material";
import type React from "react";

import SkillGroups from "@/constants/skills";

const Skills = (): React.ReactElement => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 4, md: 5 },
            }}
        >
            {SkillGroups.map((group) => (
                <Box key={group.category} sx={{ mt: 2 }}>
                    <Typography
                        variant="h6"
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
                        sx={{
                            pt: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            justifyContent: "center",
                        }}
                    >
                        {group.skills.map((skill) => (
                            <Chip
                                key={skill}
                                label={skill}
                                variant="outlined"
                                sx={{
                                    "transition":
                                        "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        borderColor: "primary.main",
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Skills;
