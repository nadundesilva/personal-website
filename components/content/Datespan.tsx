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
import { Box, type SxProps, type Theme, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type React from "react";

import type { FormattableDate } from "@/constants/date";

interface DatespanProps {
    value: FormattableDate;
    sx?: SxProps<Theme>;
}

const Datespan = ({ value, sx }: DatespanProps): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.875,
            mt: 0.75,
            mb: 2.5,
            ...sx,
        }}
    >
        <Box component="span" sx={visuallyHidden}>
            Date:
        </Box>
        <CalendarMonth
            sx={{
                color: "text.secondary",
                fontSize: "1.125rem",
            }}
            aria-hidden="true"
        />
        <Typography
            variant="body2"
            sx={{
                color: "text.secondary",
                fontWeight: 400,
                letterSpacing: "0.01em",
            }}
        >
            {value.getRenderSegments().map((segment, index) =>
                segment.dateTime ? (
                    <Box
                        key={index}
                        component="time"
                        dateTime={segment.dateTime}
                    >
                        {segment.text}
                    </Box>
                ) : (
                    <span key={index}>{segment.text}</span>
                ),
            )}
        </Typography>
    </Box>
);

export default Datespan;
