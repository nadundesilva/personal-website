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

import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import type React from "react";

const InlineCodeSegment = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLElement>): React.ReactElement => {
    return (
        <Box
            component="code"
            {...props}
            sx={(theme) => ({
                "fontSize": `calc(${theme.typography.body1.fontSize as string} * 0.875)`,
                "lineHeight": 1,
                "padding": "0.15rem 0.4rem",
                "fontFamily": `${theme.typography.codeFontFamily}, monospace`,
                "backgroundColor": alpha(theme.palette.primary.main, 0.1),
                "border": `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                "borderRadius": "4px",
                "whiteSpace": "nowrap",
                "verticalAlign": "middle",
                ...theme.applyStyles("dark", {
                    backgroundColor: alpha(theme.palette.primary.light, 0.1),
                    borderColor: alpha(theme.palette.primary.light, 0.2),
                }),
                // When inside a <pre> (i.e. a fenced code block), reset all
                // inline-code styling — the code block's own styles take over.
                "pre &": {
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    padding: 0,
                    fontFamily: "inherit",
                    backgroundColor: "transparent",
                    border: 0,
                    borderRadius: 0,
                    whiteSpace: "inherit",
                    verticalAlign: "baseline",
                },
            })}
        >
            {children}
        </Box>
    );
};

export default InlineCodeSegment;
