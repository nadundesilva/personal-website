/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faFacebook, faGithub, faInstagram, faLinkedin, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Grow, Link, styled, Typography } from "@mui/material";
import React from "react";

import { useScrollOffset } from "@/components/layout";

const ProfileIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    margin: theme.spacing(1)
}));

interface Profile {
    name: string,
    icon: IconDefinition,
    link: string,
}

const Profiles = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const profiles: Profile[] = [
        {
            name: "LinkedIn",
            icon: faLinkedin,
            link: "https://www.linkedin.com/in/nadundesilva"
        },
        {
            name: "GitHub",
            icon: faGithub,
            link: "https://github.com/nadundesilva"
        },
        {
            name: "Medium",
            icon: faMedium,
            link: "https://medium.com/@nadundesilva"
        },
        {
            name: "Google Scholar",
            icon: faGraduationCap,
            link: "https://scholar.google.com/citations?user=CdXo_YQAAAAJ&hl=en&oi=ao"
        },
        {
            name: "Facebook",
            icon: faFacebook,
            link: "https://www.facebook.com/nadunrds"
        },
        {
            name: "Instagram",
            icon: faInstagram,
            link: "https://www.instagram.com/nadunrds"
        },
        {
            name: "Twitter",
            icon: faTwitter,
            link: "https://twitter.com/nadunrds"
        }
    ];

    return (
        <Grid ref={rootRef} container justifyContent="center" alignItems="center">
            {
                profiles.map((profile, index) => (
                    <Grid item xs={12} sm={3} key={profile.name}>
                        <Link target={"_blank"} href={profile.link}>
                            <Grid container direction="column" justifyContent="center" alignItems="center"
                                sx={{
                                    padding: (theme) => theme.spacing(4),
                                    cursor: "pointer",
                                    "&:hover": {
                                        background: (theme) => theme.palette.mode === "light" ? "#cccccc" : "#444444"
                                    },
                                    color: (theme) => theme.palette.mode === "light" ? "black" : "white"
                                }}
                            >
                                <Grow in={offset > 0.5} timeout={1000}>
                                    <Container disableGutters>
                                        <Grid item xs={6} sx={{ margin: "auto", textAlign: "center" }}>
                                            <ProfileIcon icon={profile.icon} size="3x"/>
                                        </Grid>
                                        <Grid item xs={6} sx={{ margin: "auto", textAlign: "center" }}>
                                            <Typography sx={{ fontWeight: "bold" }}>
                                                {profile.name}
                                            </Typography>
                                        </Grid>
                                    </Container>
                                </Grow>
                            </Grid>
                        </Link>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Profiles;
