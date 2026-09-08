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
import type React from "react";

import { Title } from "@/components/content";
import { getBlogArticleGroups } from "@/utils/server/blog-articles";
import ArticlesGroup from "./ArticlesGroup";

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
            <div className="mt-4">
                {currentGroup && (
                    <ArticlesGroup
                        articles={currentGroup.articles}
                        prioritizeFirst
                    />
                )}
                {subGroups.map((subGroup, groupIndex) => (
                    <ArticlesGroup
                        key={`/blog-articles/${subGroup.websiteSubPath}`}
                        title={subGroup.title}
                        articles={subGroup.articles}
                        href={`/blog-articles/${subGroup.websiteSubPath}`}
                        // Only prioritize the first sub-group's first image when
                        // there is no currentGroup rendered above it.
                        prioritizeFirst={!currentGroup && groupIndex === 0}
                    />
                ))}
            </div>
        </>
    );
};

export default ArticlesList;
