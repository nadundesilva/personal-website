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
 * Website: https://nadundesilva.com
 *
 * © 2026 Nadun De Silva. All rights reserved.
 */
import type { Metadata } from "next";
import type { CollectionPage, IdReference, WithContext } from "schema-dts";

import {
    SCHEMA_PERSON_ID,
    SCHEMA_WEBSITE_ID,
    WEBSITE_PUBLIC_URL,
} from "@/constants/metadata";

interface CollectionPageJsonLdProps {
    metadata: Pick<Metadata, "title" | "description">;
    pathname: string;
}

const CollectionPageJsonLd = ({
    metadata,
    pathname,
}: CollectionPageJsonLdProps) => {
    const pageUrl = `${WEBSITE_PUBLIC_URL}${pathname}`;
    const isBlogPage = pathname.startsWith("/blog-articles");
    const jsonLd: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": typeof metadata.title === "string" ? metadata.title : undefined,
        "description": metadata.description ?? undefined,
        "isPartOf": { "@id": SCHEMA_WEBSITE_ID } as IdReference,
        ...(!isBlogPage && {
            about: { "@id": SCHEMA_PERSON_ID } as IdReference,
        }),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default CollectionPageJsonLd;
