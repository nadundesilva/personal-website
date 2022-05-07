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
import { Box, Typography } from "@mui/material";

interface HighlightsSectionProps {
    children: React.ReactNode;
}

const HighlightsSection = ({
    children,
}: HighlightsSectionProps): React.ReactElement => (
    <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
        <Typography sx={{ fontWeight: "bold" }}>Highlights:</Typography>
        <ul>{children}</ul>
    </Box>
);

export default HighlightsSection;
