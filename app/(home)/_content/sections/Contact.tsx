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
 * © 2026 Nadun De Silva. All rights reserved.
 */
import { Email } from "@mui/icons-material";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { alpha, darken } from "@mui/material/styles";
import type React from "react";

import { Link } from "@/components/content";
import { CONTACT_EMAIL } from "@/constants/metadata";
import Profiles from "@/constants/profiles";

const Contact = (): React.ReactElement => (
    <Container maxWidth="lg" disableGutters sx={{ mb: { xs: 8, md: 12 } }}>
        <Card
            elevation={0}
            sx={{
                p: { xs: 4, md: 8 },
                position: "relative",
                overflow: "hidden",
                background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${darken(theme.palette.background.paper, 0.1)} 100%)`,
                border: "1px solid",
                borderColor: (theme) => theme.palette.divider,
            }}
        >
            <Box
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 480,
                    height: 480,
                    borderRadius: "50%",
                    background: (theme) =>
                        `radial-gradient(circle, ${
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.primary.main, 0.09)
                                : alpha(theme.palette.primary.light, 0.05)
                        }, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            <Box
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    bottom: -80,
                    left: -80,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: (theme) =>
                        `radial-gradient(circle, ${
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.primary.main, 0.06)
                                : alpha(theme.palette.primary.light, 0.03)
                        }, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            <Grid
                container
                spacing={6}
                alignItems="center"
                sx={{ position: "relative", zIndex: 1 }}
            >
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography
                        variant="h3"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                    >
                        Let&apos;s build something <br />
                        <Box
                            component="span"
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                            }}
                        >
                            amazing together.
                        </Box>
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            fontWeight: 300,
                            maxWidth: 600,
                            lineHeight: 1.6,
                        }}
                    >
                        I am always open to discussing new opportunities,
                        collaborations, or just having a chat about technology.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {Object.values(Profiles).map((profile) => (
                            <Button
                                key={profile.name}
                                component={Link}
                                href={profile.link}
                                target="_blank"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                variant="outlined"
                                color="inherit"
                                startIcon={<profile.Icon />}
                                sx={{
                                    "borderColor": (theme) =>
                                        theme.palette.mode === "light"
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.33,
                                              )
                                            : alpha(
                                                  theme.palette.primary.light,
                                                  0.27,
                                              ),
                                    "borderRadius": (theme) =>
                                        (theme.shape.borderRadius as number) /
                                        2,
                                    "textTransform": "none",
                                    "transition": (theme) =>
                                        theme.transitions.create(
                                            [
                                                "border-color",
                                                "color",
                                                "background-color",
                                            ],
                                            {
                                                duration:
                                                    theme.transitions.duration
                                                        .shortest,
                                            },
                                        ),
                                    "&:hover": {
                                        borderColor: (theme) =>
                                            theme.palette.primary.main,
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? alpha(
                                                      theme.palette.primary
                                                          .main,
                                                      0.03,
                                                  )
                                                : alpha(
                                                      theme.palette.primary
                                                          .light,
                                                      0.03,
                                                  ),
                                    },
                                }}
                            >
                                {profile.name}
                            </Button>
                        ))}
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "start", md: "center" },
                            justifyContent: "center",
                            height: "100%",
                            p: { xs: 0, md: 4 },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            href={`mailto:${CONTACT_EMAIL}`}
                            aria-label={`Say Hello, send an email to ${CONTACT_EMAIL}`}
                            size="large"
                            startIcon={<Email />}
                            sx={{
                                "py": 2,
                                "px": 6,
                                "borderRadius": 50,
                                "fontSize": "1.2rem",
                                "fontWeight": 700,
                                "transition": (theme) =>
                                    theme.transitions.create("all", {
                                        duration:
                                            theme.transitions.duration.short,
                                    }),
                                "position": "relative",
                                "overflow": "hidden",
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
                                    transform: (theme) =>
                                        `translateY(-${theme.motion.hoverLift})`,
                                },
                                "&:hover::after": {
                                    transform: "translateX(300%)",
                                    transition: (theme) =>
                                        theme.transitions.create("transform", {
                                            duration:
                                                theme.transitions.duration
                                                    .complex * 2,
                                        }),
                                },
                            }}
                        >
                            Say Hello
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    </Container>
);

export default Contact;
