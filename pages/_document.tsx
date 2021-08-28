import React from "react";
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

const FULL_NAME = "Nadun De Silva";
const PUBLIC_URL = "https://nadundesilva.github.io";
const DESCRIPTION = `${FULL_NAME} is an aspiring Software Engineer and ML Enthusiast, interested in Machine Learning, Observability, Anomaly Detection &amp; Cloud Technologies.`;

class WebsiteDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
            });

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
                    <meta name="description" content={DESCRIPTION}/>

                    <link rel="icon" href={`${PUBLIC_URL}/favicon.png`}/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <link rel="canonical" href={PUBLIC_URL}/>
                    <link rel="apple-touch-icon" href={`${PUBLIC_URL}/assets/profile-photo.jpg`}/>
                    <meta property="fb:app_id" content="567329184466353"/>

                    <meta property="og:title" content={FULL_NAME}/>
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
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T9KX7B4');`
                    }}
                    />
                </Head>
                <body>
                    {/* Google Tag Manager */}
                    <noscript>
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9KX7B4" height="0" width="0"
                            style={{
                                display: "none",
                                visibility: "hidden"
                            }}
                        />
                    </noscript>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebsiteDocument;
