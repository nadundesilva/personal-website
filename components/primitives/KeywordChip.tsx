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
 * © 2026 Nadun De Silva. All rights reserved.
 */
"use client";

import { Chip } from "@mui/material";
import type React from "react";

interface KeywordChipProps {
    label: string;
}

const KeywordChip = ({ label }: KeywordChipProps): React.ReactElement => (
    <Chip
        label={label}
        size="keyword"
        variant="outlined"
        color="primary"
        sx={{ cursor: "default" }}
    />
);

export default KeywordChip;
