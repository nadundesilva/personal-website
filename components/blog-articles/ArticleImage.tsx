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
"use client";

import { Grid, Typography } from "@mui/material";
import type React from "react";

import { Image, Link } from "@/components/content";

interface CreatorPlatform {
    name: string;
    href: string;
}

interface Creator {
    name: string;
    href: string;
    platform: CreatorPlatform;
}

interface ArticleImageProps {
    src: string;
    alt: string;
    creator?: Creator;
}

const ArticleImage = ({
    src,
    alt,
    creator,
}: ArticleImageProps): React.ReactElement => (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ py: { xs: 3, sm: 4 } }}
    >
        <Grid
            sx={{
                width: { xs: "100%", sm: "90%", md: "75%" },
            }}
        >
            <Image src={src} alt={alt} />
        </Grid>
        {creator && (
            <Grid sx={{ mt: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        fontWeight: 300,
                    }}
                >
                    Photo by{" "}
                    <Link href={creator.href} target="_blank">
                        {creator.name}
                    </Link>{" "}
                    on{" "}
                    <Link href={creator.platform.href} target="_blank">
                        {creator.platform.name}
                    </Link>
                </Typography>
            </Grid>
        )}
    </Grid>
);

export default ArticleImage;
