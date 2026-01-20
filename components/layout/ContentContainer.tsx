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
 * Website: https://nadundesilva.com
 *
 * © 2026 Nadun De Silva. All rights reserved.
 */

import { Container, type ContainerProps } from "@mui/material";
import type React from "react";

const ContentContainer = ({
    children,
    sx,
    maxWidth = false,
    ...props
}: ContainerProps): React.ReactElement => {
    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                px: {
                    xs: 0,
                    lg: 20,
                    xl: 40,
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Container>
    );
};

export default ContentContainer;
