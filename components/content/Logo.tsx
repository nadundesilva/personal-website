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
import Image from "next-image-export-optimizer";
import type React from "react";

import { cn } from "@/components/primitives/utils/cn";
import { type LogoImageData } from "@/constants/logos";
import { generateSizesForContentBreakpoints } from "@/utils/common/image-sizes";

// Container: w-full below sm, sm:w-70 (280px) at sm+. Fixed px auto-propagates to md/lg/xl/2xl.
const IMAGE_SIZES = generateSizesForContentBreakpoints({
    sm: { absolute: "280px" }, // fixed — matches sm:w-70 container
});

interface LogoProps extends LogoImageData {
    alt: string;
    className?: string;
}

const Logo = ({
    srcLight,
    srcDark,
    alt,
    className,
}: LogoProps): React.ReactElement => (
    <div
        aria-hidden={alt === "" ? true : undefined}
        className={cn(
            "relative w-full py-2 motion-safe:transition-opacity motion-safe:duration-250 hover:opacity-80",
            className,
        )}
    >
        <Image
            alt={alt}
            src={srcLight}
            fill
            sizes={IMAGE_SIZES}
            className="object-scale-down object-left sm:object-right dark:hidden"
        />
        <Image
            alt={alt}
            src={srcDark}
            fill
            sizes={IMAGE_SIZES}
            className="hidden object-scale-down object-left sm:object-right dark:block"
        />
    </div>
);

export default Logo;
