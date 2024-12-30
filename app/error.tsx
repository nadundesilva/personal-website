"use client";
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
import { Button, Typography, type Theme, Container, Box } from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import React, { useEffect } from "react";

interface ErrorProps {
    reset: () => void;
    error: Error & { digest?: string };
}

const Error = ({ reset, error }: ErrorProps): React.ReactElement => {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <Container
            sx={{
                height: (theme: Theme) =>
                    `calc(100vh - ${theme.spacing(15)} - ${
                        theme.typography.fontSize
                    }px - ${theme.mixins.toolbar.minHeight ?? 0}px)`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ my: 2 }}>Something went wrong</Typography>
                <Button onClick={reset}>Try Again</Button>
            </Box>
        </Container>
    );
};

export default Error;
