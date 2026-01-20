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

interface TitleProps {
    children: React.ReactNode;
}

const Title = ({ children }: TitleProps): React.ReactElement => (
    <Box sx={{ mt: 7, mb: 1 }}>
        <Typography
            component="h1"
            variant="h2"
            sx={{
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
            }}
        >
            {children}
        </Typography>
    </Box>
);

export default Title;
