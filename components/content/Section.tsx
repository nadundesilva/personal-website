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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import { Box, Divider } from "@mui/material";
import type React from "react";

interface SectionProps {
    children: React.ReactNode;
}

const Section = ({ children }: SectionProps): React.ReactElement => (
    <Box
        sx={{
            "clear": "both", // Keep preceding floating elements off sections
            "mb": 7,
            "&:not(:last-of-type) .section-divider": {
                display: "block",
            },
        }}
    >
        {children}
        {/* Clearfix element to ensure spacing is measured from bottom of all content including floats */}
        <Box
            sx={{
                clear: "both",
                width: "100%",
                height: 0,
                overflow: "hidden",
            }}
        />
        <Divider
            className="section-divider"
            sx={{
                display: "none",
                width: "100%",
                mt: 7, // Consistent spacing above divider
            }}
        />
    </Box>
);

export default Section;
