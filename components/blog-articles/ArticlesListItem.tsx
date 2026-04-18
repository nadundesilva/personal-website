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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Clock } from "lucide-react";
import NextImage from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import DateInfo from "@/components/content/DateInfo";
import { Card, CardContent, KeywordChip } from "@/components/primitives";
import { Date as FormattableDate } from "@/constants/date";
import { type BlogArticle } from "@/utils/server/blog-articles";

const IMAGE_SIZES =
    "(min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw";

interface ArticleListItemProps {
    blogArticle: BlogArticle;
}

const ArticleListItem = ({
    blogArticle,
}: ArticleListItemProps): React.ReactElement => (
    <Card className="h-full group motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:hover:scale-[1.02]">
        <Link
            href={`/blog-articles/${blogArticle.websiteSubPath}`}
            className="bg-card hover:bg-accent/5 focus-visible:outline-ring flex h-full flex-col overflow-hidden rounded-lg font-normal text-inherit no-underline hover:no-underline hover:opacity-100 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                <NextImage
                    src={blogArticle.image}
                    alt=""
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover"
                />
            </div>
            <CardContent className="flex flex-1 flex-col p-5">
                <h3 className="text-card-foreground mb-2 pb-2 text-base leading-snug font-semibold">
                    {blogArticle.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {blogArticle.description}
                </p>
                {blogArticle.keywords.length > 0 && (
                    <div
                        role="group"
                        aria-label="Keywords"
                        className="mt-3 flex flex-wrap gap-1.5"
                    >
                        {blogArticle.keywords.map((keyword) => (
                            <KeywordChip key={keyword} label={keyword} />
                        ))}
                    </div>
                )}
                <div className="flex-1" />
                <div className="mt-6 flex flex-col gap-1.5">
                    <div className="text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3.5" />
                        <span className="text-xs">
                            ~{blogArticle.readingTimeMinutes} min read
                        </span>
                    </div>
                    <DateInfo
                        value={FormattableDate.fromJsDate(
                            blogArticle.publishedDate,
                        )}
                        className="mt-0 mb-0 text-xs"
                    />
                </div>
            </CardContent>
        </Link>
    </Card>
);

export default ArticleListItem;
