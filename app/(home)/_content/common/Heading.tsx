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

interface HeadingProps {
    children: React.ReactNode;
    id?: string;
    number?: number;
}

const Heading = (props: HeadingProps): React.ReactElement => {
    return (
        <Container maxWidth={false} disableGutters>
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: { xs: 1.5, md: 2 },
                }}
            >
                {props.number !== undefined && (
                    <Typography
                        aria-hidden="true"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -55%)",
                            fontSize: { xs: 112, md: 160 },
                            fontWeight: 800,
                            letterSpacing: "-0.04em",
                            color: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                            opacity: 0.06,
                            lineHeight: 1,
                            userSelect: "none",
                            pointerEvents: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {String(props.number).padStart(2, "0")}
                    </Typography>
                )}
                <Typography
                    id={props.id}
                    variant="h2"
                    align="center"
                    sx={{
                        fontSize: { xs: 36, md: 44 },
                        mb: { xs: 2.5, md: 3 },
                        color: (theme) => theme.palette.text.primary,
                        position: "relative",
                    }}
                >
                    {props.children}
                </Typography>
                <Box
                    sx={{
                        width: { xs: 56, md: 80 },
                        height: 2,
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
};

export default Heading;
