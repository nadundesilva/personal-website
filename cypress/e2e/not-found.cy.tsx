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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import { WebsiteHome } from "@/constants/routes";

describe("404 not found page", () => {
    const unknownUrls = [
        "/this-page-does-not-exist",
        "/experience/this-page-does-not-exist",
        "/blog-articles/this-page-does-not-exist/this-page-does-not-exist",
    ];

    it("answers an unknown URL with a 404 and a not-found page", () => {
        for (const url of unknownUrls) {
            cy.request({ url, failOnStatusCode: false })
                .its("status")
                .should("eq", 404);

            cy.loadPage(url, { failOnStatusCode: false });

            cy.findByRole("heading", {
                name: /page not found/i,
                level: 1,
            }).should("be.visible");
            cy.findByRole("link", { name: /go to homepage/i }).should(
                "be.visible",
            );
            cy.findByRole("link", { name: /browse blog articles/i }).should(
                "be.visible",
            );

            // The static 404 shell is served for every unknown URL. Nothing
            // from the unmatched path may leak into layout chrome: no
            // breadcrumb trail, and no primary-nav item marked as the current
            // page (e.g. "Experience" for /experience/does-not-exist).
            cy.findByRole("navigation", { name: /breadcrumb/i }).should(
                "not.exist",
            );
            cy.findByRole("navigation", { name: /primary navigation/i })
                .findByRole("link", { current: "page" })
                .should("not.exist");
        }
    });

    it("identifies itself as not found to the browser tab and to crawlers", () => {
        cy.loadPage("/this-page-does-not-exist", { failOnStatusCode: false });

        cy.title().should("match", /page not found/i);

        // The built 404 page (see out/404.html) carries two <meta
        // name="robots"> tags: one from this page's own metadata, and one
        // Next.js injects unconditionally while rendering the reserved /404
        // route. What must never happen is the root layout's index/follow
        // directive leaking onto either of them - every robots meta present
        // here must say noindex, none may say "index, follow".
        cy.get('meta[name="robots"]').each(($meta) => {
            expect($meta.attr("content")).to.match(/noindex/);
        });
    });

    it("navigates home when clicking the Go to Homepage link", () => {
        cy.loadPage("/this-page-does-not-exist", { failOnStatusCode: false });

        cy.findByRole("link", { name: /go to homepage/i }).click({
            waitForAnimations: true,
        });

        cy.location("pathname").should("eq", WebsiteHome.path);
    });

    it("navigates to blog articles when clicking the Browse Blog Articles link", () => {
        cy.loadPage("/this-page-does-not-exist", { failOnStatusCode: false });

        cy.findByRole("link", { name: /browse blog articles/i }).click({
            waitForAnimations: true,
        });

        cy.location("pathname").should("eq", "/blog-articles");
    });
});
