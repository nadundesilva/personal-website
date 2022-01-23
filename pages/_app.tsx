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
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import React from "react";

import "../styles.css";
import WebsiteThemeProvider from "@/components/Layout/theme";

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
