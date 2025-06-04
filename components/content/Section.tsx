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
import { Box } from "@mui/material";

interface SectionProps {
    children: React.ReactNode;
}

const Section = ({ children }: SectionProps): React.ReactElement => (
    <Box
        sx={{
            clear: "both", // Keep preceding floating elements off sections
        }}
    >
        {children}
    </Box>
);

export default Section;
