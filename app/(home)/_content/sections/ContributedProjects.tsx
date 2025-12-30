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
    Card,
    CardActionArea,
    Container,
    Grid,
    useTheme,
} from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";

import SubHeading from "../common/SubHeading";
import { Project, Projects } from "@/constants/projects";

const ContributedProjects = (): React.ReactElement => {
    const theme = useTheme();

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 34vw, (min-width: ${mdWidth}px) 25vw`;

    const renderProject = (project: Project): React.ReactElement => (
        <Grid key={project.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: "100%" }}>
                <CardActionArea
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ height: "100%" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: { xs: 2, md: 2.5 },
                            height: "100%",
                            minHeight: 140,
                        }}
                    >
                        <Container
                            maxWidth={false}
                            disableGutters
                            sx={{
                                "position": "relative",
                                "width": "100%",
                                "height": "100%",
                                "opacity": 0.85,
                                "transition":
                                    "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Image
                                alt={project.logo.alt}
                                fill
                                style={{ objectFit: "contain" }}
                                sizes={imageSizes}
                                src={project.logo.src[theme.palette.mode]}
                            />
                        </Container>
                    </Box>
                </CardActionArea>
            </Card>
        </Grid>
    );

    return (
        <>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="stretch"
            >
                {renderProject(Projects.Indexity)}
                {renderProject(Projects.Choreo)}
                {renderProject(Projects.Ballerina)}
                {renderProject(Projects.Cellery)}
                {renderProject(Projects.Siddhi)}
            </Grid>
            <Box sx={{ mt: { xs: 8, md: 10 } }}>
                <SubHeading>Personal Projects</SubHeading>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{ my: { xs: 3, md: 6 } }}
                >
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        {renderProject(Projects.K8sReplicator)}
                        {renderProject(Projects.MeshManager)}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ContributedProjects;
