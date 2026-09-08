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
import { describe, expect, it } from "@jest/globals";

import { resolveRoute } from "@/utils/common/routes";

describe("resolveRoute", () => {
    it("finds a top-level section by its path", () => {
        expect(resolveRoute("/experience")).toMatchObject({
            name: "Experience",
            path: "/experience",
        });
    });

    it("finds a nested section by its path", () => {
        expect(resolveRoute("/education/certifications")).toMatchObject({
            name: "Certifications",
            path: "/education/certifications",
        });
    });

    it("fails loudly for a path that is not in the route map", () => {
        expect(() => resolveRoute("/does-not-exist")).toThrow(
            "Route not found: /does-not-exist",
        );
    });
});
