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
    type TypographyProps,
    type CSSProperties,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Image from "next-image-export-optimizer";
import React from "react";
import { FULL_NAME, TAGLINE } from "@/constants/metadata";

import welcomeBannerImage from "@/assets/banner.webp";

const WelcomeText = (props: TypographyProps): React.ReactElement => (
    <Typography
        component="h1"
        {...props}
        sx={{
            color: "#ffffff",
            fontSize: { xs: 32, sm: 44, md: 60, lg: 72 },
            fontWeight: 300,
            textShadow: "0 2px 24px rgba(0, 0, 0, 0.4)",
            ...props.sx,
        }}
    />
);

const WelcomeBanner = (): React.ReactElement => {
    const theme = useTheme();
    const isShortScreen = useMediaQuery("(max-height: 500px)");

    const minHeightStyles = React.useMemo(() => {
        const mapToolbarStyles = (styleObj: CSSProperties): CSSProperties =>
            Object.entries(styleObj).reduce<CSSProperties>(
                (styles, [key, value]) => {
                    if (key === "minHeight") {
                        if (typeof value === "number") {
                            styles[key] = `calc(100dvh - ${value}px)`;
                        } else if (
                            typeof value === "string" &&
                            /\d/.test(value)
                        ) {
                            styles[key] = `calc(100dvh - ${value})`;
                        }
                    } else if (
                        typeof value === "object" &&
                        value !== null &&
                        !Array.isArray(value)
                    ) {
                        const nestedStyles = mapToolbarStyles(
                            value as CSSProperties,
                        );
                        if (Object.keys(nestedStyles).length > 0) {
                            styles[key] = nestedStyles;
                        }
                    }
                    return styles;
                },
                {},
            );

        return mapToolbarStyles(theme.mixins.toolbar);
    }, [theme.mixins.toolbar]);

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                position: "relative",
                ...minHeightStyles,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Ensure background image doesn't overflow
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                }}
            >
                <Image
                    src={welcomeBannerImage}
                    alt={`${FULL_NAME}'s Website Welcome Banner`}
                    fill
                    style={{ objectFit: "cover" }}
                    preload
                />
            </Box>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: "relative",
                    zIndex: 3,
                    flex: 1,
                    textAlign: "center",
                    pt: isShortScreen ? 2 : { xs: 8, md: 16 },
                    pb: isShortScreen ? 2 : { xs: 4, md: 6 },
                    px: { xs: 2, sm: 3, md: 4 }, // Width-based (native MUI)
                }}
            >
                <Grid size={12}>
                    <WelcomeText
                        mb={isShortScreen ? 0.5 : { xs: 1.5, md: 2 }}
                        sx={{
                            letterSpacing: "-0.05em",
                            animation: "fadeInUp 1s ease-out",
                        }}
                    >
                        Hi, I am
                    </WelcomeText>
                    <WelcomeText
                        mb={isShortScreen ? 0.5 : { xs: 3, md: 4 }}
                        sx={{
                            letterSpacing: { xs: "-0.05em", md: "-0.06em" },
                            animation: "fadeInUp 1s ease-out 0.1s both",
                        }}
                    >
                        Nadun De Silva
                    </WelcomeText>
                    <Box
                        width={40}
                        height={1}
                        mx="auto"
                        mb={isShortScreen ? 1 : { xs: 3, md: 4 }}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            animation: "fadeInUp 1s ease-out 0.15s both",
                        }}
                    />
                    <Typography
                        component="p"
                        mb={isShortScreen ? 2 : { xs: 5, md: 6 }}
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
                        {TAGLINE}
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

            <Box
                role="presentation"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1.25}
                sx={{
                    position: "relative",
                    zIndex: 3,
                    pb: { xs: 4, md: 6 },
                    mt: { xs: 2, md: 0 },
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
