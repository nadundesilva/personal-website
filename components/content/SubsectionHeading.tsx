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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import { Box, Typography } from "@mui/material";
import type React from "react";

interface SubsectionHeadingProps {
    children: React.ReactNode;
}

const SubsectionHeading = ({
    children,
}: SubsectionHeadingProps): React.ReactElement => (
    <Box sx={{ mt: 3, mb: 1.5 }}>
        <Typography
            variant="h4"
            sx={{
                fontWeight: 400,
                letterSpacing: "0em",
                lineHeight: 1.4,
            }}
        >
            {children}
        </Typography>
    </Box>
);

export default SubsectionHeading;
