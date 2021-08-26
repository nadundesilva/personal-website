import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "../src/service-worker/serviceWorkerRegistration";
import reportWebVitals from "../src/service-worker/reportWebVitals";

function WebsiteApp({ Component, pageProps }) {
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
