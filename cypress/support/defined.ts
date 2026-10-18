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

// Narrows a value the test already depends on being present: a missing one
// fails here with a clear message instead of as a query for "#undefined".
export const defined = <T>(
    value: T | null | undefined,
    description: string,
): T => {
    if (value === undefined || value === null) {
        throw new Error(`Expected ${description} to be defined`);
    }
    return value;
};
