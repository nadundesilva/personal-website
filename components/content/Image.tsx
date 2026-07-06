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
import { cn } from "@/shadcn/lib/cn";
import NextImage from "next-image-export-optimizer";
import { type StaticImageData } from "next/image";
import type React from "react";

import { generateSizesForContentBreakpoints } from "@/utils/common/image-sizes";

// Mirrors the float CSS classes exactly — update both together.
const FLOAT_IMAGE_SIZES = generateSizesForContentBreakpoints({
    xl: { viewportFraction: 0.2 }, // 1/5 content width; auto-expands to 2xl with correct 640px padding
    lg: { viewportFraction: 0.25 }, // 1/4 content width
    md: { viewportFraction: 1 / 3 }, // 1/3 content width
});

// Full ContentContainer content width at every breakpoint.
const FULL_WIDTH_SIZES = generateSizesForContentBreakpoints({});

interface ImageProps {
    src: StaticImageData | string;
    alt: string;
    float?: "left" | "right";
    fill?: boolean;
    sizes?: string;
    fetchPriority?: "high" | "low" | "auto";
    loading?: "eager" | "lazy";
    className?: string;
}

const Image = ({
    src,
    alt,
    float,
    fill,
    sizes,
    fetchPriority,
    loading,
    className,
}: ImageProps): React.ReactElement => {
    const effectiveSizes =
        sizes ?? (float !== undefined ? FLOAT_IMAGE_SIZES : FULL_WIDTH_SIZES);
    const effectiveLoading =
        loading ?? (fetchPriority === "high" ? "eager" : undefined);
    return (
        <div
            className={cn(
                className,
                "overflow-hidden rounded-sm",
                "shadow-(--image-shadow) hover:shadow-(--image-shadow-hover)",
                "motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5",
                fill && "relative",
                float !== undefined && [
                    float === "left" ? "float-left" : "float-right",
                    "my-5 h-auto w-full",
                    "md:w-[calc(33.3333vw-21.3333px)]", // 1/3 × content width (viewport − md padding)
                    "lg:w-[calc(25vw-40px)]", // 1/4 × content width (viewport − lg padding)
                    "xl:w-[calc(20vw-64px)]", // 1/5 × content width (viewport − xl padding)
                    "2xl:w-[calc(20vw-128px)]", // 1/5 × content width (viewport − 2xl padding)
                    float === "left" ? "mr-5" : "ml-5",
                ],
            )}
        >
            <NextImage
                src={src}
                alt={alt}
                fill={fill}
                sizes={effectiveSizes}
                fetchPriority={fetchPriority}
                loading={effectiveLoading}
                className={fill ? "object-cover" : undefined}
            />
        </div>
    );
};

export default Image;
