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
import "./page.css";

import type { Metadata } from "next";
import Script from "next/script";
import type React from "react";
import type { Person, WithContext } from "schema-dts";

import profilePhotoImage from "@/assets/profile-photo.webp";
import Companies from "@/constants/companies";
import { CurrentExperience } from "@/constants/experience";
import Institutes from "@/constants/institutes";
import {
    FULL_NAME,
    MAIN_DESCRIPTION,
    TAGLINE,
    WEBSITE_PUBLIC_URL,
} from "@/constants/metadata";
import Profiles from "@/constants/profiles";
import { getImageType } from "@/utils/common/image-metadata";
import PageContent from "./_content/PageContent";

export const metadata: Metadata = {
    title: {
        absolute: `${FULL_NAME} | ${TAGLINE}`,
    },
    description: MAIN_DESCRIPTION,
    openGraph: {
        type: "profile",
        firstName: "Nadun",
        lastName: "De Silva",
        gender: "Male",
        url: WEBSITE_PUBLIC_URL,
        images: {
            url: profilePhotoImage.src,
            alt: FULL_NAME,
            type: getImageType(profilePhotoImage.src),
            width: 1960,
            height: 1960,
        },
    },
};

const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": FULL_NAME,
    "description": MAIN_DESCRIPTION,
    "image": new URL(profilePhotoImage.src, WEBSITE_PUBLIC_URL).toString(),
    "gender": "male",
    "birthPlace": "Colombo, Sri Lanka",
    "jobTitle": CurrentExperience.name,
    "url": WEBSITE_PUBLIC_URL,
    "sameAs": Object.values(Profiles).map((p) => p.link),
    "alumniOf": [
        {
            "@type": "CollegeOrUniversity",
            "name": Institutes.UniversityOfMoratuwa.name,
            "sameAs": Institutes.UniversityOfMoratuwa.link,
        },
    ],
    "worksFor": [
        {
            "@type": "Organization",
            "name": Companies.McCraeTech.name,
            "sameAs": [Companies.McCraeTech.link],
        },
    ],
};

const Home = (): React.ReactElement => {
    return (
        <div data-testid="home-page">
            <Script
                id="json-ld-person"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageContent />
        </div>
    );
};

export default Home;
