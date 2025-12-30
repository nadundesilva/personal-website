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
import { Box } from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";

import type { ImageAsset } from "@/constants/images";

interface PhotoProps {
    photo: ImageAsset;
    float: "left" | "right";
}

const Photo = ({ photo, float }: PhotoProps): React.ReactElement => (
    <Box
        sx={{
            "position": "relative",
            float,
            "height": "auto",
            "width": { xs: "100%", md: "20vw" },
            "my": 2.5,
            "ml": float === "left" ? 0 : 2.5,
            "mr": float === "right" ? 0 : 2.5,
            "borderRadius": 1,
            "overflow": "hidden",
            "transition": "transform 0.3s ease-in-out",
            "&:hover": {
                transform: "translateY(-2px)",
            },
        }}
    >
        <Image
            width={photo.width}
            height={photo.height}
            src={photo.src}
            alt={photo.alt}
            placeholder={photo.blurDataURL === undefined ? undefined : "blur"}
            blurDataURL={photo.blurDataURL}
            style={{
                height: "auto",
                maxWidth: "100%",
                display: "block",
            }}
        />
    </Box>
);

export default Photo;
