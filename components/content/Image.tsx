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
import { cn } from "@/components/primitives/utils/cn";
import NextImage from "next-image-export-optimizer";
import { type StaticImageData } from "next/image";
import type React from "react";

interface ImageProps {
    src: StaticImageData | string;
    alt: string;
    float?: "left" | "right";
    fill?: boolean;
    sizes?: string;
    className?: string;
}

const Image = ({
    src,
    alt,
    float,
    fill,
    sizes,
    className,
}: ImageProps): React.ReactElement => (
    <div
        className={cn(
            className,
            "overflow-hidden rounded-sm",
            "shadow-(--image-shadow) hover:shadow-(--image-shadow-hover)",
            "motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5",
            fill && "relative",
            float !== undefined && [
                float === "left" ? "float-left" : "float-right",
                "my-5 h-auto w-full md:w-[20vw]",
                float === "left" ? "mr-5 ml-0" : "mr-0 ml-5",
            ],
        )}
    >
        <NextImage
            src={src}
            alt={alt}
            fill={fill}
            sizes={sizes}
            className={fill ? "object-cover" : "block h-auto max-w-full"}
        />
    </div>
);

export default Image;
