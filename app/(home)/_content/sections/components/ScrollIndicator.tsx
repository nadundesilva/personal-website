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
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import type React from "react";

import { WELCOME_BANNER_END_ID } from "../WelcomeBanner";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";

const scrollDot = keyframes`
    0% { transform: translateY(0); opacity: 0.8; }
    80% { transform: translateY(14px); opacity: 0; }
    100% { transform: translateY(14px); opacity: 0; }
`;

const ScrollIndicator = (): React.ReactElement => (
    <ButtonBase
        component="a"
        href={`#${WELCOME_BANNER_END_ID}`}
        aria-label="Scroll to Who Am I section"
        focusRipple
        sx={{
            "borderRadius": 1.5,
            "p": 1,
            "&:focus-visible": {
                outline: (theme) =>
                    `2px solid ${alpha(theme.palette.common.white, 0.9)}`,
                outlineOffset: "4px",
            },
        }}
    >
        <Box
            sx={{
                "width": 24,
                "height": 38,
                "borderRadius": 1.5,
                "border": (theme) =>
                    `2px solid ${alpha(theme.palette.common.white, 0.5)}`,
                "position": "relative",
                "display": "flex",
                "justifyContent": "center",
                "transition": (theme) =>
                    theme.transitions.create("border-color", {
                        duration: theme.transitions.duration.shorter,
                    }),
                "button:hover &": {
                    borderColor: (theme) =>
                        alpha(theme.palette.common.white, 0.9),
                },
            }}
        >
            <Box
                sx={{
                    width: 4,
                    height: 7,
                    borderRadius: 0.25,
                    backgroundColor: (theme) =>
                        alpha(theme.palette.common.white, 0.85),
                    position: "absolute",
                    top: 5,
                    [MOTION_OK_QUERY]: {
                        animation: `${scrollDot} 1.8s ease-in-out infinite`,
                    },
                }}
            />
        </Box>
    </ButtonBase>
);

export default ScrollIndicator;
