import React from "react";
import { Helmet } from "react-helmet";
import profilePicture from "./images/profile-photo.jpg";

const NAME = "Nadun De Silva";
const TAG_LINE = "An aspiring Software Engineer and ML Enthusiast";
const DESCRIPTION = "Nadun De Silva is an aspiring Software Engineer " +
    "and ML Enthusiast, interested in Machine Learning, Observability, " +
    "Anomaly Detection &amp; Cloud Technologies.";
const LANGUAGE = "en_US";
const PUBLIC_URL = "https://nadundesilva.github.io/";
const PROFILE_PICTURE_HEIGHT = 200;
const PROFILE_PICTURE_WIDTH = 200;

const TWITTER_HANDLE = "nadunrds";
const FACEBOOK_USERNAME = "nadunrds";
const LINKEDIN_USERNAME = "nadundesilva";
const INSTAGRAM_USERNAME = "nadunrds";
const GITHUB_USERNAME = "nadundesilva";

const SEO = (): React.ReactElement => {
    return (
        <Helmet
            title={NAME + " | " + TAG_LINE}
            link={[
                { rel: "canonical", href: PUBLIC_URL },
                { rel: "apple-touch-icon", href: profilePicture }
            ]}
            meta={[
                { name: "description", content: DESCRIPTION },
                { property: "og:title", content: NAME },
                { property: "og:locale", content: LANGUAGE },
                { property: "og:description", content: DESCRIPTION },
                { property: "og:url", content: PUBLIC_URL },
                { property: "og:image", content: profilePicture },
                { property: "og:image:height", content: `${PROFILE_PICTURE_HEIGHT}` },
                { property: "og:image:width", content: `${PROFILE_PICTURE_WIDTH}` },
                { property: "twitter:card", content: "summary" },
                { property: "twitter:image", content: profilePicture },
                { property: "twitter:title", content: NAME },
                { property: "twitter:site", content: `@${TWITTER_HANDLE}` }
            ]}
            script={[
                {
                    type: "application/ld+json",
                    innerHTML: JSON.stringify({
                        "@type": "Person",
                        image: {
                            height: PROFILE_PICTURE_HEIGHT,
                            width: PROFILE_PICTURE_WIDTH,
                            url: profilePicture,
                            "@type": "imageObject"
                        },
                        url: PUBLIC_URL,
                        headline: NAME,
                        sameAs: [
                            `https://www.facebook.com/${FACEBOOK_USERNAME}`,
                            `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`,
                            `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
                            `https://github.com/${GITHUB_USERNAME}`,
                            `https://twitter.com/${TWITTER_HANDLE}`
                        ],
                        description: DESCRIPTION,
                        name: NAME,
                        "@context": "https://schema.org"
                    })
                }
            ]}
        />
    );
};

export default SEO;
