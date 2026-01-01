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
}

const LinkButton = ({
    href,
    name,
    icon: Icon,
    target,
}: LinkButtonProps): React.ReactElement => (
    <Link href={href} target={target}>
        <Button
            size="small"
            variant="outlined"
            endIcon={Icon ? <Icon /> : undefined}
            sx={{
                "color": "text.secondary",
                "opacity": 0.85,
                "borderColor": "text.secondary",
                "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                    color: "text.secondary",
                    opacity: 0.85,
                },
                "&:hover": {
                    transform: "translateY(-1px)",
                    opacity: 1,
                    borderColor: "text.secondary",
                },
            }}
        >
            {name}
        </Button>
    </Link>
);

export default LinkButton;
export type { LinkButtonProps };
