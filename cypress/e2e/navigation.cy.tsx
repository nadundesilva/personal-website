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
import { WebsiteHome, type Route } from "@/constants/routes";

describe("navigation between pages", () => {
    it("properly navigates through the main nav links", () => {
        cy.loadPage(WebsiteHome.path);

        Object.values(WebsiteHome.subRoutes).forEach((route) => {
            cy.clickNavLink(route.name);
        });
    });

    it("properly navigates to pages and back using breadcrumbs", () => {
        cy.loadPage(WebsiteHome.path);

        const visitSubRoutes = (
            currentRoutes: Record<string, Route>,
            currentRouteName: string,
        ) => {
            Object.values(currentRoutes).forEach((route) => {
                cy.findByRole("link", {
                    name: new RegExp(`^View ${route.name}$`, "i"),
                })
                    .as("navlink")
                    .should("be.visible");
                cy.scrollTo(0, 0, { duration: 1000 });
                cy.get("@navlink").click({ waitForAnimations: true });

                cy.wait(1000);
                cy.findAllByRole("progressbar").should("not.exist");

                if (route.subRoutes !== undefined) {
                    throw new Error(
                        "Nesting three levels of navigation is not supported",
                    );
                }
                cy.clickBreadcrumb(currentRouteName);
            });
        };

        const visitNavLink = (
            currentRoutes: Record<string, Route>,
            currentRouteName: string,
        ) => {
            Object.values(currentRoutes).forEach((route) => {
                cy.clickNavLink(route.name);
                if (route.subRoutes !== undefined) {
                    visitSubRoutes(route.subRoutes, route.name);
                }
                cy.clickBreadcrumb(currentRouteName);
            });
        };

        visitNavLink(WebsiteHome.subRoutes, WebsiteHome.name);
    });

    it("properly navigates to all blog articles", () => {
        cy.task<string[]>("discoverBlogArticles").then((discoveredArticles) => {
            cy.log(`Discovered ${discoveredArticles.length} blog articles`);

            cy.loadPage("/blog-articles");
            cy.wait(1000);
            cy.findAllByRole("progressbar").should("not.exist");

            // Count article links on the page
            cy.findAllByRole("link").then(($links) => {
                const articleLinks = Array.from($links).filter((link) => {
                    const href = link.getAttribute("href");
                    return href?.startsWith("/blog-articles/") ?? false;
                });
                const articleCount = articleLinks.length;
                cy.log(`Found ${articleCount} article links on page`);

                expect(articleCount).to.equal(
                    discoveredArticles.length,
                    `Expected ${discoveredArticles.length} articles but found ${articleCount}`,
                );
            });

            // Navigate to each discovered article
            discoveredArticles.forEach((articleUrl) => {
                cy.log(`Navigating to article: ${articleUrl}`);

                // Find the article link by href using attribute selector
                cy.get(`a[href="${articleUrl}"]`)
                    .as("articleLink")
                    .should("be.visible");

                cy.scrollTo(0, 0, { duration: 1000 });
                cy.get("@articleLink").click({ waitForAnimations: true });

                cy.wait(1000);
                cy.findAllByRole("progressbar").should("not.exist");

                // Verify we're on the article page by checking URL
                cy.url().should("include", articleUrl);

                // Navigate back to blog articles page using breadcrumbs
                cy.clickBreadcrumb("Blog Articles");
            });
        });
    });
});
