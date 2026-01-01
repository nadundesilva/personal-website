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
import { KeyboardArrowDown } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    Typography,
    styled,
    useTheme,
} from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";
import { FULL_NAME } from "@/constants/metadata";

import welcomeBannerImage from "@/assets/banner.jpg";

const WelcomeText = styled(Typography)({
    "color": "#ffffff",
    "fontSize": 44,
    "fontWeight": 300,
    "letterSpacing": "-0.05em",
    "textShadow": "0 2px 24px rgba(0, 0, 0, 0.4)",
    "@media (min-width:600px)": {
        fontSize: 60,
    },
    "@media (min-width:900px)": {
        fontSize: 72,
        letterSpacing: "-0.06em",
    },
}) as typeof Typography;

const WelcomeBanner = (): React.ReactElement => {
    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ position: "relative" }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))",
                    zIndex: 2,
                }}
            />
            <Grid
                container
                sx={{
                    "position": "absolute",
                    "textAlign": "center",
                    "top": 0,
                    "bottom": 0,
                    "left": 0,
                    "right": 0,
                    "pt": { xs: 12, md: 20 },
                    "pb": { xs: 10, md: 12 },
                    "px": { xs: 2, sm: 3, md: 4 },
                    "zIndex": 3,
                    "alignItems": "flex-start",
                    "justifyContent": "center",
                    "overflowY": "auto",
                    "scrollbarWidth": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    "@keyframes fadeInUp": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(16px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
            >
                <Grid size={12}>
                    <WelcomeText
                        component="h1"
                        mb={{ xs: 1.5, md: 2 }}
                        sx={{
                            animation: "fadeInUp 1s ease-out",
                        }}
                    >
                        Hi, I am
                    </WelcomeText>
                    <WelcomeText
                        component="h1"
                        mb={{ xs: 3, md: 4 }}
                        sx={{
                            animation: "fadeInUp 1s ease-out 0.1s both",
                        }}
                    >
                        Nadun De Silva
                    </WelcomeText>
                    <Box
                        width={40}
                        height={1}
                        mx="auto"
                        mb={{ xs: 3, md: 4 }}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            animation: "fadeInUp 1s ease-out 0.15s both",
                        }}
                    />
                    <Typography
                        component="p"
                        mb={{ xs: 5, md: 6 }}
                        sx={{
                            color: "#ffffff",
                            fontSize: { xs: 18, sm: 22, md: 24 },
                            fontWeight: 300,
                            opacity: 0.9,
                            letterSpacing: "0.04em",
                            textShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
                            animation: "fadeInUp 1s ease-out 0.2s both",
                        }}
                    >
                        Lead Software Engineer &amp; Cloud Computing Enthusiast
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Link href="/nadundesilva-cv.pdf" target="_blank">
                        <Button
                            variant="outlined"
                            sx={{
                                "borderColor": "rgba(255, 255, 255, 0.85)",
                                "color": "#ffffff",
                                "borderWidth": 1,
                                "px": { xs: 5, md: 6 },
                                "py": { xs: 1.5, md: 2 },
                                "letterSpacing": "0.06em",
                                "textTransform": "uppercase",
                                "fontSize": { xs: 12, md: 13 },
                                "borderRadius": 0,
                                "transition":
                                    "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "animation": "fadeInUp 1s ease-out 0.25s both",
                                "&:hover": {
                                    borderColor: "#ffffff",
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.12)",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
                                },
                            }}
                        >
                            View CV
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    position: "relative",
                    height: `calc(100dvh - ${theme.mixins.toolbar.minHeight ?? 0}px)`,
                }}
            >
                <Image
                    src={welcomeBannerImage}
                    alt={`${FULL_NAME}'s Website Welcome Banner`}
                    fill
                    style={{ objectFit: "cover", zIndex: 1 }}
                />
            </Container>
            <Box
                role="presentation"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1.25}
                sx={{
                    position: "absolute",
                    bottom: { xs: 32, md: 48 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                }}
            >
                <Typography
                    sx={{
                        color: "#ffffff",
                        opacity: 0.87,
                        fontSize: { xs: 9, sm: 10 },
                        letterSpacing: "0.12em",
                        fontWeight: 400,
                        textTransform: "uppercase",
                    }}
                >
                    Scroll down
                </Typography>
                <KeyboardArrowDown
                    sx={{
                        "color": "#ffffff",
                        "opacity": 0.7,
                        "fontSize": { xs: 20, md: 24 },
                        "animation": "bounce 3s infinite ease-in-out",
                        "@keyframes bounce": {
                            "0%, 100%": {
                                transform: "translateY(0)",
                                opacity: 0.7,
                            },
                            "50%": {
                                transform: "translateY(4px)",
                                opacity: 0.5,
                            },
                        },
                    }}
                />
            </Box>
        </Container>
    );
};

export default WelcomeBanner;
