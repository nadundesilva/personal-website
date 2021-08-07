import React from "react";
import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";

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
            <Typography variant="h5" align="center" className={classes.sectionTitleText}>
                {props.children}
            </Typography>
            <Divider/>
        </div>
    );
};

export default Heading;
