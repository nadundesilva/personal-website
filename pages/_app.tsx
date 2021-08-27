import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "../src/service-worker/serviceWorkerRegistration";
import reportWebVitals from "../src/service-worker/reportWebVitals";
import type { AppProps } from "next/app";
import "../styles.css";

function WebsiteApp({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        serviceWorkerRegistration.register();
        reportWebVitals();
    }, []);

    return (
        <React.StrictMode>
            <Component {...pageProps}/>
        </React.StrictMode>
    );
}

export default WebsiteApp;
