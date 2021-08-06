import React from "react";
import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionTitle: {
            margin: theme.spacing(5)
        },
        sectionTitleText: {
            fontWeight: "bold",
            padding: theme.spacing(5)
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
            <Typography variant="h5" align="center" className={classes.sectionTitleText}>
                {props.children}
            </Typography>
            <Divider/>
        </div>
    );
};

export default Heading;
