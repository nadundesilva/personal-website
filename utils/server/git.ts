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
import { execFileSync } from "child_process";

// Returns the date of the most recent commit that touched filePath.
// Only the page's own source file is passed — not its component dependencies.
// Infrastructure changes (layout refactors, SEO additions) are not content
// changes and should not shift lastModified, which crawlers use to gauge
// content freshness.
export const getLastModifiedDate = (filePath: string): Date => {
    const lastModified = execFileSync(
        "git",
        ["log", "-1", "--format=%aI", "--", filePath],
        { encoding: "utf-8" },
    ).trim();
    if (!lastModified) {
        throw new Error(`No git history found for: ${filePath}`);
    }
    return new Date(lastModified);
};
