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
import { Button } from "@mui/material";
import type React from "react";

import Link from "./Link";

interface LinkButtonProps {
    href: string;
    name: string;
    icon?: React.ComponentType;
    target?: string;
    ariaLabel?: string;
}

const LinkButton = ({
    href,
    name,
    icon: Icon,
    target,
    ariaLabel,
}: LinkButtonProps): React.ReactElement => (
    <Button
        component={Link}
        href={href}
        target={target}
        size="small"
        variant="outlined"
        endIcon={Icon ? <Icon /> : undefined}
        aria-label={ariaLabel}
        sx={{
            "color": "text.secondary",
            "borderColor": "text.secondary",
            "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                color: "text.secondary",
            },
            "&:hover": {
                transform: "translateY(-1px)",
                borderColor: "text.secondary",
            },
        }}
    >
        {name}
    </Button>
);

export default LinkButton;
export type { LinkButtonProps };
