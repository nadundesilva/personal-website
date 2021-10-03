import Head from "next/head";
import React from "react";

const PUBLIC_URL = process.env.PUBLIC_URL ?? "https://nadundesilva.github.io";

const NotFoundPage = (): React.ReactElement => (
    <Head>
        <meta httpEquiv="refresh" content={`0; url=${PUBLIC_URL}`} />
    </Head>
);

export default NotFoundPage;
