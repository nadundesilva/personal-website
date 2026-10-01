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
import { beforeAll, describe, expect, it } from "@jest/globals";

import { getImageType, getOptimizedImage } from "@/utils/common/image-metadata";

describe("getOptimizedImage", () => {
    beforeAll(() => {
        process.env.nextImageExportOptimizer_exportFolderName =
            "optimized-images";
    });

    it("points at the optimized variant instead of the full-size original", () => {
        const image = getOptimizedImage({
            src: "/_next/static/media/photo.abc123.jpg",
            width: 2000,
            height: 1000,
        });

        expect(image).toEqual({
            src: "/optimized-images/photo.abc123-opt-1080.WEBP",
            width: 1080,
            height: 540,
        });
    });

    it("reports the original dimensions for images narrower than the variant", () => {
        const image = getOptimizedImage({
            src: "/_next/static/media/cover.abc123.webp",
            width: 1000,
            height: 413,
        });

        expect(image).toMatchObject({ width: 1000, height: 413 });
    });
});

describe("getImageType", () => {
    it("maps each supported image extension to its media type", () => {
        expect(getImageType("favicon.ico")).toBe("image/x-icon");
        expect(getImageType("photo.jpg")).toBe("image/jpeg");
        expect(getImageType("icon.png")).toBe("image/png");
        expect(getImageType("banner.webp")).toBe("image/webp");
        expect(getImageType("banner-opt-1080.WEBP")).toBe("image/webp");
        expect(getImageType("logo.svg")).toBe("image/svg+xml");
    });

    it("fails loudly for an unsupported image extension", () => {
        expect(() => getImageType("file.bmp")).toThrow(
            "Unsupported image type: bmp",
        );
    });
});
