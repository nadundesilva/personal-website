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

import angelHack2016Image from "@/assets/achievements/angel-hack-2016.jpg";
import uomDeansList2017Image from "@/assets/achievements/deans-list-2017.jpg";
import hsbcYouthEnterpriseAwards2015Image from "@/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
import nasaSpaceAppsChallenge2017Image from "@/assets/achievements/nasa-space-apps-2017.jpg";
import wso2OutstandingContributor2019Image from "@/assets/achievements/wso2-outstanding-contributor.jpg";

interface AchievementSection {
    title: string;
    photo: StaticImageData;
}

const ACHIEVEMENTS: AchievementSection[] = [
    {
        title: "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017",
        photo: nasaSpaceAppsChallenge2017Image,
    },
    {
        title: "Placements on the Dean's List",
        photo: uomDeansList2017Image,
    },
    {
        title: "WSO2 Sustained Outstanding Contribution Award - Consecutive years from 2019 to 2021",
        photo: wso2OutstandingContributor2019Image,
    },
    {
        title: "Finalist - British Council HSBC Youth Enterprise Awards 2015",
        photo: hsbcYouthEnterpriseAwards2015Image,
    },
    {
        title: "Finalist - Angel Hack 2016",
        photo: angelHack2016Image,
    },
];

const AchievementItem = ({
    achievement,
    index,
}: {
    achievement: AchievementSection;
    index: number;
}): React.ReactElement => (
    <div
        role="img"
        className="group relative h-full overflow-hidden"
        tabIndex={0}
        aria-labelledby={`achievement-title-${index}`}
        aria-roledescription="achievement"
    >
        {/* Image with scale on hover */}
        <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-focus-within:scale-[1.03] motion-safe:group-hover:scale-[1.03]">
            <Image
                src={achievement.photo}
                alt=""
                fill
                className="object-cover"
            />
        </div>

        {/* Overlay — fades in on hover/focus */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-6 text-white opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 md:pb-8 bg-[linear-gradient(to_top,color-mix(in_oklch,var(--primary)_95%,transparent)_0px,color-mix(in_oklch,var(--primary)_70%,transparent)_300px,color-mix(in_oklch,var(--primary)_20%,transparent)_380px,transparent_460px)] dark:bg-[linear-gradient(to_top,color-mix(in_oklch,var(--background)_98%,transparent)_0px,color-mix(in_oklch,var(--background)_75%,transparent)_300px,color-mix(in_oklch,var(--background)_25%,transparent)_380px,transparent_460px)]">
            <h3
                id={`achievement-title-${index}`}
                className="w-4/5 text-center text-base leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.2)] md:w-2/3 md:text-lg"
            >
                {achievement.title}
            </h3>
        </div>
    </div>
);

const Achievements = (): React.ReactElement => (
    <StaggerReveal>
        {/* Mobile: single column */}
        <div className="flex flex-col gap-1 sm:hidden">
            {ACHIEVEMENTS.map((a, i) => (
                <div key={a.title} className="h-56">
                    <AchievementItem achievement={a} index={i} />
                </div>
            ))}
        </div>

        {/* Tablet: 2-column grid — items 0-3 in pairs, item 4 full-width */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-1 lg:hidden">
            {ACHIEVEMENTS.slice(0, 4).map((a, i) => (
                <div key={a.title} className="h-72">
                    <AchievementItem achievement={a} index={i} />
                </div>
            ))}
            <div className="col-span-2 h-72">
                <AchievementItem achievement={ACHIEVEMENTS[4]} index={4} />
            </div>
        </div>

        {/* Desktop: 3-column mosaic — col 1: items 0+1, col 2: item 2, col 3: items 3+4 */}
        <div className="hidden h-160 gap-1 lg:grid lg:grid-cols-3">
            <div className="grid h-full grid-rows-2 gap-1">
                <AchievementItem achievement={ACHIEVEMENTS[0]} index={0} />
                <AchievementItem achievement={ACHIEVEMENTS[1]} index={1} />
            </div>
            <AchievementItem achievement={ACHIEVEMENTS[2]} index={2} />
            <div className="grid h-full grid-rows-2 gap-1">
                <AchievementItem achievement={ACHIEVEMENTS[3]} index={3} />
                <AchievementItem achievement={ACHIEVEMENTS[4]} index={4} />
            </div>
        </div>
    </StaggerReveal>
);

export default Achievements;
