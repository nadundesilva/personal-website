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
    Grid,
    LinearProgress,
    styled,
    Typography,
    linearProgressClasses,
} from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
});

interface Skill {
    name: string;
    percentage: number;
}

const Skills = (): React.ReactElement => {
    const leftSideSkills: Skill[] = [
        {
            name: "Programming",
            percentage: 90,
        },
        {
            name: "Time-series Analysis",
            percentage: 80,
        },
        {
            name: "Databases",
            percentage: 85,
        },
        {
            name: "Cloud Computing",
            percentage: 80,
        },
    ];
    const rightSideSkills: Skill[] = [
        {
            name: "Leadership",
            percentage: 80,
        },
        {
            name: "Teamwork",
            percentage: 95,
        },
        {
            name: "Communication",
            percentage: 95,
        },
        {
            name: "Attention to Detail",
            percentage: 90,
        },
    ];

    const renderPercentage = (skill: Skill): React.ReactElement => {
        const labelId = `skill-${skill.name
            .toLowerCase()
            .replace(/\s/g, "-")}-progressbar-label`;
        return (
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography id={labelId} sx={{ fontWeight: "bold" }}>
                    {skill.name}
                </Typography>
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid size={{ xs: 8, sm: 10 }}>
                        <BorderLinearProgress
                            aria-labelledby={labelId}
                            variant="determinate"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={skill.percentage}
                            value={skill.percentage}
                        />
                    </Grid>
                    <Grid size={{ xs: 4, sm: 2 }}>{skill.percentage} %</Grid>
                </Grid>
            </Grid>
        );
    };

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {leftSideSkills.map((leftSideSkill, index) => (
                <React.Fragment key={leftSideSkill.name}>
                    {renderPercentage(leftSideSkill)}
                    {index < rightSideSkills.length
                        ? renderPercentage(rightSideSkills[index])
                        : null}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default Skills;
