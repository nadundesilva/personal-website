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
export const MAIN_DESCRIPTION = `${FULL_NAME} is a ${CurrentExperience.name} and a Cloud Computing Enthusiast.`;

export const BLOG_CATEGORY = "Computer Science and Software Engineering";

const unsanitizedWebsiteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://nadundesilva.com";
export const WEBSITE_PUBLIC_URL = unsanitizedWebsiteUrl.endsWith("/")
    ? unsanitizedWebsiteUrl.substring(0, unsanitizedWebsiteUrl.length - 1)
    : unsanitizedWebsiteUrl;
