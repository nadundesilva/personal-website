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
import createCache from "@emotion/cache";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import WebsiteThemeProvider from "@/components/layout/theme";
import "@/styles/main.css";
import "@/styles/syntax-highlighting.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css" });

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export interface WebsiteAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function WebsiteApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: WebsiteAppProps): JSX.Element {
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleLoadingStart = (): void => {
        setLoading(true);
    };
    const handleLoadingEnd = (): void => {
        setLoading(false);
    };

    useEffect(() => {
        router.events.on("routeChangeStart", handleLoadingStart);
        router.events.on("routeChangeComplete", handleLoadingEnd);
        router.events.on("routeChangeError", handleLoadingEnd);
        return () => {
            router.events.off("routeChangeStart", handleLoadingStart);
            router.events.off("routeChangeComplete", handleLoadingEnd);
            router.events.off("routeChangeError", handleLoadingEnd);
        };
    });

    return (
        <main className={roboto.className}>
            <React.StrictMode>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
                <CacheProvider value={emotionCache}>
                    <WebsiteThemeProvider>
                        {isLoading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    pt: "25%",
                                    height: "100vh",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </WebsiteThemeProvider>
                </CacheProvider>
            </React.StrictMode>
        </main>
    );
}

export function reportWebVitals({
    name,
    value,
    id,
    label,
    startTime,
}: NextWebVitalsMetric): void {
    (window as any).gtag("event", name, {
        value,
        // Custom parameters
        metric_id: id,
        metric_label: label,
        metric_timestamp: startTime,
    });
}

export default WebsiteApp;
