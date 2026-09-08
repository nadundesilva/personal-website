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

const assertVisibleImagesLoaded = (): void => {
    // Only the currently-visible theme variant of a light/dark image pair is
    // checked - its hidden sibling is "display: none" and browsers never
    // fetch a lazy-loaded image that has no layout box. Scrolling each one
    // into view is required (not optional): a pair's counterpart only gains
    // its layout box once the theme switch flips its "hidden"/"block" class,
    // and by then the page may already be scrolled past it, so the browser's
    // native lazy-loading would otherwise never trigger a fetch for it.
    //
    // cy.get("body").then() rather than cy.get("img:visible") directly:
    // some routes legitimately have no images at all, and cy.get() fails
    // the test when nothing matches instead of vacuously passing.
    cy.get("body").then(($body) => {
        if ($body.find("img:visible").length === 0) return;

        cy.get("img:visible").each(($img) => {
            cy.wrap($img).scrollIntoView();
            // Default 4s command timeout is occasionally too tight: the
            // browser's native loading="lazy" fetch is scheduled on an
            // internal heuristic after scrollIntoView(), not a bounded-
            // latency event, so decode can occasionally take longer under
            // load. The timeout must be set on the command directly
            // preceding .should() - it retries that command, not the whole
            // chain.
            cy.wrap($img, { timeout: 20000 })
                .should("have.prop", "complete", true)
                .and("have.prop", "naturalWidth")
                .and("be.greaterThan", 0);
        });
    });
};

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
            assertVisibleImagesLoaded();

            cy.findByRole("button", { name: /switch to dark theme/i }).click({
                waitForAnimations: true,
            });
            cy.get("html").should("have.class", "dark");
            assertVisibleImagesLoaded();
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
