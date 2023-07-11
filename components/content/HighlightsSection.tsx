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
import { Box, Typography } from "@mui/material";

interface HighlightsSectionProps {
    children: React.ReactNode;
}

const HighlightsSection = ({
    children,
}: HighlightsSectionProps): React.ReactElement => (
    <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
        <Typography sx={{ fontWeight: "bold" }}>Highlights:</Typography>
        <ul>{children}</ul>
    </Box>
);

export default HighlightsSection;
