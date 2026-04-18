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

import { KeywordChip, LeftAccent, ScrollReveal } from "@/components/primitives";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";
import type { BlogPosting, Person, WithContext } from "schema-dts";

import profilePhotoImage from "@/assets/profile-photo.webp";
import { DateInfo, Image, LinkButton, Title } from "@/components/content";
import { Date as FormattableDate } from "@/constants/date";
import { FULL_NAME, WEBSITE_PUBLIC_URL } from "@/constants/metadata";

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

    const author: Person = {
        "@type": "Person",
        "name": FULL_NAME,
        "url": WEBSITE_PUBLIC_URL,
        "image": new URL(profilePhotoImage.src, WEBSITE_PUBLIC_URL).toString(),
    };

    const jsonLd: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": pageMetadata.title,
        "description": pageMetadata.description,
        "image": new URL(blogMetadata.image.src, WEBSITE_PUBLIC_URL).toString(),
        "inLanguage": "en-US",
        "datePublished": blogMetadata.publishedDate.toISOString(),
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

    const renderingId = React.useId();

    return (
        <article>
            <Title>{pageMetadata.title}</Title>
            <Script
                id={`json-ld-blog-${renderingId}`}
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
                    <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                        {pageMetadata.description}
                    </p>
                    <LinkButton
                        href={blogMetadata.mediumUrl}
                        name="Read on Medium"
                        endIcon={ExternalLink}
                        target="_blank"
                    />
                    {blogMetadata.keywords.length > 0 && (
                        <div className="mt-7">
                            <p className="text-muted-foreground mb-1.5 text-xs tracking-widest uppercase">
                                Keywords:
                            </p>
                            <div
                                role="group"
                                aria-label="Article keywords"
                                className="flex flex-wrap gap-1"
                            >
                                {blogMetadata.keywords.map((keyword) => (
                                    <KeywordChip
                                        key={keyword}
                                        label={keyword}
                                    />
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
                    sizes="100vw"
                    className="mb-12 aspect-video rounded-md"
                />
            </ScrollReveal>
            {children}
            <ScrollReveal>
                <div className="mt-16 flex flex-col items-center gap-3">
                    <p className="text-muted-foreground text-xs tracking-widest uppercase">
                        Continue reading
                    </p>
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
