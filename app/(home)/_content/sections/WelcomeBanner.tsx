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
import {
    Box,
    Button,
    Container,
    Grid,
    Link as MuiLink,
    Typography,
    type TypographyProps,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import Image from "next-image-export-optimizer";
import React from "react";
import { Link } from "@/components/content";
import { FULL_NAME, TAGLINE } from "@/constants/metadata";

import welcomeBannerImage from "@/assets/banner.webp";

// Use MUI Link (plain anchor) as the inner component instead of Next.js Link
// so the router does not treat the PDF path as a Next.js route and attempt to
// prefetch its RSC tree, which would produce a 404 console error.
const PdfLink = (
    props: React.ComponentPropsWithRef<typeof Link>,
): React.ReactElement => <Link component={MuiLink} {...props} />;

const WelcomeText = (props: TypographyProps): React.ReactElement => (
    <Typography
        {...props}
        sx={{
            color: (theme) => theme.palette.common.white,
            fontSize: { xs: 32, sm: 44, md: 60, lg: 72 },
            fontWeight: 300,
            textShadow: (theme) =>
                `0 2px 24px ${alpha(theme.palette.common.black, 0.4)}`,
            ...props.sx,
        }}
    />
);

const WelcomeBanner = (): React.ReactElement => {
    const fadeInUp = keyframes`
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // Animates the dot inside the mouse-outline scroll indicator at the bottom of the banner
    const scrollDot = keyframes`
        0% { transform: translateY(0); opacity: 0.8; }
        80% { transform: translateY(14px); opacity: 0; }
        100% { transform: translateY(14px); opacity: 0; }
    `;

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                position: "relative",
                minHeight: "100lvh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Ensure background image doesn't overflow
            }}
        >
            {/* Three-layer vignette: side darkening + radial center spotlight + base top-to-bottom */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background: (theme) =>
                        `linear-gradient(to right, ${alpha(theme.palette.common.black, 0.45)}, transparent 30%, transparent 70%, ${alpha(theme.palette.common.black, 0.45)}), radial-gradient(ellipse at center, transparent 25%, ${alpha(theme.palette.common.black, 0.55)} 78%), linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.35)}, ${alpha(theme.palette.common.black, 0.85)})`,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                }}
            >
                {/* Slight desaturation + dimming gives an editorial, moody tone */}
                {/* preload + fetchPriority="high" because this is the LCP
                    element — the browser must start loading it immediately */}
                <Image
                    src={welcomeBannerImage}
                    alt=""
                    fill
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "saturate(0.75) brightness(1.0)",
                    }}
                    sizes="100vw"
                    preload
                    fetchPriority="high"
                />
            </Box>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    "position": "relative",
                    "zIndex": 3,
                    "flex": 1,
                    "textAlign": "center",
                    "pt": { xs: 8, md: 16 },
                    "pb": { xs: 4, md: 6 },
                    "px": { xs: 2, sm: 3, md: 4 }, // Width-based (native MUI)
                    // Reduce vertical padding on very short viewports (e.g. landscape
                    // mobile) where the full padding would compress the content
                    "@media (max-height: 500px)": {
                        pt: 2,
                        pb: 2,
                    },
                }}
            >
                <Grid size={12}>
                    <WelcomeText
                        component="p"
                        mb={{ xs: 1.5, md: 2 }}
                        sx={{
                            "fontSize": { xs: 18, sm: 24, md: 32, lg: 38 },
                            "letterSpacing": "-0.03em",
                            "opacity": 0.75,
                            "animation": `${fadeInUp} 1s ease-out`,
                            "@media (max-height: 500px)": {
                                mb: 1.5,
                            },
                        }}
                    >
                        Hi, I am
                    </WelcomeText>
                    <WelcomeText
                        component="h1"
                        mb={{ xs: 3, md: 4 }}
                        sx={{
                            "letterSpacing": { xs: "-0.05em", md: "-0.06em" },
                            "animation": `${fadeInUp} 1s ease-out 0.1s both`,
                            "@media (max-height: 500px)": {
                                mb: 2,
                            },
                        }}
                    >
                        {FULL_NAME}
                    </WelcomeText>
                    <Box
                        mx="auto"
                        mb={{ xs: 3, md: 4 }}
                        sx={{
                            "width": 120,
                            "height": 2,
                            "background": (theme) =>
                                `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.6)}, transparent)`,
                            "animation": `${fadeInUp} 1s ease-out 0.15s both`,
                            "@media (max-height: 500px)": {
                                mb: 2,
                            },
                        }}
                    />
                    <Typography
                        component="p"
                        mb={{ xs: 5, md: 6 }}
                        sx={{
                            "color": (theme) => theme.palette.common.white,
                            "fontSize": { xs: 18, sm: 22, md: 24 },
                            "fontWeight": 300,
                            "opacity": 0.9,
                            "letterSpacing": "0.04em",
                            "textShadow": (theme) =>
                                `0 1px 12px ${alpha(theme.palette.common.black, 0.25)}`,
                            "animation": `${fadeInUp} 1s ease-out 0.2s both`,
                            "@media (max-height: 500px)": {
                                mb: 3,
                            },
                        }}
                    >
                        {TAGLINE}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Button
                        variant="outlined"
                        component={PdfLink}
                        href="/nadundesilva-cv.pdf"
                        target="_blank"
                        aria-label="View CV (PDF document)"
                        sx={{
                            "position": "relative",
                            "overflow": "hidden",
                            "borderColor": (theme) =>
                                alpha(theme.palette.common.white, 0.85),
                            "color": (theme) => theme.palette.common.white,
                            "borderWidth": 1,
                            "px": { xs: 5, md: 6 },
                            "py": { xs: 1.5, md: 2 },
                            "letterSpacing": "0.06em",
                            "textTransform": "uppercase",
                            "fontSize": { xs: 12, md: 13 },
                            "borderRadius": 0,
                            "transition": (theme) =>
                                theme.transitions.create("all", {
                                    duration: theme.transitions.duration.short,
                                }),
                            "animation": `${fadeInUp} 1s ease-out 0.25s both`,
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "60%",
                                height: "100%",
                                background: (theme) =>
                                    `linear-gradient(105deg, transparent 20%, ${alpha(theme.palette.common.white, 0.18)} 50%, transparent 80%)`,
                                transform: "translateX(-200%)",
                                transition: "none",
                            },
                            "&:hover": {
                                borderColor: (theme) =>
                                    theme.palette.common.white,
                                backgroundColor: (theme) =>
                                    alpha(theme.palette.common.white, 0.12),
                                transform: (theme) =>
                                    `translateY(-${theme.motion.hoverLiftSubtle})`,
                                boxShadow: (theme) =>
                                    `0 2px 12px ${alpha(theme.palette.common.black, 0.25)}`,
                            },
                            "&:hover::after": {
                                transform: "translateX(300%)",
                                transition: (theme) =>
                                    theme.transitions.create("transform", {
                                        duration:
                                            theme.transitions.duration.complex *
                                            2,
                                    }),
                            },
                        }}
                    >
                        View CV
                    </Button>
                </Grid>
            </Grid>

            {/* Mouse-outline scroll indicator: outer box = mouse body, inner box = animated dot */}
            <Box
                role="presentation"
                aria-hidden="true"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1.25}
                sx={{
                    position: "relative",
                    zIndex: 3,
                    pb: { xs: 4, md: 6 },
                    mt: { xs: 2, md: 0 },
                    animation: `${fadeInUp} 1s ease-out 0.4s both`,
                }}
            >
                <Box
                    sx={{
                        width: 24,
                        height: 38,
                        borderRadius: 1.5,
                        border: (theme) =>
                            `2px solid ${alpha(theme.palette.common.white, 0.5)}`,
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 4,
                            height: 7,
                            borderRadius: 0.25,
                            backgroundColor: (theme) =>
                                alpha(theme.palette.common.white, 0.85),
                            position: "absolute",
                            top: 5,
                            animation: `${scrollDot} 1.8s ease-in-out infinite`,
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default WelcomeBanner;
