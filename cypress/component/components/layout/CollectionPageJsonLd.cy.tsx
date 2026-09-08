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
import CollectionPageJsonLd from "@/components/layout/CollectionPageJsonLd";

describe("CollectionPageJsonLd", () => {
    it("carries the page's own title and summary into the search-result listing", () => {
        cy.mount(
            <CollectionPageJsonLd
                metadata={{
                    title: "Personal Projects",
                    description: "Software projects built in spare time.",
                }}
                pathname="/projects/personal"
            />,
        );

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text()) as Record<string, unknown>;
            expect(data["name"]).to.eq("Personal Projects");
            expect(data["description"]).to.eq(
                "Software projects built in spare time.",
            );
        });
    });

    it("does not attribute a blog category page to the site owner", () => {
        cy.mount(
            <CollectionPageJsonLd
                metadata={{
                    title: "Java",
                    description: "Articles about Java.",
                }}
                pathname="/blog-articles/java"
            />,
        );

        cy.get('script[type="application/ld+json"]').then(($script) => {
            const data = JSON.parse($script.text()) as Record<string, unknown>;
            void expect(data["about"]).to.be.undefined;
        });
    });
});
