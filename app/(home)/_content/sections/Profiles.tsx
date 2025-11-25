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
import { Container, Grid, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type React from "react";

import { Link } from "@/components/content";
import profiles from "@/constants/profiles";

const Profiles = (): React.ReactElement => (
    <Grid container justifyContent="center" alignItems="center">
        {profiles.map(({ name, Icon, link }) => (
            <Grid size={{ xs: 12, sm: 3 }} key={name}>
                <Link href={link} target="_blank" aria-label={name}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            "p": (theme: Theme) => theme.spacing(4),
                            "cursor": "pointer",
                            "&:hover": {
                                background: (theme: Theme) =>
                                    theme.palette.mode === "light"
                                        ? "#cccccc"
                                        : "#444444",
                            },
                            "color": (theme: Theme) =>
                                theme.palette.mode === "light"
                                    ? "black"
                                    : "white",
                        }}
                    >
                        <Container disableGutters>
                            <Grid
                                size={6}
                                sx={{
                                    margin: "auto",
                                    textAlign: "center",
                                }}
                            >
                                <Icon
                                    sx={{
                                        margin: 1,
                                    }}
                                    fontSize="large"
                                />
                            </Grid>
                            <Grid
                                size={6}
                                sx={{
                                    margin: "auto",
                                    textAlign: "center",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Container>
                    </Grid>
                </Link>
            </Grid>
        ))}
    </Grid>
);

export default Profiles;
