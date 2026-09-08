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
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import type { StaticImageData } from "next/image";

import ArticleLayout from "@/components/blog-articles/ArticleLayout";
import { SCHEMA_PERSON_ID, WEBSITE_PUBLIC_URL } from "@/constants/metadata";

const mockImage: StaticImageData = {
    src: "/test-image.jpg",
    width: 1200,
    height: 630,
};

const ARTICLE_PATH =
    "/blog-articles/observability/how-observability-improves-reliability";

const basePageMetadata = {
    title: "How Observability Improves Reliability",
    description:
        "A deep dive into observability patterns for distributed systems.",
};

const baseBlogMetadata = {
    image: mockImage,
    mediumUrl:
        "https://medium.com/@nadun/how-observability-improves-reliability",
    publishedDate: new Date("2024-06-15"),
    keywords: ["observability", "distributed systems", "reliability"],
};

const mountAtPath = (): void => {
    cy.mount(
        <PathnameContext.Provider value={ARTICLE_PATH}>
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>
        </PathnameContext.Provider>,
    );
};

describe("ArticleLayout", () => {
    it("shows the article title as the page's top-level heading", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        cy.findByRole("heading", {
            level: 1,
            name: /how observability improves reliability/i,
        }).should("be.visible");
    });

    it("tells the reader when the article was published", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        cy.contains("June 2024").should("be.visible");
    });

    it("opens the Medium cross-post in a new tab", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        cy.findByRole("link", { name: /read on medium/i })
            .should("be.visible")
            .and("have.attr", "target", "_blank");
    });

    it("groups the article's keywords for the reader", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        cy.findByRole("group", { name: /article keywords/i }).within(() => {
            cy.contains("observability").should("be.visible");
            cy.contains("distributed systems").should("be.visible");
            cy.contains("reliability").should("be.visible");
        });
    });

    it("shows no keyword group when the article has none", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={{ ...baseBlogMetadata, keywords: [] }}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        cy.findByRole("group", { name: /article keywords/i }).should(
            "not.exist",
        );
    });

    it("identifies the article by its own page URL for crawlers", () => {
        mountAtPath();

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text());
            const pageUrl = `${WEBSITE_PUBLIC_URL}${ARTICLE_PATH}`;
            expect(data["@id"]).to.eq(pageUrl);
            expect(data["mainEntityOfPage"]["@id"]).to.eq(pageUrl);
        });
    });

    it("points crawlers at a fetchable absolute URL for the article's cover image", () => {
        mountAtPath();

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text());
            // mockImage.src is a root-relative "/test-image.jpg"; the record
            // must carry it as an absolute URL or the image is unreachable
            // from Google's Article rich result.
            expect(data["image"]).to.eq(
                `${WEBSITE_PUBLIC_URL}${mockImage.src}`,
            );
        });
    });

    it("reports the publication date to crawlers in machine-readable form", () => {
        mountAtPath();

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text());
            const isoDate = baseBlogMetadata.publishedDate.toISOString();
            expect(data["datePublished"]).to.eq(isoDate);
            expect(data["dateModified"]).to.eq(isoDate);
        });
    });

    it("points crawlers at the Medium cross-post as the same work", () => {
        mountAtPath();

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text());
            expect(data["sameAs"]).to.deep.eq([baseBlogMetadata.mediumUrl]);
        });
    });

    it("lets the reader return to the article index after finishing", () => {
        cy.mount(
            <ArticleLayout
                pageMetadata={basePageMetadata}
                blogMetadata={baseBlogMetadata}
            >
                <p>Article body</p>
            </ArticleLayout>,
        );

        // Scrolled into view: the link sits below the fold, and its
        // ScrollReveal opacity animation only resolves once a real
        // IntersectionObserver reports it as intersecting.
        cy.findByRole("link", { name: /back to all articles/i })
            .scrollIntoView()
            .should("be.visible")
            .and("have.attr", "href", "/blog-articles");
    });

    it("credits the site owner by reference instead of duplicating person data", () => {
        mountAtPath();

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text());
            [data["author"], data["publisher"]].forEach((reference) => {
                expect(reference).to.deep.eq({ "@id": SCHEMA_PERSON_ID });
            });
        });
    });
});
