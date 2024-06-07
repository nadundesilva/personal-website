/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Container } from "@mui/material";
import { Metadata } from "next";
import React from "react";

import PageContent from "./_content/PageContent";
import {
    FULL_NAME,
    MAIN_DESCRIPTION,
    WEBSITE_PUBLIC_URL,
} from "@/constants/metadata";

export const metadata: Metadata = {
    title: `${FULL_NAME} | An aspiring Senior Software Engineer and Cloud Computing Enthusiast`,
    description: MAIN_DESCRIPTION,
    openGraph: {
        type: "profile",
        firstName: "Nadun",
        lastName: "De Silva",
        gender: "Male",
        url: WEBSITE_PUBLIC_URL,
        siteName: FULL_NAME,
        locale: "en_US",
        images: {
            url: `${WEBSITE_PUBLIC_URL}/assets/profile-photo.jpg`,
            alt: FULL_NAME,
            type: "image/jpeg",
            width: 1960,
            height: 1960,
        },
    },
    twitter: {
        card: "summary",
        site: "@nadunrds",
        creator: "@nadunrds",
        images: {
            url: `${WEBSITE_PUBLIC_URL}/assets/profile-photo.jpg`,
            alt: FULL_NAME,
            type: "image/jpeg",
            width: 1960,
            height: 1960,
        },
    },
};

const Home = (): React.ReactElement => {
    return (
        <Container maxWidth={false} disableGutters data-testid={"home-page"}>
            <PageContent />
        </Container>
    );
};

export default Home;
