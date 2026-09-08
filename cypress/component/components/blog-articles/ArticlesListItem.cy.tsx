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
import type { StaticImageData } from "next/image";

import ArticleListItem from "@/components/blog-articles/ArticlesListItem";
import { type BlogArticle } from "@/utils/server/blog-articles";

const mockImage: StaticImageData = {
    src: "/test-image.jpg",
    width: 800,
    height: 450,
};

const baseBlogArticle: BlogArticle = {
    title: "How to Write Better Code",
    description: "A guide on clean code practices for software engineers.",
    keywords: ["clean code", "best practices", "refactoring"],
    image: mockImage,
    publishedDate: new Date("2024-03-15"),
    websiteSubPath: "engineering/how-to-write-better-code",
    readingTimeMinutes: 8,
};

describe("ArticlesListItem", () => {
    it("lets the reader open the article by its title", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.findByRole("link", {
            name: /how to write better code/i,
        }).should("be.visible");
    });

    it("summarises the article for the reader", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.contains(
            "A guide on clean code practices for software engineers.",
        ).should("be.visible");
    });

    it("lists the article's keywords", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.findByRole("group", { name: /keywords/i }).within(() => {
            cy.contains("clean code").should("be.visible");
            cy.contains("best practices").should("be.visible");
            cy.contains("refactoring").should("be.visible");
        });
    });

    it("tells the reader how long a multi-minute article takes to read", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.contains("~8 mins read").should("be.visible");
    });

    it("reads a 1-minute article's time in the singular", () => {
        const article = { ...baseBlogArticle, readingTimeMinutes: 1 };
        cy.mount(<ArticleListItem blogArticle={article} />);

        cy.contains("~1 min read").should("be.visible");
    });

    it("tells the reader when the article was published", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.contains("March 2024").should("be.visible");
    });

    it("shows no keyword list when the article has none", () => {
        const article = { ...baseBlogArticle, keywords: [] };
        cy.mount(<ArticleListItem blogArticle={article} />);

        cy.findByRole("group", { name: /keywords/i }).should("not.exist");
    });

    it("loads the cover image immediately when this is the page's lead card", () => {
        cy.mount(
            <ArticleListItem
                blogArticle={baseBlogArticle}
                fetchPriority="high"
            />,
        );

        cy.get("img").should("have.attr", "loading", "eager");
    });

    it("leaves the cover image to load lazily on a non-lead card", () => {
        cy.mount(<ArticleListItem blogArticle={baseBlogArticle} />);

        cy.get("img").should("not.have.attr", "loading", "eager");
    });
});
