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
import React from "react";

import welcomeBannerImage from "@/assets/banner.webp";
import { Link, LinkButton } from "@/components/content";
import { FULL_NAME, TAGLINE } from "@/constants/metadata";
import Profiles from "@/constants/profiles";
import { EnterpriseProjects } from "@/constants/projects";
import { CvPdfPath } from "@/constants/routes";
import Skills from "@/constants/skills";
import {
    Separator,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/shadcn/ui";
import {
    YEARS_EXPERIENCE_INCREMENT,
    calculateYearsOfExperienceForDisplay,
} from "@/utils/common/experience";
import AnimatedStatValue from "./components/AnimatedStatValue";
import ScrollIndicator from "./components/ScrollIndicator";

const WELCOME_BANNER_END_ID = "welcome-banner-end";

const projectCount = Object.keys(EnterpriseProjects).length;
const skillCount = Object.keys(Skills).length;
const yearsExp = calculateYearsOfExperienceForDisplay();

const STATS = [
    {
        id: "years-exp",
        value: yearsExp.value,
        prefix: yearsExp.prefix,
        suffix: yearsExp.suffix,
        step: YEARS_EXPERIENCE_INCREMENT,
        label: "Years Exp.",
    },
    {
        id: "project-contributions",
        value: projectCount,
        prefix: undefined,
        suffix: undefined,
        step: 1,
        label: (
            <>
                Enterprise
                <br />
                Project
                <br />
                Contributions
            </>
        ),
    },
    {
        id: "skills",
        value: skillCount,
        prefix: undefined,
        suffix: "+",
        step: 1,
        label: "Skills",
    },
];

const WelcomeBanner = (): React.ReactElement => {
    return (
        <div className="relative flex min-h-lvh flex-col overflow-hidden">
            {/* Three-layer vignette — z-3 so it sits above auras and darkens the edges uniformly */}
            <div
                aria-hidden={true}
                className="pointer-events-none absolute inset-0 z-3"
            >
                <div className="absolute inset-0 bg-linear-to-r from-black/45 to-transparent to-30%" />
                <div className="absolute inset-0 bg-linear-to-l from-black/45 to-transparent to-30%" />
                <div className="absolute inset-0 bg-(--home-hero-vignette-radial)" />
                <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/85" />
            </div>

            {/* Auras — z-2, above the background image (z-1) and below the vignette (z-3) */}
            <div
                aria-hidden={true}
                className="pointer-events-none absolute inset-0 z-2"
            >
                <div className="absolute top-[5%] left-[5%] size-87.5 rounded-full bg-(--home-aura-1-color) opacity-15 blur-[80px] motion-safe:animate-(--animate-home-aura-1-drift) md:size-130" />
                <div className="absolute right-[5%] bottom-[10%] size-75 rounded-full bg-(--home-aura-2-color) opacity-15 blur-[80px] motion-safe:animate-(--animate-home-aura-2-drift) md:size-110" />
            </div>

            {/* Background image */}
            <div className="absolute inset-0 z-1">
                <Image
                    src={welcomeBannerImage}
                    alt=""
                    fill
                    className="object-cover object-center saturate-75"
                    sizes="100vw"
                    preload
                />
            </div>

            {/* Centered glassmorphism card */}
            <div className="relative z-4 flex flex-1 items-center justify-center px-4 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 md:pt-[calc(5rem+env(safe-area-inset-top))] md:pb-[calc(2rem+env(safe-area-inset-bottom))] short-h:pt-[calc(3rem+env(safe-area-inset-top))] short-h:pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                <div className="w-[88vw] max-w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-[20px] sm:w-130 sm:px-6 sm:py-7 md:w-145 md:px-7 md:py-8 lg:w-155 lg:px-10 lg:py-12 short-h:py-3">
                    {/* "Hi, I am" overline */}
                    <p className="mb-2 text-[11px] font-normal tracking-[0.35em] text-(--home-accent-on-dark) uppercase motion-safe:animate-fade-in-up sm:text-[12px] lg:text-[13px] short-h:mb-1">
                        Hi, I am
                    </p>

                    {/* Name */}
                    <h1
                        translate="no"
                        className="mb-4 text-[44px] leading-[1.1] font-light tracking-[-0.03em] text-wrap-balance text-(--home-accent-on-dark) motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.15s] sm:text-[54px] md:mb-6 lg:text-[64px] short-h:mb-3"
                    >
                        {FULL_NAME}
                    </h1>

                    {/* Gradient divider */}
                    <div
                        aria-hidden={true}
                        className="mx-auto mb-4 h-px w-20 bg-linear-to-r from-transparent via-white/40 to-transparent motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.25s] sm:w-24 md:mb-6 lg:w-28 short-h:mb-3"
                    />

                    {/* Tagline */}
                    <p className="mb-3 text-[15px] leading-relaxed font-light text-white/80 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.35s] sm:text-[17px] md:mb-5 lg:text-[18px] short-h:mb-4">
                        {TAGLINE}
                    </p>

                    {/* View CV button */}
                    <div className="mb-7 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.45s] md:mb-8 short-h:mb-4">
                        <LinkButton
                            href={CvPdfPath}
                            name="View CV"
                            target="_blank"
                            ariaLabel="View CV (PDF document)"
                            prefetch={false}
                            className="h-auto min-w-40 rounded-full border-transparent bg-(--home-cv-button-bg) px-8 py-3 text-[13px] tracking-wider text-white hover:border-transparent hover:bg-(--home-cv-button-bg-hover) hover:text-white motion-safe:transition-colors motion-safe:duration-250 md:min-w-48 md:px-10 md:py-3 md:text-[14px]"
                        />
                    </div>

                    {/* Stats row — hidden on very short viewports */}
                    <dl
                        aria-label="Key statistics"
                        className="mb-5 flex flex-row items-start justify-center motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.55s] md:mb-6 short-h:hidden"
                    >
                        {STATS.map((stat, index) => (
                            <React.Fragment key={stat.id}>
                                {index > 0 && (
                                    // Plain div instead of <Separator> — @base-ui/react/separator
                                    // always renders role="separator" internally and ignores any
                                    // role override passed as a prop, so it cannot be used as a
                                    // purely decorative divider inside a <dl>.
                                    <div
                                        aria-hidden={true}
                                        className="w-px shrink-0 self-stretch bg-white/20"
                                    />
                                )}
                                <div className="flex flex-col-reverse px-2 text-center sm:px-6">
                                    <dt className="mt-1 text-[11px] tracking-[0.08em] text-white/70 uppercase lg:text-[12px]">
                                        {stat.label}
                                    </dt>
                                    <dd className="text-[22px] leading-[1.1] font-bold text-(--home-accent-on-dark) sm:text-[26px] lg:text-[28px]">
                                        <AnimatedStatValue
                                            value={stat.value}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            step={stat.step}
                                        />
                                    </dd>
                                </div>
                            </React.Fragment>
                        ))}
                    </dl>

                    {/* Thin divider above social icons */}
                    <Separator
                        aria-hidden={true}
                        className="mb-3 bg-white/15 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.65s] md:mb-4 short-h:mb-2"
                    />

                    {/* Social icons */}
                    <ul
                        role="list"
                        aria-label="Social profiles"
                        className="flex justify-center gap-6 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.65s] md:gap-7"
                    >
                        {[
                            Profiles.LinkedIn,
                            Profiles.GitHub,
                            Profiles.Medium,
                            Profiles.Instagram,
                        ].map(({ name, Icon, url }) => (
                            <li key={name}>
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Link
                                                href={url}
                                                target="_blank"
                                                rel="me"
                                                aria-label={`Visit ${name} profile`}
                                                className="flex items-center text-white/65 hover:text-white hover:no-underline hover:opacity-85 motion-safe:transition-[color,opacity] motion-safe:duration-200"
                                            />
                                        }
                                    >
                                        <Icon size={20} aria-hidden={true} />
                                    </TooltipTrigger>
                                    <TooltipContent>{name}</TooltipContent>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mouse-outline scroll indicator */}
            <div className="relative z-4 mt-4 flex flex-col items-center gap-2.5 pb-[calc(2rem+env(safe-area-inset-bottom))] motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.75s] md:mt-0 md:pb-[calc(3rem+env(safe-area-inset-bottom))]">
                <ScrollIndicator scrollToTargetId={WELCOME_BANNER_END_ID} />
            </div>

            {/* Hidden anchor at the very end of the banner */}
            <div id={WELCOME_BANNER_END_ID} aria-hidden={true} />
        </div>
    );
};

export default WelcomeBanner;
