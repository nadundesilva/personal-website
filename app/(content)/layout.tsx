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

import { Container } from "@mui/material";
import React from "react";

import { RouterBreadcrumbs } from "@/components/layout";

interface ContentLayoutProps {
    children: React.ReactNode;
}

const ContentLayout = ({
    children,
}: ContentLayoutProps): React.ReactElement => (
    <Container
        maxWidth={false}
        sx={{
            mb: 5,
            px: {
                xs: 0,
                lg: 20,
                xl: 40,
            },
        }}
    >
        <RouterBreadcrumbs />
        <Container maxWidth={false}>{children}</Container>
    </Container>
);

export default ContentLayout;
