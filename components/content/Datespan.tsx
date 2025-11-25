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
import { CalendarMonth } from "@mui/icons-material";
import { Typography } from "@mui/material";
import type React from "react";

import type { FormattableDate } from "@/constants/date";

interface DatespanProps {
    value: FormattableDate;
}

const Datespan = ({ value }: DatespanProps): React.ReactElement => (
    <Typography
        variant="body1"
        sx={{
            pt: 1,
            pb: 1,
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
        }}
    >
        <CalendarMonth aria-label={value.type} /> {value.format()}
    </Typography>
);

export default Datespan;
