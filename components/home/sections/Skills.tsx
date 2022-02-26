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
import { Grid, LinearProgress, styled, Typography, linearProgressClasses } from "@mui/material";
import React from "react";

import { useScrollOffset } from "@/components/layout";

const BorderLinearProgress = styled(LinearProgress)({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.bar}`]: {
        borderRadius: 5
    }
});

interface Skill {
    name: string,
    percentage: number,
}

const Skills = (): React.ReactElement => {
    const { ref: rootRef, direction, offset } = useScrollOffset<HTMLDivElement>();

    const leftSideSkills: Skill[] = [
        {
            name: "Programming",
            percentage: 90
        },
        {
            name: "Time-series Analysis",
            percentage: 80
        },
        {
            name: "Databases",
            percentage: 85
        },
        {
            name: "Cloud Computing",
            percentage: 80
        }
    ];
    const rightSideSkills: Skill[] = [
        {
            name: "Leadership",
            percentage: 80
        },
        {
            name: "Teamwork",
            percentage: 95
        },
        {
            name: "Communication",
            percentage: 95
        },
        {
            name: "Attention to Detail",
            percentage: 90
        }
    ];

    const animationOffset = 0.2;
    const currentOffset = direction === 1 ? Math.min(offset + animationOffset, 1) : 1;
    const currentOpacity = direction === -1 ? Math.max(offset - animationOffset, 0) / (1 - animationOffset) : 1;
    const renderPercentage = (skill: Skill): React.ReactElement => {
        const labelId = `skill-${skill.name.toLowerCase().replace(/\s/g, "-")}-progressbar-label`;
        return (
            <Grid item xs={12} md={6} style={{ opacity: currentOpacity }}>
                <Typography id={labelId} sx={{ fontWeight: "bold" }}>{skill.name}</Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={8} sm={10}>
                        <BorderLinearProgress aria-labelledby={labelId} variant="determinate"
                            aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.percentage}
                            value={skill.percentage * currentOffset}/>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        {skill.percentage} %
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    return (
        <Grid ref={rootRef} container spacing={3} justifyContent="center" alignItems="center">
            {
                leftSideSkills.map((leftSideSkill, index) => (
                    <React.Fragment key={leftSideSkill.name}>
                        {renderPercentage(leftSideSkill)}
                        {(index < rightSideSkills.length) ? renderPercentage(rightSideSkills[index]) : null}
                    </React.Fragment>
                ))
            }
        </Grid>
    );
};

export default Skills;
