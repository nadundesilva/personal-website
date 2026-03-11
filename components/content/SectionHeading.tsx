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

import type { FormattableDate } from "@/constants/date";

import DateInfo from "./DateInfo";
import LinkButton, { type LinkButtonProps } from "./LinkButton";
import { HorizontalGradientLine } from "@/components/primitives";

interface SectionHeadingProps {
    children: React.ReactNode;
    date?: FormattableDate;
    logo?: React.ReactElement;
    actionButton?: LinkButtonProps;
    id?: string;
}

const SectionHeading = ({
    children,
    date,
    logo,
    actionButton,
    id,
}: SectionHeadingProps): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-start" },
            gap: { xs: 2, sm: 3 },
            mb: 3,
            mt: { xs: 4, md: 5 },
        }}
    >
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
                id={id}
                variant="h2"
                sx={{
                    mb: 0,
                }}
            >
                {children}
            </Typography>
            <HorizontalGradientLine
                sx={{
                    width: { xs: 56, md: 80 },
                    mb: date || actionButton ? 0 : 1,
                }}
            />
            {date && <DateInfo value={date} />}
            {actionButton && (
                <Box
                    sx={{
                        mt: date ? 0 : 2.5,
                    }}
                >
                    <LinkButton {...actionButton} target="_blank" />
                </Box>
            )}
        </Box>
        {logo && (
            <Box
                sx={{
                    flexShrink: 0,
                    width: { xs: "100%", sm: "280px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    mt: { xs: 0, sm: 0.25 },
                }}
            >
                {logo}
            </Box>
        )}
    </Box>
);

export default SectionHeading;
