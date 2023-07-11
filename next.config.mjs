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
import remarkUnwrapImages from "remark-unwrap-images";
import rehypePrism from "rehype-prism-plus";
import nextMDX from "@next/mdx";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkUnwrapImages],
        rehypePlugins: [
            [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
        ],
        providerImportSource: "@mdx-js/react",
    },
});

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const withPWA = nextPwa({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
});

export default withMDX(
    withBundleAnalyzer(
        withPWA({
            output: "export",
            pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
            eslint: {
                ignoreDuringBuilds: process.env["BUILD_TYPE"] == "test",
            },
            images: {
                loader: "custom",
                loaderFile: "./nextImageLoader.js",
            },
            productionBrowserSourceMaps: true,
        }),
    ),
);
