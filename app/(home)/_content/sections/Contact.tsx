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
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type React from "react";

import Profiles from "@/constants/profiles";
import { CONTACT_EMAIL } from "@/constants/metadata";
import { Link } from "@/components/content";
import { Email } from "@mui/icons-material";

const Contact = (): React.ReactElement => (
    <Container maxWidth="lg" disableGutters sx={{ mb: { xs: 8, md: 12 } }}>
        <Card
            elevation={0}
            sx={{
                p: { xs: 4, md: 8 },
                position: "relative",
                overflow: "hidden",
                background: (theme) =>
                    theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #1A2027 0%, #121212 100%)"
                        : "linear-gradient(135deg, #F3F6F9 0%, #FFFFFF 100%)",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Grid container spacing={6} alignItems="center">
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography
                        variant="h3"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                    >
                        Let&apos;s build something <br />
                        <Box component="span" sx={{ color: "primary.main" }}>
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
                                    "borderColor": "divider",
                                    "borderRadius": 4,
                                    "textTransform": "none",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        color: "primary.main",
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "rgba(255, 255, 255, 0.05)"
                                                : "rgba(0, 0, 0, 0.02)",
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
                                "transition": "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
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
