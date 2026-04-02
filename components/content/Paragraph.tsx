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
import { Typography } from "@mui/material";
import type React from "react";

interface ParagraphProps {
    children: React.ReactNode;
    id?: string;
}

const Paragraph = ({ children, id }: ParagraphProps): React.ReactElement => (
    <Typography
        id={id}
        variant="body1"
        sx={{
            m: 0,
            mb: 2.5,
            // Intentional: justified text gives content pages an editorial, document-like appearance.
            // Disabled on xs to avoid uneven word spacing on narrow screens.
            textAlign: { xs: "left", sm: "justify" },
        }}
    >
        {children}
    </Typography>
);

export default Paragraph;
