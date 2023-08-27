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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import nextPwa from "next-pwa";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const withPWA = nextPwa({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
});

export default withBundleAnalyzer(
    withPWA({
        output: "export",
        pageExtensions: ["ts", "tsx", "js", "jsx"],
        eslint: {
            ignoreDuringBuilds: process.env["BUILD_TYPE"] == "test",
        },
        images: {
            loader: "custom",
            loaderFile: "./nextImageLoader.js",
        },
        productionBrowserSourceMaps: true,
    }),
);
