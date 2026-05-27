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

import type React from "react";
import {
    type ContactPoint,
    type Graph,
    type IdReference,
    type ImageObject,
    type Occupation,
    type Person,
    type ProfilePage,
    type ScholarlyArticle,
    type SpeakableSpecification,
} from "schema-dts";

import profilePhotoImage from "@/assets/profile-photo.webp";
import Achievements from "@/constants/achievements";
import Certificates from "@/constants/certificates";
import Companies from "@/constants/companies";
import Experiences, { CurrentExperience } from "@/constants/experience";
import Institutes from "@/constants/institutes";
import {
    CONTACT_EMAIL,
    FULL_NAME,
    MAIN_DESCRIPTION,
    SCHEMA_PERSON_ID,
    SCHEMA_PROFILE_PAGE_ID,
    SCHEMA_WEBSITE_ID,
    TAGLINE,
    WEBSITE_PUBLIC_URL,
    WIKIDATA_BIRTH_PLACE,
    WIKIDATA_HOME_LOCATION,
    WIKIDATA_LANGUAGE_ENGLISH,
    WIKIDATA_LANGUAGE_SINHALA,
    WIKIDATA_NATIONALITY,
} from "@/constants/metadata";
import Profiles from "@/constants/profiles";
import Publications from "@/constants/publications";
import Skills, { SkillProficiency } from "@/constants/skills";
import { getImageType } from "@/utils/common/image-metadata";
import { getBlogArticleGroups } from "@/utils/server/blog-articles";
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
        username: "nadunrds",
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

const employmentHistory = Object.values(Experiences).map((exp) => {
    const startDate =
        exp.timePeriod.from.getRenderSegments()[0].dateTime ??
        exp.timePeriod.from.year.toString();
    const endDate = exp.timePeriod.to.getRenderSegments()[0].dateTime;
    return {
        "@type": "OrganizationRole" as const,
        "roleName": exp.name,
        "startDate": startDate,
        ...(endDate !== undefined && { endDate: endDate }),
        "memberOf": {
            "@type": "Organization" as const,
            "name": exp.company.name,
            "sameAs": [
                exp.company.url,
                ...(exp.company.urlAliases ?? []),
                exp.company.wikidataUrl,
            ],
        },
    };
});

const expertSkills = Object.values(Skills)
    .filter((s) => s.proficiencyLevel === SkillProficiency.Expert)
    .map((s) => s.name);

const profilePage: ProfilePage = {
    "@type": "ProfilePage",
    "@id": SCHEMA_PROFILE_PAGE_ID,
    "url": WEBSITE_PUBLIC_URL,
    "mainEntity": { "@id": SCHEMA_PERSON_ID } as IdReference,
    "about": { "@id": SCHEMA_PERSON_ID } as IdReference,
    "dateCreated": "2021-03-14T00:00:00.000Z",
    "dateModified": new Date().toISOString(),
    "speakableSpecification": {
        "@type": "SpeakableSpecification",
        "xpath": [
            "/html/head/title",
            "/html/head/meta[@name='description']/@content",
        ],
    } as SpeakableSpecification,
} as ProfilePage;

const scholarlyArticles: ScholarlyArticle[] = Object.values(Publications).map(
    (pub) => ({
        "@type": "ScholarlyArticle",
        "@id": pub.url,
        "headline": pub.title,
        "url": pub.url,
        "datePublished": pub.publishedDate.toISOString(),
        "keywords": pub.keywords,
        "author": { "@id": SCHEMA_PERSON_ID } as IdReference,
        "publisher": {
            "@type": "Organization",
            "name": pub.venue,
        },
    }),
);

const occupation: Occupation = {
    "@type": "Occupation",
    "name": CurrentExperience.name,
    "occupationLocation": {
        "@type": "Country",
        "name": "New Zealand",
    },
    "skills": expertSkills.join(", "),
};

const person: Person = {
    "@type": "Person",
    "@id": SCHEMA_PERSON_ID,
    "mainEntityOfPage": { "@id": SCHEMA_PROFILE_PAGE_ID } as IdReference,
    "name": FULL_NAME,
    "givenName": "Nadun",
    "familyName": "De Silva",
    "alternateName": [
        "Nadun Rusiru De Silva",
        "Kurukulasuriya Patabandige Nadun Rusiru De Silva",
    ],
    "description": MAIN_DESCRIPTION,
    "image": {
        "@type": "ImageObject",
        "url": new URL(profilePhotoImage.src, WEBSITE_PUBLIC_URL).toString(),
        "width": String(profilePhotoImage.width),
        "height": String(profilePhotoImage.height),
        "encodingFormat": getImageType(profilePhotoImage.src),
    } as unknown as ImageObject,
    "email": CONTACT_EMAIL,
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "professional",
        "email": CONTACT_EMAIL,
    } as ContactPoint,
    "gender": "https://schema.org/Male",
    "birthPlace": {
        "@type": "Place",
        "name": "Colombo, Sri Lanka",
        "sameAs": WIKIDATA_BIRTH_PLACE,
    },
    "nationality": {
        "@type": "Country",
        "name": "Sri Lankan",
        "sameAs": WIKIDATA_NATIONALITY,
    },
    "homeLocation": {
        "@type": "Place",
        "name": "Auckland, New Zealand",
        "sameAs": WIKIDATA_HOME_LOCATION,
    },
    "jobTitle": CurrentExperience.name,
    "url": WEBSITE_PUBLIC_URL,
    "sameAs": [
        WEBSITE_PUBLIC_URL,
        ...Object.values(Profiles).flatMap((p) => [
            p.url,
            ...(p.urlAliases ?? []),
        ]),
    ],
    "identifier": Object.values(Profiles).map((profile) => ({
        "@type": "PropertyValue" as const,
        "propertyID": profile.wikidataPropertyId,
        "name": profile.name,
        "value": profile.username,
        "url": profile.url,
    })),
    "alumniOf": [
        {
            "@type": "CollegeOrUniversity",
            "name": Institutes.UniversityOfMoratuwa.name,
            "sameAs": [
                Institutes.UniversityOfMoratuwa.link,
                Institutes.UniversityOfMoratuwa.wikidataUrl,
            ],
        },
        {
            "@type": "EducationalOrganization",
            "name": Institutes.StJosephsCollegeColombo10.name,
            "sameAs": [
                Institutes.StJosephsCollegeColombo10.link,
                Institutes.StJosephsCollegeColombo10.wikidataUrl,
            ],
        },
    ],
    "worksFor": [
        {
            "@type": "Organization",
            "name": Companies.McCraeTech.name,
            "sameAs": [
                Companies.McCraeTech.url,
                ...(Companies.McCraeTech.urlAliases ?? []),
                Companies.McCraeTech.wikidataUrl,
            ],
        },
    ],
    "affiliation": {
        "@type": "Organization",
        "name": Companies.McCraeTech.name,
        "sameAs": [
            Companies.McCraeTech.url,
            ...(Companies.McCraeTech.urlAliases ?? []),
            Companies.McCraeTech.wikidataUrl,
        ],
    },
    "memberOf": employmentHistory,
    "hasOccupation": occupation,
    "knowsAbout": expertSkills,
    "knowsLanguage": [
        {
            "@type": "Language",
            "name": "English",
            "sameAs": WIKIDATA_LANGUAGE_ENGLISH,
        },
        {
            "@type": "Language",
            "name": "Sinhala",
            "sameAs": WIKIDATA_LANGUAGE_SINHALA,
        },
    ],
    "award": Object.values(Achievements).map(
        (a) => `${a.title} (${a.date.format()})`,
    ),
    "hasCredential": Object.values(Certificates).map((cert) => ({
        "@type": "EducationalOccupationalCredential" as const,
        "name": cert.name,
        "credentialCategory": cert.type,
        "recognizedBy": {
            "@type": "Organization" as const,
            "name": cert.issuer.name,
            "url": cert.issuer.link,
            "sameAs": [cert.issuer.link, cert.issuer.wikidataUrl],
        },
        "url": cert.link,
        "dateCreated": cert.completedOn.toISOString(),
    })),
};

const Home = async (): Promise<React.ReactElement> => {
    const { subGroups } = await getBlogArticleGroups(".");
    const totalArticleCount = subGroups.reduce(
        (sum, g) => sum + g.articles.length,
        0,
    );

    const personWithStats: Person = {
        ...person,
        agentInteractionStatistic: {
            "@type": "InteractionCounter",
            "interactionType": {
                "@id": "https://schema.org/WriteAction",
            } as IdReference,
            "userInteractionCount": totalArticleCount,
            "interactionService": { "@id": SCHEMA_WEBSITE_ID } as IdReference,
        },
    };

    const jsonLd: Graph = {
        "@context": "https://schema.org",
        "@graph": [profilePage, personWithStats, ...scholarlyArticles],
    };

    return (
        <div data-testid="home-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageContent />
        </div>
    );
};

export default Home;
