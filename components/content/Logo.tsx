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
import { Box, useTheme } from "@mui/material";
import Image from "next/image";

import type { LogoAsset } from "@/constants/logos";

interface LogoProps {
    logo: LogoAsset;
    height?: string;
}

const Logo = ({ logo, height }: LogoProps): React.ReactElement => {
    const theme = useTheme();
    return (
        <Box sx={{ position: "relative", height: height ?? "3em", my: 1 }}>
            <Image
                alt={logo.alt}
                src={logo.src(theme.palette.mode)}
                fill
                sizes="100vw"
                style={{
                    objectFit: "scale-down",
                    objectPosition: "left top",
                }}
            />
        </Box>
    );
};

export default Logo;
