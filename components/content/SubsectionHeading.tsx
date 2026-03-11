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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import { Typography } from "@mui/material";
import type React from "react";

import { LeftAccent } from "@/components/primitives";

interface SubsectionHeadingProps {
    children: React.ReactNode;
    id?: string;
}

const SubsectionHeading = ({
    children,
    id,
}: SubsectionHeadingProps): React.ReactElement => (
    <LeftAccent thickness={2} opacity={0.42} sx={{ mt: 4, mb: 2, pl: 1.5 }}>
        <Typography id={id} variant="h3">
            {children}
        </Typography>
    </LeftAccent>
);

export default SubsectionHeading;
