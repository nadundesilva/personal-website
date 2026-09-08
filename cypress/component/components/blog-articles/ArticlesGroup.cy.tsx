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

import ArticlesGroup from "@/components/blog-articles/ArticlesGroup";
import { type BlogArticle } from "@/utils/server/blog-articles";

// ArticlesList is an async Server Component that hits the filesystem, so it
// cannot be cy.mount()ed. ArticlesGroup is the sub-component that handles
// list rendering; it is tested directly here.

const mockImage: StaticImageData = {
    src: "/test-image.jpg",
    width: 800,
    height: 450,
};

const makeArticle = (n: number): BlogArticle => ({
    title: `Article ${n}`,
    description: `Description ${n}`,
    keywords: [],
    image: mockImage,
    publishedDate: new Date("2024-01-01"),
    websiteSubPath: `engineering/article-${n}`,
    readingTimeMinutes: 3,
});

describe("ArticlesGroup", () => {
    it("shows every article in the group", () => {
        const articles = [makeArticle(1), makeArticle(2), makeArticle(3)];
        cy.mount(<ArticlesGroup articles={articles} />);

        cy.findAllByRole("listitem").should("have.length", 3);
    });

    it("shows nothing when the group has no articles", () => {
        cy.mount(<ArticlesGroup articles={[]} />);

        cy.findAllByRole("listitem").should("have.length", 0);
    });

    it("leaves an untitled group's section without an accessible name rather than a broken one", () => {
        // The current group renders with no title (the page <h1> already names
        // it), so its <section> must not point aria-labelledby at a heading id
        // that was never rendered.
        cy.mount(<ArticlesGroup articles={[makeArticle(1)]} />);

        cy.get("section").should("not.have.attr", "aria-labelledby");
    });

    it("introduces the group with a navigable heading", () => {
        const articles = [makeArticle(1)];
        cy.mount(<ArticlesGroup articles={articles} title="Engineering" />);

        cy.findByRole("heading", { name: /engineering/i }).should("be.visible");
    });

    it("leaves the group title unlinked when it has no category page", () => {
        cy.mount(
            <ArticlesGroup articles={[makeArticle(1)]} title="Engineering" />,
        );

        cy.findByRole("heading", { name: /engineering/i })
            .should("be.visible")
            .closest("a")
            .should("not.exist");
    });

    it("links the group title to its category page when href is provided", () => {
        cy.mount(
            <ArticlesGroup
                articles={[makeArticle(1)]}
                title="Engineering"
                href="/blog-articles/engineering"
            />,
        );

        // The heading should be inside a link pointing to the href
        cy.findByRole("link", { name: /engineering articles/i }).should(
            "have.attr",
            "href",
            "/blog-articles/engineering",
        );
    });

    it("loads the lead article's image first", () => {
        const articles = [makeArticle(1), makeArticle(2), makeArticle(3)];
        cy.mount(<ArticlesGroup articles={articles} prioritizeFirst />);

        cy.findAllByRole("listitem")
            .first()
            .find("img")
            .should("have.attr", "fetchpriority", "high");

        cy.findAllByRole("listitem")
            .eq(1)
            .find("img")
            .should("not.have.attr", "fetchpriority", "high");
    });
});
