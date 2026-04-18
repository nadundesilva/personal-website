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

import { Paragraph } from "@/components/content";
import { HorizontalGradientLine, ScrollReveal } from "@/components/primitives";
import { calculateYearsOfExperienceForDisplay } from "@/utils/common/experience";
import { generateSizesForContentBreakpoints } from "@/utils/common/image-sizes";

import profilePhotoImage from "@/assets/profile-photo.webp";
import { CurrentExperience } from "@/constants/experience";

// lg+ photo lives in a max-w-215 grid cell (~335px fixed — max-w caps growth).
// Below lg: clamp(290px, calc(50vw-24px), 340px) scales 296→340px in the sm range,
// stays flat through md, then transitions ~5px at lg.
const PHOTO_SIZES = generateSizesForContentBreakpoints({
    lg: { absolute: "360px" }, // fixed — photo in max-w-215 grid cell ≈ 335px; auto-expands to xl/2xl
    sm: { absolute: "340px" }, // fixed — clamp max; browser downloads ≤340px source at sm/md
});

const WhoAmI = (): React.ReactElement => {
    const {
        value,
        prefix = "",
        suffix = "",
    } = calculateYearsOfExperienceForDisplay();
    const yearsDisplay = `${prefix}${value}${suffix}`;
    return (
        <ScrollReveal>
            <div className="mx-auto max-w-215">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
                    {/* Profile photo */}
                    <div className="relative aspect-square w-full sm:w-[calc(50vw-24px)] sm:min-w-72.5 sm:max-w-85 mx-auto lg:mx-0 lg:w-full overflow-hidden rounded-lg shadow-(--image-shadow) hover:shadow-(--image-shadow-hover) motion-safe:transition-[box-shadow,transform] motion-safe:duration-300 motion-safe:hover:scale-[1.015]">
                        <Image
                            src={profilePhotoImage}
                            alt="Nadun De Silva"
                            fill
                            sizes={PHOTO_SIZES}
                            className="object-cover object-top"
                        />
                    </div>

                    {/* Text content */}
                    <div>
                        {/* Overline */}
                        <p className="text-primary mb-3 text-[11px] font-normal tracking-[0.14em] uppercase">
                            {yearsDisplay} years of experience
                        </p>

                        {/* Current role */}
                        <p className="text-foreground/80 mb-4 text-[15px] font-normal leading-snug sm:text-base">
                            <span className="sr-only">Current role: </span>
                            {CurrentExperience.name}
                        </p>

                        {/* Gradient accent rule */}
                        <HorizontalGradientLine className="mt-0 mb-5 h-px w-9 opacity-100" />

                        {/* Bio */}
                        <Paragraph
                            textAlign="start"
                            className="text-foreground/80 leading-[1.85] font-light md:text-base"
                        >
                            Background in cloud-native application development
                            for Kubernetes and cloud platforms. Proven track
                            record in architecting, developing, and deploying
                            scalable applications, while ensuring site
                            reliability in production environments. Skilled in
                            defining technical direction and leading engineering
                            teams to deliver high-impact solutions.
                        </Paragraph>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default WhoAmI;
