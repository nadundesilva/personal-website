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

import { type LogoImageData } from "@/constants/logos";
import { cn } from "@/shadcn/lib/cn";
import { generateSizesForContentBreakpoints } from "@/utils/common/image-sizes";

interface LogoProps extends LogoImageData {
    alt: string;
    height: number; // Rendered height in em.
    className?: string;
    fetchPriority?: "high" | "low" | "auto" | undefined;
}

// Logos are height-limited (object-scale-down), so the rendered width is the
// height times the aspect ratio. sizes resolves em against the root font size,
// which matches the page since no ancestor overrides it.
const logoSizes = (src: LogoImageData["srcLight"], height: number): string =>
    generateSizesForContentBreakpoints({
        default: { absolute: `${String((height * src.width) / src.height)}em` },
    });

const Logo = ({
    srcLight,
    srcDark,
    alt,
    height,
    className,
    fetchPriority,
}: LogoProps): React.ReactElement => (
    <div
        aria-hidden={alt === "" ? true : undefined}
        className={cn(
            "relative w-full py-2 motion-safe:transition-opacity motion-safe:duration-250 hover:opacity-80",
            className,
        )}
        style={{ height: `${String(height)}em` }}
    >
        <Image
            data-testid="logo-light"
            alt={alt}
            src={srcLight}
            fill
            sizes={logoSizes(srcLight, height)}
            fetchPriority={fetchPriority}
            loading={fetchPriority === "high" ? "eager" : undefined}
            className="object-scale-down object-left sm:object-right dark:hidden"
        />
        <Image
            data-testid="logo-dark"
            alt=""
            aria-hidden={true}
            src={srcDark}
            fill
            sizes={logoSizes(srcDark, height)}
            fetchPriority={fetchPriority}
            loading={fetchPriority === "high" ? "eager" : undefined}
            className="hidden object-scale-down object-left sm:object-right dark:block"
        />
    </div>
);

export default Logo;
