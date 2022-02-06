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
import { Box, Grid, Slide } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/Layout";

const ballerina = "/assets/projects/ballerina.svg";
const ballerinaWhite = "/assets/projects/ballerina-white.svg";
const cellery = "/assets/projects/cellery.svg";
const celleryWhite = "/assets/projects/cellery-white.svg";
const siddhi = "/assets/projects/siddhi.svg";
const siddhiWhite = "/assets/projects/siddhi-white.svg";
const choreo = "/assets/projects/choreo.svg";
const choreoWhite = "/assets/projects/choreo-white.svg";

const ProjectLogo = styled(Image)(({ theme }) => ({
    display: "block",
    margin: "auto",
    padding: theme.spacing(5),
    width: "100%"
}));

const ContributedProjects = (): React.ReactElement => {
    const theme = useTheme();
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 34vw, 
        (min-width: ${mdWidth}px) 25vw`;
    const renderCarouselItem = (imageLink: string, blackThemeImageLink: string, alt: string): React.ReactElement => (
        <Grid item xs={12} sm={4} md={3}>
            <Slide direction={"up"} in={offset > 0.5} timeout={2000}>
                <Box
                    sx={{
                        position: "relative",
                        height: (theme) => theme.spacing(5),
                        marginLeft: 5,
                        marginRight: 5
                    }}
                >
                    <ProjectLogo alt={alt} layout="fill" objectFit="contain" sizes={imageSizes}
                        src={theme?.palette?.mode === "light" ? imageLink : blackThemeImageLink}/>
                </Box>
            </Slide>
        </Grid>
    );

    return (
        <Grid ref={rootRef} container spacing={3} justifyContent="center" alignItems="center">
            {renderCarouselItem(choreo, choreoWhite, "Choreo")}
            {renderCarouselItem(ballerina, ballerinaWhite, "Ballerina")}
            {renderCarouselItem(cellery, celleryWhite, "Cellery")}
            {renderCarouselItem(siddhi, siddhiWhite, "Siddhi")}
        </Grid>
    );
};

export default ContributedProjects;
