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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import nextPwa from "next-pwa";
import NextBundleAnalyzer from "@next/bundle-analyzer";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { withSentryConfig } from "@sentry/nextjs";
import nextMDX from "@next/mdx";

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const withPWA = nextPwa({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
});

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [
            [
                "rehype-pretty-code",
                { theme: "dracula", defaultLang: "plaintext" },
            ],
        ],
    },
});

const sentryConfig = {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    enabled: process.env.NODE_ENV !== "development",

    org: "nadundesilva",
    project: "nadundesilva-website",
    authToken: process.env.SENTRY_AUTH_TOKEN,

    hideSourceMaps: true,
    widenClientFileUpload: true,
    transpileClientSDK: true,

    silent: !process.env.CI,

    webpack: {
        treeshake: {
            removeDebugLogging: true,
        },
        automaticVercelMonitors: false,
        autoInstrumentServerFunctions: false,
    },
};

const nextConfig = (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     **/
    const nextConfig = {
        ...defaultConfig,
        pageExtensions: ["ts", "tsx", "md", "mdx", "js", "jsx"],
        modularizeImports: {
            "@mui/icons-material": {
                transform: "@mui/icons-material/{{member}}",
            },
        },
        images: {
            loader: "custom",
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        },
        transpilePackages: ["next-image-export-optimizer"],
        productionBrowserSourceMaps: true,
        reactStrictMode: true,
        env: {
            nextImageExportOptimizer_imageFolderPath: "public/images",
            nextImageExportOptimizer_exportFolderPath: "./out",
            nextImageExportOptimizer_quality: "75",
            nextImageExportOptimizer_storePicturesInWEBP: "true",
            nextImageExportOptimizer_exportFolderName: "optimized-images",
            nextImageExportOptimizer_generateAndUseBlurImages: "true",
            nextImageExportOptimizer_remoteImageCacheTTL: "0",
        },
    };

    if (phase !== PHASE_DEVELOPMENT_SERVER) {
        nextConfig.output = "export";
    }

    return withSentryConfig(
        withBundleAnalyzer(withPWA(withMDX(nextConfig))),
        sentryConfig,
    );
};

export default nextConfig;
