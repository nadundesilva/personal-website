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
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

import { ImageAsset } from "@/constants";

interface PhotoProps {
    photo: ImageAsset,
    float: "left" | "right",
}

const Photo = ({ photo, float }: PhotoProps): React.ReactElement => (
    <Box sx={{
        position: "relative",
        float: float,
        height: "auto",
        width: { xs: "100%", md: "20vw" },
        my: 2,
        ml: float === "left" ? 0 : 2,
        mr: float === "right" ? 0 : 2
    }}>
        <Image layout="intrinsic" width={photo.width} height={photo.height}
            src={photo.src} alt={photo.alt} placeholder="blur" blurDataURL={photo.blurDataURL}/>
    </Box>
);

export default Photo;
