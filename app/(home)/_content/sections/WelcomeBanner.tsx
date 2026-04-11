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
    Link as MuiLink,
    Typography,
} from "@mui/material";

export const WELCOME_BANNER_END_ID = "welcome-banner-end";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import Image from "next-image-export-optimizer";
import React from "react";
import { Link } from "@/components/content";
import {
    MOTION_OK_QUERY,
    SHORT_VIEWPORT_QUERY,
} from "@/components/theme/media-queries";
import { FULL_NAME, TAGLINE } from "@/constants/metadata";
import Profiles from "@/constants/profiles";
import Projects from "@/constants/projects";
import Skills from "@/constants/skills";
import {
    YEARS_EXPERIENCE_INCREMENT,
    calculateYearsOfExperienceForDisplay,
} from "@/utils/common/experience";

import welcomeBannerImage from "@/assets/banner.webp";
import AnimatedStatValue from "./components/AnimatedStatValue";
import ScrollIndicator from "./components/ScrollIndicator";
import SpotlightCard from "./components/SpotlightCard";

// Use MUI Link (plain anchor) as the inner component instead of Next.js Link
// so the router does not treat the PDF path as a Next.js route and attempt to
// prefetch its RSC tree, which would produce a 404 console error.
const PdfLink = (
    props: React.ComponentPropsWithRef<typeof Link>,
): React.ReactElement => <Link component={MuiLink} {...props} />;

const STATS_FADE_IN_DELAY_MS = 550;

const HERO_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

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

const nameShimmer = keyframes`
    0%, 30% { background-position: 100% center; }
    70%, 100% { background-position: 0% center; }
`;

const blobDrift1 = keyframes`
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -30px) scale(1.08); }
`;

const blobDrift2 = keyframes`
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, 25px) scale(0.94); }
`;

const projectCount = Object.keys(Projects).length;
const skillCount = Object.keys(Skills).length;
const yearsExp = calculateYearsOfExperienceForDisplay();

const STATS = [
    {
        value: yearsExp.value,
        prefix: yearsExp.prefix,
        suffix: yearsExp.suffix,
        step: YEARS_EXPERIENCE_INCREMENT,
        label: "Years Exp.",
    },
    {
        value: projectCount,
        prefix: undefined,
        suffix: undefined,
        step: 1,
        label: "Projects",
    },
    {
        value: skillCount,
        prefix: undefined,
        suffix: "+",
        step: 1,
        label: "Skills",
    },
];

const WelcomeBanner = (): React.ReactElement => {
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

            {/* Aurora blobs — coloured ambient light above the vignette, below the content */}
            <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: { xs: 350, md: 520 },
                        height: { xs: 350, md: 520 },
                        borderRadius: "50%",
                        top: "5%",
                        left: "5%",
                        background: "#88BDF2",
                        filter: "blur(80px)",
                        opacity: 0.15,
                        [MOTION_OK_QUERY]: {
                            animation: `${blobDrift1} 12s ease-in-out infinite`,
                        },
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        width: { xs: 300, md: 440 },
                        height: { xs: 300, md: 440 },
                        borderRadius: "50%",
                        bottom: "10%",
                        right: "5%",
                        background: "#9370db",
                        filter: "blur(80px)",
                        opacity: 0.12,
                        [MOTION_OK_QUERY]: {
                            animation: `${blobDrift2} 16s ease-in-out infinite`,
                        },
                    }}
                />
            </Box>

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

            {/* Centered glassmorphism card */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 3,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 8, md: 10 },
                    pb: { xs: 2, md: 4 },
                    [SHORT_VIEWPORT_QUERY]: {
                        pt: 6,
                        pb: 1,
                    },
                }}
            >
                <SpotlightCard
                    sx={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        background: (theme) =>
                            alpha(theme.palette.common.white, 0.08),
                        border: (theme) =>
                            `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
                        borderRadius: 2,
                        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                        width: {
                            xs: "88vw",
                            sm: "520px",
                            md: "580px",
                            lg: "620px",
                        },
                        maxWidth: "100%",
                        px: { xs: 2, sm: 3, md: 3.5, lg: 5 },
                        py: { xs: 2.5, sm: 3.5, md: 4, lg: 6 },
                        textAlign: "center",
                        [SHORT_VIEWPORT_QUERY]: {
                            py: 1.5,
                        },
                    }}
                >
                    {/* "Hi, I am" overline */}
                    <Typography
                        component="p"
                        sx={{
                            color: "#88BDF2",
                            fontSize: { xs: 11, sm: 12, md: 12, lg: 13 },
                            letterSpacing: "0.35em",
                            textTransform: "uppercase",
                            fontWeight: 400,
                            mb: 1,
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0s both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 0.5 },
                        }}
                    >
                        Hi, I am
                    </Typography>

                    {/* Name */}
                    <Typography
                        component="h1"
                        sx={{
                            background:
                                "linear-gradient(90deg, #88BDF2 0%, #88BDF2 45%, #BDDDFC 48%, #ffffff 50%, #BDDDFC 52%, #88BDF2 55%, #88BDF2 100%)",
                            backgroundSize: "500% auto",
                            backgroundRepeat: "no-repeat",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontSize: { xs: 44, sm: 54, md: 54, lg: 64 },
                            fontWeight: 300,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            mb: { xs: 2, md: 3 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.15s both, ${nameShimmer} 9s linear 1.5s infinite`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 1.5 },
                        }}
                    >
                        {FULL_NAME}
                    </Typography>

                    {/* Gradient divider */}
                    <Box
                        mx="auto"
                        sx={{
                            width: { xs: 80, sm: 100, lg: 120 },
                            height: "1px",
                            background: (theme) =>
                                `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.4)}, transparent)`,
                            mb: { xs: 2, md: 3 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.25s both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 1.5 },
                        }}
                    />

                    {/* Tagline */}
                    <Typography
                        component="p"
                        sx={{
                            color: (theme) => theme.palette.common.white,
                            opacity: 0.8,
                            fontSize: { xs: 15, sm: 17, md: 17, lg: 18 },
                            fontWeight: 300,
                            lineHeight: 1.6,
                            mb: { xs: 2.5, md: 3.5 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.35s both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 2 },
                        }}
                    >
                        {TAGLINE}
                    </Typography>

                    {/* View CV button */}
                    <Box
                        sx={{
                            mb: { xs: 2.5, md: 3 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.45s both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 2 },
                        }}
                    >
                        <Button
                            variant="contained"
                            component={PdfLink}
                            href="/nadundesilva-cv.pdf"
                            target="_blank"
                            aria-label="View CV (PDF document)"
                            fullWidth
                            sx={{
                                "backgroundColor": "#384959",
                                "color": (theme) => theme.palette.common.white,
                                "borderRadius": "100px",
                                "px": { xs: 4, md: 5 },
                                "py": { xs: 1.25, md: 1.5 },
                                "fontSize": { xs: 13, md: 14 },
                                "letterSpacing": "0.05em",
                                "boxShadow": "none",
                                "textTransform": "none",
                                "display": "block",
                                [MOTION_OK_QUERY]: {
                                    transition: (theme) =>
                                        theme.transitions.create(
                                            "background-color",
                                            {
                                                duration:
                                                    theme.transitions.duration
                                                        .short,
                                            },
                                        ),
                                },
                                "&:hover": {
                                    backgroundColor: "#4a6785",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            View CV
                        </Button>
                    </Box>

                    {/* Stats row — hidden on very short viewports */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            mb: { xs: 2.5, md: 3 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} ${STATS_FADE_IN_DELAY_MS}ms both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: {
                                display: "none",
                            },
                        }}
                    >
                        {STATS.map((stat, index) => (
                            <React.Fragment key={stat.label}>
                                {index > 0 && (
                                    <Box
                                        sx={{
                                            width: "1px",
                                            height: 32,
                                            backgroundColor: (theme) =>
                                                alpha(
                                                    theme.palette.common.white,
                                                    0.2,
                                                ),
                                        }}
                                    />
                                )}
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        px: { xs: 2, sm: 3 },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#88BDF2",
                                            fontSize: {
                                                xs: 22,
                                                sm: 26,
                                                lg: 28,
                                            },
                                            fontWeight: 700,
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        <AnimatedStatValue
                                            value={stat.value}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            step={stat.step}
                                            startDelay={STATS_FADE_IN_DELAY_MS}
                                        />
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: (theme) =>
                                                alpha(
                                                    theme.palette.common.white,
                                                    0.55,
                                                ),
                                            fontSize: { xs: 9, sm: 10, lg: 11 },
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            mt: 0.5,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </React.Fragment>
                        ))}
                    </Box>

                    {/* Thin divider above social icons */}
                    <Box
                        sx={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.common.white, 0.15),
                            mb: { xs: 1.5, md: 2 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.65s both`,
                            },
                            [SHORT_VIEWPORT_QUERY]: { mb: 1 },
                        }}
                    />

                    {/* Social icons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: { xs: 3, md: 3.5 },
                            [MOTION_OK_QUERY]: {
                                animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.65s both`,
                            },
                        }}
                    >
                        {[
                            Profiles.LinkedIn,
                            Profiles.GitHub,
                            Profiles.Medium,
                            Profiles.Instagram,
                        ].map(({ name, Icon, link }) => (
                            <MuiLink
                                key={name}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${name} profile`}
                                sx={{
                                    "color": (theme) =>
                                        alpha(theme.palette.common.white, 0.5),
                                    "display": "flex",
                                    "alignItems": "center",
                                    [MOTION_OK_QUERY]: {
                                        transition: (theme) =>
                                            theme.transitions.create(
                                                "opacity",
                                                {
                                                    duration:
                                                        theme.transitions
                                                            .duration.shorter,
                                                },
                                            ),
                                    },
                                    "&:hover": {
                                        opacity: 0.85,
                                        color: (theme) =>
                                            theme.palette.common.white,
                                    },
                                }}
                            >
                                <Icon sx={{ fontSize: 20 }} />
                            </MuiLink>
                        ))}
                    </Box>
                </SpotlightCard>
            </Box>

            {/* Mouse-outline scroll indicator */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1.25}
                sx={{
                    position: "relative",
                    zIndex: 3,
                    pb: { xs: 4, md: 6 },
                    mt: { xs: 2, md: 0 },
                    [MOTION_OK_QUERY]: {
                        animation: `${fadeInUp} 0.8s ${HERO_EASING} 0.75s both`,
                    },
                }}
            >
                <ScrollIndicator />
            </Box>

            {/* Hidden anchor at the very end of the banner */}
            <Box
                id={WELCOME_BANNER_END_ID}
                aria-hidden="true"
                sx={{ height: 0 }}
            />
        </Container>
    );
};

export default WelcomeBanner;
