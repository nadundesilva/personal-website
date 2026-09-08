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

import { getImageType } from "@/utils/common/image-metadata";

describe("getImageType", () => {
    it("maps each supported image extension to its media type", () => {
        expect(getImageType("favicon.ico")).toBe("image/x-icon");
        expect(getImageType("photo.jpg")).toBe("image/jpeg");
        expect(getImageType("icon.png")).toBe("image/png");
        expect(getImageType("banner.webp")).toBe("image/webp");
        expect(getImageType("logo.svg")).toBe("image/svg+xml");
    });

    it("fails loudly for an unsupported image extension", () => {
        expect(() => getImageType("file.bmp")).toThrow(
            "Unsupported image type: bmp",
        );
    });
});
