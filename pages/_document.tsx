import React from "react";
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from "next/document";
import ServerStyleSheets from "@mui/styles/ServerStyleSheets";

const FULL_NAME = "Nadun De Silva";
const PUBLIC_URL = process.env.PUBLIC_URL ?? "https://nadundesilva.github.io";
const DESCRIPTION = `${FULL_NAME} is an aspiring Software Engineer and ML Enthusiast, interested in Machine Learning, Observability, Anomaly Detection &amp; Cloud Technologies.`;

const GA_TRACKING_ID = "GTM-T9KX7B4";

class WebsiteDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () => (
            originalRenderPage({
                enhanceApp: (App) => function EnhancedApp(props) {
                    return sheets.collect(<App {...props} />);
                }
            })
        );

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
        };
    }

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta name="application-name" content={FULL_NAME}/>
                    <meta name="description" content={DESCRIPTION}/>
                    <meta name="theme-color" content="#000000"/>
                    <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`}/>
                    <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.png`}/>
                    <link rel="canonical" href={PUBLIC_URL}/>

                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

                    <link rel="apple-touch-icon" href={`${PUBLIC_URL}/assets/profile-photo.jpg`}/>
                    <meta property="fb:app_id" content="567329184466353"/>

                    <meta property="og:title" content={FULL_NAME}/>
                    <meta property="og:site_name" content={FULL_NAME}/>
                    <meta property="og:type" content="profile"/>
                    <meta property="og:fb:profile_id" content="nadunrds"/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:description" content={DESCRIPTION}/>
                    <meta property="og:url" content={PUBLIC_URL}/>
                    <meta property="og:image" content={`${PUBLIC_URL}/assets/profile-photo.jpg`}/>
                    <meta property="og:image:height" content="1960"/>
                    <meta property="og:image:width" content="1960"/>
                    <meta property="og:image:alt" content={FULL_NAME}/>

                    <meta property="twitter:card" content="summary"/>
                    <meta property="twitter:title" content={FULL_NAME}/>
                    <meta property="twitter:description" content={DESCRIPTION}/>
                    <meta property="twitter:image" content={`${PUBLIC_URL}/assets/profile-photo.jpg`}/>
                    <meta property="twitter:image:alt" content={FULL_NAME}/>
                    <meta property="twitter:site" content="@nadunrds"/>

                    <meta name="yandex-verification" content="acbc45e5d9645cf0"/>

                    <script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@type": "Person",
                            image: {
                                height: "1960",
                                width: "1960",
                                url: `${PUBLIC_URL}/assets/profile-photo.jpg`,
                                "@type": "imageObject"
                            },
                            url: PUBLIC_URL,
                            headline: FULL_NAME,
                            sameAs: [
                                "https://www.facebook.com/nadunrds",
                                "https://www.linkedin.com/in/nadundesilva",
                                "https://www.instagram.com/nadunrds",
                                "https://github.com/nadundesilva",
                                "https://twitter.com/nadunrds"
                            ],
                            description: DESCRIPTION,
                            name: FULL_NAME,
                            "@context": "https://schema.org"
                        })
                    }}/>

                    {/* Google Tag Manager */}
                    <script async defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag() {
                                    dataLayer.push(arguments);
                                }
                                gtag("js", new Date());
                                gtag("config", "${GA_TRACKING_ID}", {
                                    page_path: window.location.pathname,
                                });
                            `
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebsiteDocument;
