/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    dest: "public",
    register: true,
});

export default withMDX(
    withBundleAnalyzer(
        withPWA({
            pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
            eslint: {
                ignoreDuringBuilds: process.env["BUILD_TYPE"] == "test",
            },
            images: {
                loader: "imgix",
                path: "https://nadundesilva.imgix.net/",
            },
            productionBrowserSourceMaps: true,
        }),
    ),
);
