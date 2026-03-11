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
"use client";

import { Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
            "borderColor": (theme) =>
                theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.4)
                    : alpha(theme.palette.primary.light, 0.35),
            "transition": (theme) =>
                theme.transitions.create(["transform", "border-color"], {
                    duration: theme.transitions.duration.shorter,
                }),
            "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                color: "text.secondary",
                transition: (theme) =>
                    theme.transitions.create("color", {
                        duration: theme.transitions.duration.shorter,
                    }),
            },
            "&:hover": {
                transform: (theme) =>
                    `translateY(-${theme.motion.hoverLiftSubtle})`,
                borderColor: (theme) => theme.palette.primary.main,
            },
            "&:hover .MuiButton-endIcon, &:hover .MuiButton-startIcon": {
                color: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
            },
        }}
    >
        {name}
    </Button>
);

export default LinkButton;
export type { LinkButtonProps };
