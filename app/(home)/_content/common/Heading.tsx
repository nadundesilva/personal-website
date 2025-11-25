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
import { Box, Container, Typography, useTheme } from "@mui/material";
import type React from "react";

interface HeadingProps {
    children: React.ReactNode;
}

const Heading = (props: HeadingProps): React.ReactElement => {
    const theme = useTheme();

    return (
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
                    variant="h2"
                    align="center"
                    sx={{
                        fontWeight: 500,
                        fontSize: { xs: 36, md: 44 },
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                        mb: { xs: 2.5, md: 3 },
                        color: "text.primary",
                        position: "relative",
                    }}
                >
                    {props.children}
                </Typography>
                <Box
                    sx={{
                        width: { xs: 56, md: 80 },
                        height: 2,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "rgba(0, 0, 0, 0.2)"
                                : "rgba(255, 255, 255, 0.2)",
                        borderRadius: 1,
                    }}
                />
            </Box>
        </Container>
    );
};

export default Heading;
