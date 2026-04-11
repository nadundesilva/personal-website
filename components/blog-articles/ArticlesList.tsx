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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";
import { useId } from "react";
import type React from "react";

import { Link, Section, SectionHeading, Title } from "@/components/content";
import { ScrollReveal } from "@/components/primitives";
import ArticleListItem from "./ArticlesListItem";
import {
    getBlogArticleGroups,
    type BlogArticle,
} from "@/utils/server/blog-articles";

interface ArticlesGroupProps {
    title?: string;
    articles: BlogArticle[];
    href?: string;
}

const ArticlesGroup = ({
    title,
    articles,
    href,
}: ArticlesGroupProps): React.ReactElement => {
    const id = useId();

    return (
        <Section labelledById={id}>
            {title &&
                (href ? (
                    <Link
                        href={href}
                        sx={{
                            "display": "block",
                            "width": "fit-content",
                            "color": "inherit",
                            "&:hover": { textDecoration: "none" },
                            "& .category-arrow": {
                                opacity: 0.7,
                                transition: "opacity 250ms ease",
                            },
                            "&:hover .category-arrow": {
                                opacity: 1,
                            },
                            [MOTION_OK_QUERY]: {
                                "& .category-arrow": {
                                    transition:
                                        "opacity 250ms ease, transform 250ms ease",
                                },
                                "&:hover .category-arrow": {
                                    transform: "translateX(4px)",
                                },
                            },
                        }}
                    >
                        <SectionHeading id={id}>
                            {title}
                            <KeyboardArrowRight
                                className="category-arrow"
                                aria-hidden="true"
                                sx={{
                                    fontSize: "0.7em",
                                    verticalAlign: "middle",
                                    ml: 0.5,
                                }}
                            />
                            <Box component="span" sx={visuallyHidden}>
                                {" "}
                                articles
                            </Box>
                        </SectionHeading>
                    </Link>
                ) : (
                    <SectionHeading id={id}>{title}</SectionHeading>
                ))}
            <Box sx={{ mt: 3 }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    {articles.map((blogArticle, index) => (
                        <Grid
                            key={`/blog-articles/${blogArticle.websiteSubPath}`}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <ScrollReveal
                                delay={index * 50}
                                sx={{ height: "100%" }}
                            >
                                <ArticleListItem blogArticle={blogArticle} />
                            </ScrollReveal>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Section>
    );
};

interface ArticlesListProps {
    subPath: string;
}

const ArticlesList = async ({
    subPath,
}: ArticlesListProps): Promise<React.ReactElement> => {
    const { currentGroup, subGroups } = await getBlogArticleGroups(subPath);

    return (
        <>
            <Title>{currentGroup ? currentGroup.title : "Blog Articles"}</Title>
            <Box sx={{ mt: 4 }}>
                {currentGroup && (
                    <ArticlesGroup articles={currentGroup.articles} />
                )}
                {subGroups.map((subGroup) => (
                    <ArticlesGroup
                        key={`/blog-articles/${subGroup.websiteSubPath}`}
                        title={subGroup.title}
                        articles={subGroup.articles}
                        href={`/blog-articles/${subGroup.websiteSubPath}`}
                    />
                ))}
            </Box>
        </>
    );
};

export default ArticlesList;
