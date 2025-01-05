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
import { Container, Divider, Typography } from "@mui/material";
import React from "react";

interface HeadingProps {
    children: React.ReactNode;
}

const Heading = (props: HeadingProps): React.ReactElement => (
    <Container maxWidth={false} disableGutters sx={{ my: 2 }}>
        <Divider />
        <Typography
            variant="h3"
            align="center"
            sx={{
                fontWeight: "bold",
                py: 5,
            }}
        >
            {props.children}
        </Typography>
        <Divider />
    </Container>
);

export default Heading;
