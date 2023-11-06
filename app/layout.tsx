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
import type { Viewport, Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import React from "react";

import Layout from "@/components/layout";
import { WebsiteThemeProvider } from "@/components/theme";
import WebVitals from "@/components/WebVitals";
import "@/styles/main.css";
import "@/styles/syntax-highlighting.css";

const FULL_NAME = "Nadun De Silva";
const DESCRIPTION = `${FULL_NAME} is an aspiring Software Engineer interested in Deep Learning, Observability, Anomaly Detection &amp; Cloud Technologies.`;
const PUBLIC_URL = process.env.PUBLIC_URL ?? "https://nadundesilva.github.io";

const GA_TRACKING_ID = "GTM-T9KX7B4";
const GOOGLE_SITE_VERIFICATION = "M8dg6gzVYU0noXFvsPOqknm_WjREFeNE212YeUk0g30";
const YANDEX_VERIFICATION = "acbc45e5d9645cf0";
const FB_APP_ID = "567329184466353";

export const metadata: Metadata = {
    title: `${FULL_NAME} | An aspiring Senior Software Engineer and Cloud Computing Enthusiast`,
    description: DESCRIPTION,
    metadataBase: new URL(PUBLIC_URL),
    applicationName: FULL_NAME,
    authors: { name: FULL_NAME, url: PUBLIC_URL },
    creator: FULL_NAME,
    publisher: FULL_NAME,
    generator: "Next.js",
    keywords: [
        "Nadun",
        "Rusiru",
        "De Silva",
        "Nadun De Silva",
        "Nadun Rusiru De Silva",
        "Software Engineer",
    ],
    referrer: "origin",
    robots: `${PUBLIC_URL}/robots.txt`,
    alternates: {
        canonical: PUBLIC_URL,
    },
    icons: {
        icon: `${PUBLIC_URL}/icon-maskable-x512.png`,
        shortcut: `${PUBLIC_URL}/icon-maskable-x512.png`,
        apple: `${PUBLIC_URL}/assets/profile-photo.jpg`,
    },
    manifest: `${PUBLIC_URL}/manifest.webmanifest`,
    openGraph: {
        type: "profile",
        firstName: "Nadun",
        lastName: "De Silva",
        gender: "Male",
        title: FULL_NAME,
        description: DESCRIPTION,
        url: PUBLIC_URL,
        siteName: FULL_NAME,
        locale: "en_US",
        images: {
            url: `${PUBLIC_URL}/assets/profile-photo.jpg`,
            alt: FULL_NAME,
            type: "image/jpeg",
            width: 1960,
            height: 1960,
        },
    },
    twitter: {
        card: "summary",
        site: "@nadunrds",
        creator: "@nadunrds",
        title: FULL_NAME,
        description: DESCRIPTION,
        images: {
            url: `${PUBLIC_URL}/assets/profile-photo.jpg`,
            alt: FULL_NAME,
            type: "image/jpeg",
            width: 1960,
            height: 1960,
        },
    },
    verification: {
        google: GOOGLE_SITE_VERIFICATION,
        yandex: YANDEX_VERIFICATION,
    },
    appleWebApp: {
        capable: true,
        title: FULL_NAME,
        startupImage: {
            url: `${PUBLIC_URL}/assets/profile-photo.jpg`,
            media: "image/jpeg",
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

const createCspValues = (): string[] => {
    const cspValues = {
        "default-src": ["'none'"],
        "manifest-src": ["'self'"],
        "img-src": [
            "'self'",
            "data:",
            "https://nadundesilva.imgix.net",
            "https://www.google.lk",
            "https://www.googletagmanager.com",
        ],
        "style-src": ["'unsafe-inline'"],
        "style-src-elem": ["'self'", "'unsafe-inline'"],
        "font-src": ["'self'"],
        "script-src": [
            "'self'",
            "https://www.googletagmanager.com",
            "http://www.googletagmanager.com",
            "'unsafe-inline'",
        ],
        "connect-src": ["'self'", "https://www.google-analytics.com"],
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

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): React.ReactElement => {
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

                <link rel="preconnect" href="https://nadundesilva.imgix.net" />

                <meta property="fb:app_id" content={FB_APP_ID} />
                <meta property="og:fb:profile_id" content="nadunrds" />

                <Script
                    id="json-for-linking-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@type": "Person",
                            "image": {
                                "height": "1960",
                                "width": "1960",
                                "url": `${PUBLIC_URL}/assets/profile-photo.jpg`,
                                "@type": "imageObject",
                            },
                            "url": PUBLIC_URL,
                            "sameAs": [
                                "https://www.facebook.com/nadunrds",
                                "https://www.linkedin.com/in/nadundesilva",
                                "https://www.instagram.com/nadunrds",
                                "https://github.com/nadundesilva",
                                "https://twitter.com/nadunrds",
                                "https://scholar.google.com/citations?user=CdXo_YQAAAAJ",
                            ],
                            "description": DESCRIPTION,
                            "name": FULL_NAME,
                            "@context": "https://schema.org",
                        }),
                    }}
                />

                {/* Google Tag Manager */}
                <Script
                    async
                    defer
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <Script
                    id="google-tag-manager"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                                dataLayer.push(arguments);
                            }
                            gtag("js", new Date());
                            gtag("config", "${GA_TRACKING_ID}", {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </head>
            <body>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
                        height="0"
                        width="0"
                        style={{
                            display: "none",
                            visibility: "hidden",
                        }}
                    ></iframe>
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                <main className={roboto.className}>
                    <React.StrictMode>
                        <WebVitals />
                        <WebsiteThemeProvider>
                            <Layout>{children}</Layout>
                        </WebsiteThemeProvider>
                    </React.StrictMode>
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
