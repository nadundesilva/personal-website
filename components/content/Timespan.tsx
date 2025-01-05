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
import { CalendarMonth } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import type { FormattableTime } from "@/constants/commons";

interface TimespanProps {
    value: FormattableTime;
}

const Timespan = ({ value }: TimespanProps): React.ReactElement => (
    <Typography variant="body1" sx={{ pt: 1, pb: 1, color: grey[700] }}>
        <CalendarMonth /> {value.format()}
    </Typography>
);

export default Timespan;
