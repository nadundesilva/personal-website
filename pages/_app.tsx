import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles.css";

function WebsiteApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <React.StrictMode>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"/>
            </Head>
            <Component {...pageProps}/>
        </React.StrictMode>
    );
}

export default WebsiteApp;
