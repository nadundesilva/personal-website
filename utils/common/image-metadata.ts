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
import { type StaticImageData } from "next/image";

const METADATA_IMAGE_WIDTH = 1080;

/**
 * Resolves the optimized variant that next-image-export-optimizer writes for a
 * static image, so metadata (og:image, JSON-LD, feeds, icons) avoids shipping
 * the full-size original. The library exposes no URL helper, so this mirrors
 * its `<folder>/<name>-opt-<width>.WEBP` naming. It only generates sizes up to
 * the next configured size above the original, hence the width cap.
 */
export const getOptimizedImage = (
    image: StaticImageData,
): { src: string; width: number; height: number } => {
    const name = image.src
        .split("/")
        .pop()!
        .replace(/\.[^.]+$/, "");
    const width = Math.min(METADATA_IMAGE_WIDTH, image.width);
    return {
        src: `/${process.env.nextImageExportOptimizer_exportFolderName}/${name}-opt-${METADATA_IMAGE_WIDTH}.WEBP`,
        width,
        height: Math.round((width * image.height) / image.width),
    };
};

export const getImageType = (src: string): string => {
    const extension = src.split(".").pop()?.toLowerCase();
    switch (extension) {
        case "ico":
            return "image/x-icon";
        case "jpg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "webp":
            return "image/webp";
        case "svg":
            return "image/svg+xml";
        default:
            throw new Error(`Unsupported image type: ${extension}`);
    }
};
