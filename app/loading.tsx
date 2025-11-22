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
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = (): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            pt: "25%",
            height: "100vh",
        }}
    >
        <CircularProgress />
    </Box>
);

export default Loading;
