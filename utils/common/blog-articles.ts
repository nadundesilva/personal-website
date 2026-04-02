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
 * © 2026 Nadun De Silva. All rights reserved.
 */

const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from plain text (e.g. DOM textContent or pre-stripped MDX).
 * Returns at least 1 minute.
 */
export function estimateReadingTimeMinutesFromText(text: string): number {
    const wordCount = text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
