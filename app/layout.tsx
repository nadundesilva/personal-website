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
import type { Viewport, Metadata } from "next";
import type { Route as NextRoute } from "next";
import Script from "next/script";
import React from "react";
import type { WebSite, WithContext } from "schema-dts";

import Layout, { RouterBreadcrumbs } from "@/components/layout";
import { WebsiteThemeProvider, roboto } from "@/components/theme";
import WebVitals from "@/components/WebVitals";
import {
    FULL_NAME,
    JOB_TITLE,
    MAIN_DESCRIPTION,
    WEBSITE_PUBLIC_URL,
} from "@/constants/metadata";
import "@/styles/main.css";
import "@/styles/syntax-highlighting.css";
import { Route, WebsiteHome } from "@/constants/routes";
import {
    type BlogArticleGroup,
    getBlogArticleGroups,
} from "@/utils/blog-articles";

import { getImageType } from "@/utils/image-metadata";
import profilePhotoImage from "@/assets/profile-photo.webp";

const GOOGLE_SITE_VERIFICATION = "M8dg6gzVYU0noXFvsPOqknm_WjREFeNE212YeUk0g30";
const YANDEX_VERIFICATION = "acbc45e5d9645cf0";
const FB_APP_ID = "567329184466353";

export const metadata: Metadata = {
    metadataBase: new URL(WEBSITE_PUBLIC_URL),
    applicationName: FULL_NAME,
    title: {
        template: `%s | ${FULL_NAME}`,
        default: FULL_NAME,
    },
    description: MAIN_DESCRIPTION,
    alternates: {
        canonical: WEBSITE_PUBLIC_URL,
    },
    authors: { name: FULL_NAME, url: WEBSITE_PUBLIC_URL },
    creator: FULL_NAME,
    publisher: FULL_NAME,
    generator: "Next.js",
    keywords: [
        "Nadun",
        "Rusiru",
        "De Silva",
        "Nadun De Silva",
        "Nadun Rusiru De Silva",
        "Kurukulasuriya Patabandige Nadun Rusiru De Silva",
        "Software Engineer",
        "Senior Software Engineer",
        JOB_TITLE,
    ],
    referrer: "origin",
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: `${WEBSITE_PUBLIC_URL}/icon-maskable-x512.png`,
        shortcut: `${WEBSITE_PUBLIC_URL}/icon-maskable-x512.png`,
        apple: profilePhotoImage.src,
    },
    manifest: `${WEBSITE_PUBLIC_URL}/manifest.webmanifest`,
    verification: {
        google: GOOGLE_SITE_VERIFICATION,
        yandex: YANDEX_VERIFICATION,
    },
    appleWebApp: {
        capable: true,
        startupImage: {
            url: profilePhotoImage.src,
            media: getImageType(profilePhotoImage.src),
        },
        statusBarStyle: "black-translucent",
    },
    formatDetection: {
        telephone: true,
        date: true,
        address: true,
        email: true,
        url: true,
    },
    openGraph: {
        type: "website",
        siteName: FULL_NAME,
        locale: "en_US",
        images: {
            url: profilePhotoImage.src,
            alt: FULL_NAME,
            type: getImageType(profilePhotoImage.src),
            width: 1960,
            height: 1960,
        },
    },
    twitter: {
        card: "summary",
        site: "@nadunrds",
        creator: "@nadunrds",
        images: {
            url: profilePhotoImage.src,
            alt: FULL_NAME,
            type: getImageType(profilePhotoImage.src),
            width: 1960,
            height: 1960,
        },
    },
};

export const viewport: Viewport = {
    themeColor: [
        {
            media: "(prefers-color-scheme: light)",
            color: "#3f51b5",
        },
        {
            media: "(prefers-color-scheme: dark)",
            color: "#000000",
        },
    ],
    colorScheme: "light",
    minimumScale: 1,
    initialScale: 1,
    width: "device-width",
    userScalable: true,
    viewportFit: "cover",
    interactiveWidget: "resizes-visual",
};

const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": FULL_NAME,
    "url": WEBSITE_PUBLIC_URL,
    "description": MAIN_DESCRIPTION,
    "author": {
        "@type": "Person",
        "name": FULL_NAME,
    },
    "creator": {
        "@type": "Person",
        "name": FULL_NAME,
    },
    "copyrightHolder": {
        "@type": "Person",
        "name": FULL_NAME,
    },
};

const createCspValues = (): string[] => {
    const cspValues = {
        "default-src": ["'none'"],
        "manifest-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "style-src": ["'unsafe-inline'"],
        "style-src-elem": ["'self'", "'unsafe-inline'"],
        "font-src": ["'self'"],
        "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://static.cloudflareinsights.com",
        ],
        "worker-src": ["'self'", "blob:"],
        "child-src": ["'self'", "blob:"],
        "connect-src": [
            "'self'",
            "https://o4507214991917056.ingest.us.sentry.io",
        ],
    };
    if (
        process.env.NODE_ENV === "development" ||
        process.env.BUILD_TYPE === "test"
    ) {
        cspValues["script-src"].push("'unsafe-eval'");
    }
    const csps: string[] = [];
    for (const [cspKey, cspValue] of Object.entries(cspValues)) {
        csps.push(`${cspKey} ${cspValue.join(" ")}`);
    }
    return csps;
};

function buildBlogArticleRoutes(
    subGroups: BlogArticleGroup[],
): Record<string, Route> {
    const routes: Record<string, Route> = {};

    for (const subGroup of subGroups) {
        const subRoutes: Record<string, Route> = {};
        for (const article of subGroup.articles) {
            subRoutes[`/blog-articles/${article.websiteSubPath}`] = {
                name: article.title,
                path: `/blog-articles/${article.websiteSubPath}` as NextRoute<string>,
            };
        }

        routes[`/blog-articles/${subGroup.websiteSubPath}`] = {
            name: subGroup.title,
            path: `/blog-articles/${subGroup.websiteSubPath}` as NextRoute<string>,
            subRoutes:
                Object.keys(subRoutes).length > 0 ? subRoutes : undefined,
        };
    }

    return routes;
}

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = async ({
    children,
}: RootLayoutProps): Promise<React.ReactElement> => {
    // Merge blog article routes into topLevelRoutes if provided
    const { subGroups } = await getBlogArticleGroups(".");
    const routes: Record<string, Route> = {
        ...WebsiteHome.subRoutes,
        "/blog-articles": {
            ...WebsiteHome.subRoutes["/blog-articles"],
            subRoutes: buildBlogArticleRoutes(subGroups),
        },
    };

    const csps = createCspValues();
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />

                <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
                <meta
                    httpEquiv="Strict-Transport-Security"
                    content="max-age=63072000; includeSubDomains; preload"
                />
                <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
                <meta httpEquiv="Permissions-Policy" content="" />
                <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

                <meta
                    httpEquiv="Content-Security-Policy"
                    content={csps.join("; ")}
                />

                <meta property="fb:app_id" content={FB_APP_ID} />
                <meta property="og:fb:profile_id" content="nadunrds" />

                <link
                    rel="preconnect"
                    href="https://o4507214991917056.ingest.us.sentry.io"
                />

                <Script
                    id="json-ld-website"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                <main>
                    <React.StrictMode>
                        <WebVitals />
                        <WebsiteThemeProvider
                            fontFamily={roboto.style.fontFamily}
                        >
                            <Layout topLevelRoutes={routes}>
                                <RouterBreadcrumbs topLevelRoutes={routes} />
                                {children}
                            </Layout>
                        </WebsiteThemeProvider>
                    </React.StrictMode>
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
