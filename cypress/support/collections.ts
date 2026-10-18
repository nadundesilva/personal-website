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

// Narrows an indexed lookup that the test already depends on existing:
// a missing element fails here with a clear message instead of as a
// TypeError further down.
export const at = <T>(items: ArrayLike<T>, index = 0): T => {
    const item = items[index];
    if (item === undefined) {
        throw new Error(
            `Expected an item at index ${String(index)}, but got ${String(items.length)} item(s)`,
        );
    }
    return item;
};
