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
"use client";

import { LeftAccent, ScrollReveal } from "@/components/primitives";
import { Badge } from "@/shadcn/ui";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

import React from "react";
import type { BlogPosting, IdReference, WithContext } from "schema-dts";

import {
    DateInfo,
    Image,
    LinkButton,
    Paragraph,
    Title,
} from "@/components/content";
import { Date as FormattableDate } from "@/constants/date";
import { SCHEMA_PERSON_ID, WEBSITE_PUBLIC_URL } from "@/constants/metadata";

interface BlogMetadata {
    image: StaticImageData;
    mediumUrl: string;
    publishedDate: Date;
    keywords: string[];
}

interface PageMetadata {
    title: string;
    description: string;
}

export interface ArticleLayoutProps {
    children: React.ReactNode;
    blogMetadata: BlogMetadata;
    pageMetadata: PageMetadata;
}

const ArticleLayout = ({
    children,
    blogMetadata,
    pageMetadata,
}: ArticleLayoutProps): React.ReactElement => {
    const pathname = usePathname();
    const pageUrl = `${WEBSITE_PUBLIC_URL}${pathname}`;

    const author: IdReference = { "@id": SCHEMA_PERSON_ID };

    const jsonLd: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": pageUrl,
        "headline": pageMetadata.title,
        "description": pageMetadata.description,
        "image": new URL(blogMetadata.image.src, WEBSITE_PUBLIC_URL).toString(),
        "inLanguage": "en-US",
        "datePublished": blogMetadata.publishedDate.toISOString(),
        // dateModified intentionally equals datePublished. Computing it from
        // git history conflates infrastructure changes (component refactors,
        // layout updates) with content changes, producing false freshness
        // signals that can suppress articles in Google Search.
        "dateModified": blogMetadata.publishedDate.toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl,
        },
        "accountablePerson": author,
        "author": author,
        "creator": author,
        "publisher": author,
        "keywords": blogMetadata.keywords,
        "sameAs": [blogMetadata.mediumUrl],
    };

    return (
        <article>
            <Title>{pageMetadata.title}</Title>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <ScrollReveal delay={100}>
                <LeftAccent className="mb-8">
                    <DateInfo
                        value={FormattableDate.fromJsDate(
                            blogMetadata.publishedDate,
                        )}
                        className="mt-0 mb-5"
                    />
                    <Paragraph className="text-muted-foreground mb-5 text-sm leading-relaxed sm:text-start">
                        {pageMetadata.description}
                    </Paragraph>
                    <LinkButton
                        href={blogMetadata.mediumUrl}
                        name="Read on Medium"
                        endIcon={ExternalLink}
                        target="_blank"
                    />
                    {blogMetadata.keywords.length > 0 && (
                        <div className="mt-7">
                            <span className="text-muted-foreground mb-1.5 block text-xs tracking-widest uppercase">
                                Keywords:
                            </span>
                            <div
                                role="group"
                                aria-label="Article keywords"
                                className="flex flex-wrap gap-1"
                            >
                                {blogMetadata.keywords.map((keyword) => (
                                    <Badge variant="outline" key={keyword}>
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </LeftAccent>
            </ScrollReveal>
            <ScrollReveal delay={200}>
                <Image
                    src={blogMetadata.image}
                    alt=""
                    fill
                    fetchPriority="high"
                    loading="eager"
                    className="mb-12 aspect-video rounded-md"
                />
            </ScrollReveal>
            {children}
            <ScrollReveal>
                <div className="mt-16 flex flex-col items-center gap-3">
                    <span className="text-muted-foreground text-xs tracking-widest uppercase">
                        Continue reading
                    </span>
                    <LinkButton
                        href="/blog-articles"
                        name="Back to all articles"
                        startIcon={ArrowLeft}
                    />
                </div>
            </ScrollReveal>
        </article>
    );
};

export default ArticleLayout;
