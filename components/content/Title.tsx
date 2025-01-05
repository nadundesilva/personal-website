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

interface TitleProps {
    children: React.ReactNode;
}

const Title = ({ children }: TitleProps): React.ReactElement => (
    <Box sx={{ p: 0, mb: 3 }}>
        <Typography variant="h2">{children}</Typography>
    </Box>
);

export default Title;
