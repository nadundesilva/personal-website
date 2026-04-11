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
import { Box, Typography } from "@mui/material";
import type React from "react";

import { ScrollReveal, HorizontalGradientLine } from "@/components/primitives";

interface TitleProps {
    children: React.ReactNode;
}

const Title = ({ children }: TitleProps): React.ReactElement => (
    <ScrollReveal>
        <Box sx={{ mt: { xs: 4, md: 5 }, mb: 3 }}>
            <Typography variant="h1">{children}</Typography>
            <HorizontalGradientLine
                sx={{ mt: 1.25, width: { xs: 100, md: 160 }, opacity: 0.7 }}
            />
        </Box>
    </ScrollReveal>
);

export default Title;
