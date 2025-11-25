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
import { Box, Grid, Typography } from "@mui/material";
import type React from "react";

import { Link } from "@/components/content";
import profiles from "@/constants/profiles";

const Profiles = (): React.ReactElement => (
    <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
        {Object.values(profiles).map(({ name, Icon, link }) => (
            <Grid key={name} size={{ xs: 6, sm: 3 }}>
                <Link href={link} target="_blank" aria-label={name}>
                    <Box
                        sx={{
                            "display": "flex",
                            "flexDirection": "column",
                            "alignItems": "center",
                            "justifyContent": "center",
                            "height": "100%",
                            "p": 4,
                            "borderRadius": 2,
                            "transition":
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "border": "1px solid",
                            "borderColor": "divider",
                            "&:hover": {
                                "backgroundColor": "action.hover",
                                "transform": "translateY(-1px)",
                                "borderColor": "primary.main",
                                "& .MuiSvgIcon-root": {
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: 40,
                                mb: 2,
                                transition:
                                    "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                color: "text.secondary",
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                letterSpacing: "0em",
                                textAlign: "center",
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>
                </Link>
            </Grid>
        ))}
    </Grid>
);

export default Profiles;
