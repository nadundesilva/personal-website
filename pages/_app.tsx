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

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric): void {
    (window as any).gtag("event", name, {
        event_category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
        event_label: id,
        non_interaction: true
    });
}

export default WebsiteApp;
