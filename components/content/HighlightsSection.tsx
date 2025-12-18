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

import { List } from "@/components/content";

interface HighlightsSectionProps {
    children: React.ReactNode;
}

const HighlightsSection = ({
    children,
}: HighlightsSectionProps): React.ReactElement => (
    <Box
        sx={{
            "mt": 4,
            "pt": 3.5,
            "position": "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "divider",
                opacity: 0.12,
            },
        }}
    >
        <Typography
            variant="h6"
            sx={{
                mb: 2.5,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
            }}
        >
            Highlights
        </Typography>
        <List>{children}</List>
    </Box>
);

export default HighlightsSection;
