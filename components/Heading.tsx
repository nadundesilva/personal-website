import React from "react";
import { Container, Divider, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

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
}

const Heading = (props: HeadingProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.sectionTitle}>
            <Divider/>
            <Typography variant="h5" component="h2" align="center" className={classes.sectionTitleText}>
                {props.children}
            </Typography>
            <Divider/>
        </Container>
    );
};

export default Heading;
