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
            className="block object-scale-down object-left sm:object-right dark:hidden"
        />
        <Image
            alt={alt}
            src={srcDark}
            fill
            className="hidden object-scale-down object-left sm:object-right dark:block"
        />
    </div>
);

export default Logo;
