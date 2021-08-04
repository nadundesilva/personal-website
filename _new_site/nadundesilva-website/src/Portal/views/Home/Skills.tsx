import React from "react";
import { createStyles, Grid, LinearProgress, makeStyles, Typography, withStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        skillName: {
            fontWeight: "bold"
        }
    })
);

const BorderLinearProgress = withStyles(() =>
    createStyles({
        root: {
            height: 10,
            borderRadius: 5
        },
        bar: {
            borderRadius: 5
        }
    })
)(LinearProgress);

interface Skill {
    name: string,
    percentage: number,
}

const Skills = (): React.ReactElement => {
    const classes = useStyles();
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
    const renderPercentage = (skill: Skill): React.ReactElement => (
        <Grid item xs={6}>
            <Typography className={classes.skillName}>{skill.name}</Typography>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={10}>
                    <BorderLinearProgress variant="determinate" value={skill.percentage}/>
                </Grid>
                <Grid item xs={2}>
                    {skill.percentage} %
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {
                leftSideSkills.map((leftSideSkill, index) => (
                    <React.Fragment key={leftSideSkill.name}>
                        {renderPercentage(leftSideSkill)}
                        {(index < rightSideSkills.length) ? renderPercentage(leftSideSkill) : null}
                    </React.Fragment>
                ))
            }
        </Grid>
    );
};

export default Skills;
