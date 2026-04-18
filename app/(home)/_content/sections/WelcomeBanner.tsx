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
import { FULL_NAME, TAGLINE } from "@/constants/metadata";
import Profiles from "@/constants/profiles";
import Projects from "@/constants/projects";
import { CvPdfPath } from "@/constants/routes";
import Skills from "@/constants/skills";
import {
    YEARS_EXPERIENCE_INCREMENT,
    calculateYearsOfExperienceForDisplay,
} from "@/utils/common/experience";
import AnimatedStatValue from "./components/AnimatedStatValue";
import ScrollIndicator from "./components/ScrollIndicator";
import SpotlightCard from "./components/SpotlightCard";

const WELCOME_BANNER_END_ID = "welcome-banner-end";

// Use a plain anchor instead of Next.js Link so the router does not treat the
// PDF path as a Next.js route and attempt to prefetch its RSC tree.
const PdfLink = (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
): React.ReactElement => <a {...props} />;

const STATS_FADE_IN_DELAY_MS = 550;

const projectCount = Object.keys(Projects).length;
const skillCount = Object.keys(Skills).length;
const yearsExp = calculateYearsOfExperienceForDisplay();

const STATS = [
    {
        value: yearsExp.value,
        prefix: yearsExp.prefix,
        suffix: yearsExp.suffix,
        step: YEARS_EXPERIENCE_INCREMENT,
        label: "Years Exp.",
    },
    {
        value: projectCount,
        prefix: undefined,
        suffix: undefined,
        step: 1,
        label: "Projects",
    },
    {
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
            {/* Three-layer vignette */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-2"
            >
                <div className="absolute inset-0 bg-linear-to-r from-black/45 to-transparent to-30%" />
                <div className="absolute inset-0 bg-linear-to-l from-black/45 to-transparent to-30%" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_78%)]" />
                <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/85" />
            </div>

            {/* Auras */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-2"
            >
                <div className="absolute top-[5%] left-[5%] size-87.5 rounded-full bg-(--home-accent-on-dark) opacity-15 blur-[80px] motion-safe:animate-home-aura-1-drift md:size-130" />
                <div className="absolute right-[5%] bottom-[10%] size-75 rounded-full bg-[#9370db] opacity-15 blur-[80px] motion-safe:animate-home-aura-2-drift md:size-110" />
            </div>

            {/* Background image */}
            <div className="absolute inset-0 z-1">
                <Image
                    src={welcomeBannerImage}
                    alt=""
                    fill
                    className="object-cover object-center saturate-75 brightness-100"
                    sizes="100vw"
                    preload
                    fetchPriority="high"
                />
            </div>

            {/* Centered glassmorphism card */}
            <div className="relative z-3 flex flex-1 items-center justify-center px-4 pt-16 pb-4 sm:px-6 md:pt-20 md:pb-8 short-h:pt-12 short-h:pb-2">
                <SpotlightCard className="w-[88vw] max-w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-[20px] sm:w-130 sm:px-6 sm:py-7 md:w-145 md:px-7 md:py-8 lg:w-155 lg:px-10 lg:py-12 short-h:py-3">
                    {/* "Hi, I am" overline */}
                    <p className="mb-2 text-[11px] font-normal tracking-[0.35em] text-(--home-accent-on-dark) uppercase motion-safe:animate-fade-in-up sm:text-[12px] lg:text-[13px] short-h:mb-1">
                        Hi, I am
                    </p>

                    {/* Name */}
                    <h1 className="mb-4 text-[44px] leading-[1.1] font-light tracking-[-0.03em] text-(--home-accent-on-dark) motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.15s] sm:text-[54px] md:mb-6 lg:text-[64px] short-h:mb-3">
                        {FULL_NAME}
                    </h1>

                    {/* Gradient divider */}
                    <div className="mx-auto mb-4 h-px w-20 bg-linear-to-r from-transparent via-white/40 to-transparent motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.25s] sm:w-24 md:mb-6 lg:w-28 short-h:mb-3" />

                    {/* Tagline */}
                    <p className="mb-5 text-[15px] leading-relaxed font-light text-white/80 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.35s] sm:text-[17px] md:mb-7 lg:text-[18px] short-h:mb-4">
                        {TAGLINE}
                    </p>

                    {/* View CV button */}
                    <div className="mb-5 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.45s] md:mb-6 short-h:mb-4">
                        <PdfLink
                            href={CvPdfPath}
                            target="_blank"
                            aria-label="View CV (PDF document)"
                            className="block w-full rounded-full bg-[#384959] px-8 py-3 text-[13px] tracking-wider text-white no-underline hover:bg-[#4a6785] motion-safe:transition-colors motion-safe:duration-250 md:px-10 md:py-2.75 md:text-[14px]"
                        >
                            View CV
                        </PdfLink>
                    </div>

                    {/* Stats row — hidden on very short viewports */}
                    <div className="mb-5 flex flex-row items-center justify-center motion-safe:animate-fade-in-up motion-safe:[animation-delay:550ms] md:mb-6 short-h:hidden">
                        {STATS.map((stat, index) => (
                            <React.Fragment key={stat.label}>
                                {index > 0 && (
                                    <div className="h-8 w-px bg-white/20" />
                                )}
                                <div className="px-4 text-center sm:px-6">
                                    <p className="text-[22px] leading-[1.1] font-bold text-(--home-accent-on-dark) sm:text-[26px] lg:text-[28px]">
                                        <AnimatedStatValue
                                            value={stat.value}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            step={stat.step}
                                            startDelay={STATS_FADE_IN_DELAY_MS}
                                        />
                                    </p>
                                    <p className="mt-1 text-[9px] tracking-[0.08em] text-white/55 uppercase sm:text-[10px] lg:text-[11px]">
                                        {stat.label}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Thin divider above social icons */}
                    <div className="mb-3 h-px w-full bg-white/15 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.65s] md:mb-4 short-h:mb-2" />

                    {/* Social icons */}
                    <div className="flex justify-center gap-6 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.65s] md:gap-7">
                        {[
                            Profiles.LinkedIn,
                            Profiles.GitHub,
                            Profiles.Medium,
                            Profiles.Instagram,
                        ].map(({ name, Icon, link }) => (
                            <a
                                key={name}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${name} profile`}
                                className="flex items-center text-white/50 hover:text-white hover:opacity-85 motion-safe:transition-[color,opacity] motion-safe:duration-200"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </SpotlightCard>
            </div>

            {/* Mouse-outline scroll indicator */}
            <div className="relative z-3 mt-4 flex flex-col items-center gap-2.5 pb-8 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.75s] md:mt-0 md:pb-12">
                <ScrollIndicator scrollToTargetId={WELCOME_BANNER_END_ID} />
            </div>

            {/* Hidden anchor at the very end of the banner */}
            <div id={WELCOME_BANNER_END_ID} aria-hidden="true" />
        </div>
    );
};

export default WelcomeBanner;
