import React from "react";
import { Container, Divider, Typography } from "@mui/material";

interface HeadingProps {
    children: React.ReactNode,
}

const Heading = (props: HeadingProps): React.ReactElement => (
    <Container maxWidth={false} sx={{ marginTop: 2, marginBottom: 3 }}>
        <Divider/>
        <Typography variant="h5" component="h2" align="center"
            sx={{
                fontWeight: "bold",
                paddingTop: 5,
                paddingBottom: 5
            }}
        >
            {props.children}
        </Typography>
        <Divider/>
    </Container>
);

export default Heading;
