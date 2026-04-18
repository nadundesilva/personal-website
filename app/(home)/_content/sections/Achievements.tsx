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
import { type StaticImageData } from "next/image";
import type React from "react";

import { StaggerReveal } from "@/components/primitives";
import { generateSizesForColumnLayout } from "@/utils/common/image-sizes";

import angelHack2016Image from "@/assets/achievements/angel-hack-2016.jpg";
import uomDeansList2017Image from "@/assets/achievements/deans-list-2017.jpg";
import hsbcYouthEnterpriseAwards2015Image from "@/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
import nasaSpaceAppsChallenge2017Image from "@/assets/achievements/nasa-space-apps-2017.jpg";
import wso2OutstandingContributor2019Image from "@/assets/achievements/wso2-outstanding-contributor.jpg";

interface Achievement {
    title: string;
    photo: StaticImageData;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        title: "NASA Space Apps Challenge - Galactic Impact - Global Finalist",
        photo: nasaSpaceAppsChallenge2017Image,
    },
    {
        title: "Placements on the Dean’s List at the University of Moratuwa",
        photo: uomDeansList2017Image,
    },
    {
        title: "WSO2 Sustained Outstanding Contribution Award",
        photo: wso2OutstandingContributor2019Image,
    },
    {
        title: "British Council HSBC Youth Enterprise Awards - Finalist",
        photo: hsbcYouthEnterpriseAwards2015Image,
    },
    {
        title: "Angel Hack - Finalist",
        photo: angelHack2016Image,
    },
];

const AchievementItem = ({
    achievement,
}: {
    achievement: Achievement;
}): React.ReactElement => (
    // <figure> has implicit role="figure" and is keyboard-focusable without
    // contradicting its semantics. <figcaption> is always in the DOM so AT
    // reads it on focus; opacity-0 only hides it visually until hover/focus.
    <figure className="group relative h-full overflow-hidden" tabIndex={0}>
        {/* Image with scale on hover */}
        <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-focus-within:scale-[1.03] motion-safe:group-hover:scale-[1.03]">
            <Image
                src={achievement.photo}
                alt=""
                fill
                // flex-wrap gap-1 (4px).
                sizes={generateSizesForColumnLayout({
                    lg: { cols: 3, gapPx: 4 },
                    sm: { cols: 2, gapPx: 4 },
                })}
                className="object-cover"
            />
        </div>

        {/* Overlay — fades in on hover/focus */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-6 text-white opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 md:pb-8 [background:var(--home-achievement-hover-overlay)]">
            <figcaption className="w-4/5 text-center text-base leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.2)] md:w-2/3 md:text-lg">
                {achievement.title}
            </figcaption>
        </div>
    </figure>
);

const Achievements = (): React.ReactElement => (
    /* Flexbox instead of CSS Grid: CSS Grid shares the same column tracks across
       all rows, so justify-content has no free space to center partial rows with.
       Flexbox wraps independently per row; calc() deducts each card's share of
       the gap so full rows fill exactly 100% and partial rows stay the same
       card width, leaving free space for justify-center to center them. */
    <StaggerReveal
        element="ul"
        className="flex flex-wrap justify-center gap-1"
        itemClassName="h-56 w-full sm:h-64 sm:w-[calc(50%-0.125rem)] lg:h-72 lg:w-[calc(33.333%-0.167rem)]"
    >
        {ACHIEVEMENTS.map((a) => (
            <AchievementItem key={a.title} achievement={a} />
        ))}
    </StaggerReveal>
);

export default Achievements;
