"use client";
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
import { Box } from "@mui/material";
import type React from "react";

interface ListProps {
    component?: "ul" | "ol";
    children: React.ReactNode;
    ariaLabelledBy?: string;
}

const List = ({
    children,
    ariaLabelledBy,
    component,
}: ListProps): React.ReactElement => (
    <Box
        component={component ?? "ul"}
        aria-labelledby={ariaLabelledBy}
        sx={{
            "my": 0,
            "pl": 2.5,
            "& li": {
                "mb": 1.5,
                "&:last-child": {
                    mb: 0,
                },
            },
        }}
    >
        {children}
    </Box>
);

interface ListItemProps {
    children: React.ReactNode;
}

export const ListItem = ({ children }: ListItemProps): React.ReactElement => (
    <Box
        component="li"
        sx={{
            "&::marker": {
                color: "text.secondary",
            },
        }}
    >
        {children}
    </Box>
);

export default List;
