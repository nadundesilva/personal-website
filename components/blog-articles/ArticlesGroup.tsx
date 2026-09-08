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
import { ChevronRight } from "lucide-react";
import type React from "react";
import { useId } from "react";

import { Link, Section, SectionHeading } from "@/components/content";
import { ScrollReveal } from "@/components/primitives";
import type { BlogArticle } from "@/utils/server/blog-articles";
import ArticleListItem from "./ArticlesListItem";

interface ArticlesGroupProps {
    title?: string;
    articles: BlogArticle[];
    href?: string;
    prioritizeFirst?: boolean;
}

const ArticlesGroup = ({
    title,
    articles,
    href,
    prioritizeFirst = false,
}: ArticlesGroupProps): React.ReactElement => {
    const id = useId();

    return (
        <Section labelledById={title ? id : undefined}>
            {title &&
                (href ? (
                    <Link
                        href={href}
                        className="group block w-fit text-inherit hover:no-underline hover:opacity-100"
                    >
                        <SectionHeading id={id}>
                            {title}
                            <ChevronRight
                                aria-hidden="true"
                                className="ml-1 inline-block size-[0.7em] align-middle opacity-70 group-hover:opacity-100 motion-safe:transition-[opacity,transform] motion-safe:group-hover:translate-x-1"
                            />
                            <span className="sr-only"> articles</span>
                        </SectionHeading>
                    </Link>
                ) : (
                    <SectionHeading id={id}>{title}</SectionHeading>
                ))}
            <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {articles.map((blogArticle, index) => (
                    <li
                        key={`/blog-articles/${blogArticle.websiteSubPath}`}
                        className="h-full"
                    >
                        <ScrollReveal delay={index * 50} className="h-full">
                            <ArticleListItem
                                blogArticle={blogArticle}
                                fetchPriority={
                                    prioritizeFirst && index === 0
                                        ? "high"
                                        : undefined
                                }
                            />
                        </ScrollReveal>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export default ArticlesGroup;
export type { ArticlesGroupProps };
