import React from "react";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import "../styles.css";

function WebsiteApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <React.StrictMode>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"/>
            </Head>
            <Component {...pageProps}/>
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
