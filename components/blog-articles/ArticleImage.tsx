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
import type { StaticImageData } from "next/image";
import type React from "react";

import { Image, Link } from "@/components/content";
import { generateSizesForContentBreakpoints } from "@/utils/common/image-sizes";

interface CreatorPlatform {
    name: string;
    href: string;
}

interface Creator {
    name: string;
    href: string;
    platform: CreatorPlatform;
}

interface ArticleImageProps {
    src: StaticImageData;
    alt: string;
    creator?: Creator;
}

const ArticleImage = ({
    src,
    alt,
    creator,
}: ArticleImageProps): React.ReactElement => (
    <figure className="flex flex-col items-center justify-center py-12 sm:py-16">
        {/* image narrows from full width to 55% as reading column widens;
            each breakpoint: fraction × (viewport − container padding) */}
        <div className="w-full sm:w-[calc(90vw-43.2px)] md:w-[calc(75vw-48px)] lg:w-[calc(65vw-104px)] xl:w-[calc(55vw-176px)] 2xl:w-[calc(55vw-352px)]">
            <Image
                src={src}
                alt={alt}
                sizes={generateSizesForContentBreakpoints({
                    xl: { viewportFraction: 0.55 }, // 55% × content width; auto-expands to 2xl with correct 640px padding
                    lg: { viewportFraction: 0.65 }, // 65% × content width (viewport − lg padding)
                    md: { viewportFraction: 0.75 }, // 75% × content width (viewport − md padding)
                    sm: { viewportFraction: 0.9 }, // 90% × content width (viewport − sm padding)
                })}
            />
        </div>
        {creator && (
            <figcaption className="text-muted-foreground mt-4 text-sm">
                Photo by{" "}
                <Link href={creator.href} target="_blank">
                    {creator.name}
                </Link>{" "}
                on{" "}
                <Link href={creator.platform.href} target="_blank">
                    {creator.platform.name}
                </Link>
            </figcaption>
        )}
    </figure>
);

export default ArticleImage;
