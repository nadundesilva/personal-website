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
import { Date as FormattableDate } from "@/constants/date";
import {
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui";
import { generateSizesForColumnLayout } from "@/utils/common/image-sizes";
import { type BlogArticle } from "@/utils/server/blog-articles";

interface ArticleListItemProps {
    blogArticle: BlogArticle;
    fetchPriority?: "high" | "low" | "auto";
}

const ArticleListItem = ({
    blogArticle,
    fetchPriority,
}: ArticleListItemProps): React.ReactElement => (
    <Card className="group h-full overflow-visible motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:hover:scale-[1.02]">
        <Link
            href={`/blog-articles/${blogArticle.websiteSubPath}`}
            className="hover:bg-accent/5 flex h-full flex-col overflow-hidden rounded-lg font-normal text-inherit hover:no-underline hover:opacity-100 hover:shadow-md focus-visible:rounded-lg motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                <NextImage
                    src={blogArticle.image}
                    alt=""
                    fill
                    fetchPriority={fetchPriority}
                    loading={fetchPriority === "high" ? "eager" : undefined}
                    // CSS grid gap-4 (16px).
                    sizes={generateSizesForColumnLayout({
                        xl: { cols: 4, gapPx: 16 },
                        lg: { cols: 3, gapPx: 16 },
                        sm: { cols: 2, gapPx: 16 },
                    })}
                    className="object-cover"
                />
            </div>
            <CardHeader className="gap-3 px-4 pt-5 pb-0">
                <CardTitle className="text-card-foreground font-semibold">
                    {blogArticle.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                    {blogArticle.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col px-4 pt-3 pb-5">
                {blogArticle.keywords.length > 0 && (
                    <div
                        role="group"
                        aria-label="Keywords"
                        className="flex flex-wrap gap-1.5"
                    >
                        {blogArticle.keywords.map((keyword) => (
                            <Badge variant="outline" key={keyword}>
                                {keyword}
                            </Badge>
                        ))}
                    </div>
                )}
                <div className="flex-1" />
                <div className="mt-6 flex flex-col gap-1.5">
                    <div className="text-muted-foreground flex items-center gap-1">
                        <Clock aria-hidden={true} className="size-3.5" />
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
