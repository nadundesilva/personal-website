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
 * © 2024 Nadun De Silva. All rights reserved.
 */

import { CurrentExperience } from "@/constants/experience";

export const FULL_NAME = "Nadun De Silva";
export const CONTACT_EMAIL = "contact@nadundesilva.com";
export const TAGLINE = `${CurrentExperience.name} & Cloud Computing Enthusiast`;
export const MAIN_DESCRIPTION = `${FULL_NAME} is a ${CurrentExperience.name} and Cloud Computing Enthusiast with expertise in cloud-native applications and Kubernetes on AWS.`;

export const BLOG_CATEGORY = "Computer Science and Software Engineering";

const unsanitizedWebsiteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://nadundesilva.com";
export const WEBSITE_PUBLIC_URL = unsanitizedWebsiteUrl.endsWith("/")
    ? unsanitizedWebsiteUrl.substring(0, unsanitizedWebsiteUrl.length - 1)
    : unsanitizedWebsiteUrl;

export const SCHEMA_PERSON_ID = `${WEBSITE_PUBLIC_URL}/#person`;
export const SCHEMA_PROFILE_PAGE_ID = `${WEBSITE_PUBLIC_URL}/#profilepage`;
export const SCHEMA_WEBSITE_ID = `${WEBSITE_PUBLIC_URL}/#website`;

export const WIKIDATA_BIRTH_PLACE = "https://www.wikidata.org/entity/Q35381";
export const WIKIDATA_NATIONALITY = "https://www.wikidata.org/entity/Q854";
export const WIKIDATA_HOME_LOCATION = "https://www.wikidata.org/entity/Q37100";

export const WIKIDATA_LANGUAGE_ENGLISH =
    "https://www.wikidata.org/entity/Q1860";
export const WIKIDATA_LANGUAGE_SINHALA =
    "https://www.wikidata.org/entity/Q13267";
