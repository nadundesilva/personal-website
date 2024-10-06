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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
    Article,
    Twitter,
    School,
} from "@mui/icons-material";
import {
    Container,
    Grid2 as Grid,
    Grow,
    type SvgIcon,
    Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import React from "react";

import { Link } from "@/components/content";
import { useScrollOffset } from "@/components/layout";

interface Profile {
    name: string;
    Icon: typeof SvgIcon;
    link: string;
}

const Profiles = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const profiles: Profile[] = [
        {
            name: "LinkedIn",
            Icon: LinkedIn,
            link: "https://www.linkedin.com/in/nadundesilva",
        },
        {
            name: "GitHub",
            Icon: GitHub,
            link: "https://github.com/nadundesilva",
        },
        {
            name: "Medium",
            Icon: Article,
            link: "https://medium.com/@nadundesilva",
        },
        {
            name: "Google Scholar",
            Icon: School,
            link: "https://scholar.google.com/citations?user=CdXo_YQAAAAJ&hl=en&oi=ao",
        },
        {
            name: "Facebook",
            Icon: Facebook,
            link: "https://www.facebook.com/nadunrds",
        },
        {
            name: "Instagram",
            Icon: Instagram,
            link: "https://www.instagram.com/nadunrds",
        },
        {
            name: "Twitter",
            Icon: Twitter,
            link: "https://twitter.com/nadunrds",
        },
    ];

    return (
        <Grid
            ref={rootRef}
            container
            justifyContent="center"
            alignItems="center"
        >
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
                            <Grow in={offset > 0.5} timeout={1000}>
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
                            </Grow>
                        </Grid>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Profiles;
