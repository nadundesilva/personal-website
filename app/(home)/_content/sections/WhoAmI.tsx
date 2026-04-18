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

import { calculateYearsOfExperienceForDisplay } from "@/utils/common/experience";

import profilePhotoImage from "@/assets/profile-photo.webp";
import { CurrentExperience } from "@/constants/experience";

const WhoAmI = (): React.ReactElement => {
    const {
        value,
        prefix = "",
        suffix = "",
    } = calculateYearsOfExperienceForDisplay();
    const yearsDisplay = `${prefix}${value}${suffix}`;
    return (
        <div className="mx-auto max-w-215">
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
                {/* Profile photo */}
                <div className="w-full lg:w-5/12">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-(--home-image-shadow) hover:shadow-(--home-image-shadow-hover) motion-safe:transition-[box-shadow,transform] motion-safe:duration-300 motion-safe:hover:scale-[1.015]">
                        <Image
                            src={profilePhotoImage}
                            alt="Profile photo of Nadun De Silva"
                            fill
                            sizes="(max-width: 600px) 100vw, 400px"
                            className="object-cover object-top"
                        />
                    </div>
                </div>

                {/* Text content */}
                <div className="w-full lg:w-7/12">
                    {/* Overline */}
                    <p className="text-primary mb-3 text-[11px] font-normal tracking-[0.14em] uppercase">
                        {yearsDisplay} years of experience
                    </p>

                    {/* Job title */}
                    <p className="text-primary mb-4 text-[22px] leading-snug font-light tracking-[-0.02em] sm:text-[24px] md:text-[26px]">
                        {CurrentExperience.name}
                    </p>

                    {/* Gradient accent rule */}
                    <div
                        aria-hidden="true"
                        className="mb-5 h-px w-9 bg-linear-to-r from-primary to-transparent"
                    />

                    {/* Bio */}
                    <p className="text-foreground/80 text-[15px] leading-[1.85] font-light md:text-base">
                        Background in cloud-native application development for
                        Kubernetes and cloud platforms. Proven track record in
                        architecting, developing, and deploying scalable
                        applications, while ensuring site reliability in
                        production environments. Skilled in defining technical
                        direction and leading engineering teams to deliver
                        high-impact solutions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhoAmI;
