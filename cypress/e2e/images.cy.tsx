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
import { ALL_ROUTE_PATHS as ROUTES_TO_CHECK } from "@/cypress/support/routes";

describe("image optimization", () => {
    // next-image-export-optimizer rewrites every image into the built
    // /optimized-images/ folder with a multi-width srcset (see
    // next.config.mjs's nextImageExportOptimizer_* env). Nothing else here
    // checks the images actually went through that pipeline rather than
    // being served as unoptimized originals.
    it("serves images through the site's own multi-width optimized output", () => {
        cy.loadPage("/");
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        cy.get("img:visible")
            .first()
            .should("have.attr", "srcset")
            .and("include", "/optimized-images/");
        cy.get("img:visible")
            .first()
            .invoke("attr", "srcset")
            .then((srcset) => {
                const widths = srcset?.split(",").length ?? 0;
                expect(widths).to.be.greaterThan(1);
            });
    });
});

describe("images across every page", () => {
    it("loads every logo in both the light and dark themes", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.assertVisibleImagesLoaded();

            cy.findByRole("button", { name: /switch to dark theme/i }).click({
                waitForAnimations: true,
            });
            cy.get("html").should("have.class", "dark");
            cy.assertVisibleImagesLoaded();
        }
    });
});

describe("LCP image priority across every page", () => {
    // Each page should mark at most one image fetchPriority="high" - the LCP
    // element (see ArticleLayout.tsx, achievements/page.tsx and
    // ArticlesGroup.tsx). Marking more than one defeats the purpose: the
    // browser can no longer tell which image to prioritize first.
    it("marks at most one image as high priority on every page", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.get('img[fetchpriority="high"]').should(
                "have.length.lessThan",
                2,
            );
        }

        cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
            for (const article of articles) {
                cy.loadPage(article);
                cy.get('img[fetchpriority="high"]').should(
                    "have.length.lessThan",
                    2,
                );
            }
        });
    });

    it("prioritizes exactly one lead image on the blog index and its group pages", () => {
        cy.loadPage("/blog-articles");
        cy.get('img[fetchpriority="high"]').should("have.length", 1);

        cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
            (groupPages) => {
                cy.loadPage(groupPages[0]);
                cy.get('img[fetchpriority="high"]').should("have.length", 1);
            },
        );
    });
});
