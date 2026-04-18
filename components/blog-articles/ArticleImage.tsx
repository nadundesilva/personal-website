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
import type React from "react";

import { Image, Link } from "@/components/content";

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
    src: string;
    alt: string;
    creator?: Creator;
}

const ArticleImage = ({
    src,
    alt,
    creator,
}: ArticleImageProps): React.ReactElement => (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16">
        <div className="w-full sm:w-9/10 md:w-3/4">
            <Image src={src} alt={alt} />
        </div>
        {creator && (
            <p className="text-muted-foreground mt-4 text-sm">
                Photo by{" "}
                <Link href={creator.href} target="_blank">
                    {creator.name}
                </Link>{" "}
                on{" "}
                <Link href={creator.platform.href} target="_blank">
                    {creator.platform.name}
                </Link>
            </p>
        )}
    </div>
);

export default ArticleImage;
