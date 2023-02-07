/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CalendarMonth } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import type { FormattableTime } from "@/constants/commons";

interface TimespanProps {
    value: FormattableTime;
}

const Timespan = ({ value }: TimespanProps): React.ReactElement => (
    <Typography variant={"body1"} sx={{ pt: 1, pb: 1, color: grey[700] }}>
        <CalendarMonth /> {value.format()}
    </Typography>
);

export default Timespan;
