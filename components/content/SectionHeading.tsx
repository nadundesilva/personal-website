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

import Datespan from "./Datespan";
import LinkButton, { type LinkButtonProps } from "./LinkButton";

interface SectionHeadingProps {
    children: React.ReactNode;
    date?: FormattableDate;
    logo?: React.ReactElement;
    actionButton?: LinkButtonProps;
}

const SectionHeading = ({
    children,
    date,
    logo,
    actionButton,
}: SectionHeadingProps): React.ReactElement => (
    <Box
        sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-start" },
            gap: { xs: 2, sm: 3 },
            mb: 3,
            mt: 5,
        }}
    >
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
                variant="h3"
                sx={{
                    mb: 0,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                }}
            >
                {children}
            </Typography>
            {date && <Datespan value={date} />}
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
