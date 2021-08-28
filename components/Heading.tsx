import React from "react";
import { Divider, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionTitle: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3)
        },
        sectionTitleText: {
            fontWeight: "bold",
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5)
        }
    })
);

interface HeadingProps {
    children: React.ReactNode,
};

const Heading = (props: HeadingProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.sectionTitle}>
            <Divider/>
            <Typography variant="h5" component="h2" align="center" className={classes.sectionTitleText}>
                {props.children}
            </Typography>
            <Divider/>
        </div>
    );
};

export default Heading;
