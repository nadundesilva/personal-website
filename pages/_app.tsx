import React from "react";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import "../styles.css";
import WebsiteThemeProvider from "@/components/Layout/theme";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css" });

export interface WebsiteAppProps extends AppProps {
    emotionCache?: EmotionCache,
}

function WebsiteApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: WebsiteAppProps): JSX.Element {
    return (
        <React.StrictMode>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"/>
            </Head>
            <CacheProvider value={emotionCache}>
                <WebsiteThemeProvider>
                    <Component {...pageProps}/>
                </WebsiteThemeProvider>
            </CacheProvider>
        </React.StrictMode>
    );
}

export function reportWebVitals({ name, value, id, label, startTime }: NextWebVitalsMetric): void {
    (window as any).gtag("event", name, {
        value: value,
        // Custom parameters
        metric_id: id,
        metric_label: label,
        metric_timestamp: startTime
    });
}

export default WebsiteApp;
