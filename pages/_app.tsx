import React from "react";
import type { AppProps } from "next/app";
import "../styles.css";

function WebsiteApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <React.StrictMode>
            <Component {...pageProps}/>
        </React.StrictMode>
    );
}

export default WebsiteApp;
