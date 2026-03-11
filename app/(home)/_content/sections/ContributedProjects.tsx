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
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import Projects, { type Project } from "@/constants/projects";
import SubHeading from "../common/SubHeading";

const ContributedProjects = (): React.ReactElement => {
    const theme = useTheme();

    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const imageSizes = `(min-width: ${mdWidth}px) 33vw, (min-width: ${smWidth}px) 34vw, 100vw`;

    const renderProject = (
        project: Project,
        headingComponent: React.ElementType,
    ): React.ReactElement => (
        <Grid key={project.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
                sx={{
                    "height": "100%",
                    "display": "flex",
                    "flexDirection": "column",
                    "transition":
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: (theme) => theme.shadows[4],
                    },
                }}
            >
                <CardActionArea
                    component={Link}
                    href={project.link}
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            p: 3,
                            flexGrow: 1,
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: 80,
                                mb: 3,
                            }}
                        >
                            <Image
                                alt=""
                                fill
                                style={{ objectFit: "contain" }}
                                sizes={imageSizes}
                                src={
                                    theme.palette.mode === "light"
                                        ? project.logo.srcLight
                                        : project.logo.srcDark
                                }
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            component={headingComponent}
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: 500 }}
                        >
                            {project.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.6,
                            }}
                        >
                            {project.description}
                        </Typography>
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
                {renderProject(Projects.Indexity, "h3")}
                {renderProject(Projects.Choreo, "h3")}
                {renderProject(Projects.Ballerina, "h3")}
                {renderProject(Projects.Cellery, "h3")}
                {renderProject(Projects.Siddhi, "h3")}
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
                        {renderProject(Projects.K8sReplicator, "h4")}
                        {renderProject(Projects.MeshManager, "h4")}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ContributedProjects;
