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
import { Box, Container, Typography } from "@mui/material";
import type React from "react";

interface SubHeadingProps {
    children: React.ReactNode;
}

const SubHeading = (props: SubHeadingProps): React.ReactElement => (
    <Container maxWidth={false} disableGutters>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: { xs: 1.5, md: 2 },
            }}
        >
            <Typography
                variant="h3"
                align="center"
                sx={{
                    fontWeight: 400,
                    fontSize: { xs: 22, md: 28 },
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    mb: { xs: 1, md: 1.5 },
                    position: "relative",
                }}
            >
                {props.children}
            </Typography>
            <Box
                sx={{
                    width: { xs: 40, md: 56 },
                    height: 1.5,
                    background: (theme) =>
                        `linear-gradient(90deg, transparent, ${
                            theme.palette.mode === "light"
                                ? theme.palette.primary.main
                                : theme.palette.primary.light
                        }, transparent)`,
                    borderRadius: 1,
                    opacity: 0.7,
                }}
            />
        </Box>
    </Container>
);

export default SubHeading;
