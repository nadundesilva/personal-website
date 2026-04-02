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
    startIcon?: React.ComponentType;
    endIcon?: React.ComponentType;
    target?: string;
    ariaLabel?: string;
}

const LinkButton = ({
    href,
    name,
    startIcon: StartIcon,
    endIcon: EndIcon,
    target,
    ariaLabel,
}: LinkButtonProps): React.ReactElement => (
    <Button
        component={Link}
        href={href}
        target={target}
        size="small"
        variant="outlined"
        startIcon={StartIcon ? <StartIcon /> : undefined}
        endIcon={EndIcon ? <EndIcon /> : undefined}
        aria-label={ariaLabel}
        sx={(theme) => ({
            "color": "text.secondary",
            "borderColor":
                theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.4)
                    : alpha(theme.palette.primary.light, 0.35),
            "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                color: "text.secondary",
                transition: theme.transitions.create("color", {
                    duration: theme.transitions.duration.shorter,
                }),
            },
            "&:hover": {
                borderColor: theme.palette.primary.main,
            },
            "&:hover .MuiButton-endIcon, &:hover .MuiButton-startIcon": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
            },
        })}
    >
        {name}
    </Button>
);

export default LinkButton;
export type { LinkButtonProps };
