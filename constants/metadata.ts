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
 * Website: https://nadundesilva.github.io
 *
 * © 2024 Nadun De Silva. All rights reserved.
 */

export const FULL_NAME = "Nadun De Silva";
export const MAIN_DESCRIPTION = `${FULL_NAME} is an aspiring Software Engineer interested in Deep Learning, Observability, Anomaly Detection &amp; Cloud Technologies.`;

const unsanitizedWebsiteUrl =
    process.env.PUBLIC_URL ?? "https://nadundesilva.github.io";
export const WEBSITE_PUBLIC_URL = unsanitizedWebsiteUrl.endsWith("/")
    ? unsanitizedWebsiteUrl.substring(0, unsanitizedWebsiteUrl.length - 1)
    : unsanitizedWebsiteUrl;
