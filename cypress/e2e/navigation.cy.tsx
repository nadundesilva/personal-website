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

const extractArticleUrlsFromAllLinks = (
    allLinks: JQuery<HTMLElement>,
    allArticleUrls: string[],
): string[] => {
    const articleUrlsSet = new Set(allArticleUrls);
    return Array.from(allLinks)
        .map((link) => link.getAttribute("href"))
        .filter(
            (href): href is string =>
                href !== null &&
                href.startsWith("/blog-articles/") &&
                articleUrlsSet.has(href),
        );
};

describe("navigation between pages", () => {
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
                cy.scrollTo(0, 0, { duration: 1000, ensureScrollable: false });
                cy.get("@navlink").click({ waitForAnimations: true });

                cy.wait(1000);
                cy.findAllByRole("progressbar").should("not.exist");

                if (route.subRoutes !== undefined) {
                    throw new Error(
                        "Nesting three levels of navigation is not supported",
                    );
                }
                cy.clickBreadcrumbByName(currentRouteName);
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
                cy.clickBreadcrumbByName(currentRouteName);
            });
        };

        visitNavLink(WebsiteHome.subRoutes, WebsiteHome.name);
    });

    it("properly navigates to all blog articles and back using breadcrumbs", () => {
        cy.task<string[]>("discoverBlogArticles", ".").then(
            (discoveredArticles) => {
                cy.log(`Discovered ${discoveredArticles.length} blog articles`);

                cy.loadPage("/blog-articles");
                cy.wait(1000);
                cy.findAllByRole("progressbar").should("not.exist");

                // Find all article links on the page (excluding category links)
                cy.findAllByRole("link").then(($links) => {
                    const articleUrls = extractArticleUrlsFromAllLinks(
                        $links,
                        discoveredArticles,
                    );

                    cy.log(`Found ${articleUrls.length} article links on page`);

                    expect(articleUrls.length).to.equal(
                        discoveredArticles.length,
                        `Expected ${discoveredArticles.length} articles but found ${articleUrls.length}`,
                    );

                    // Navigate to each article found on the page
                    articleUrls.forEach((articleUrl) => {
                        cy.log(`Navigating to article: ${articleUrl}`);

                        cy.clickLinkByHref(articleUrl);
                        cy.location("pathname").should("eq", articleUrl);

                        cy.clickBreadcrumbByName("Blog Articles");
                    });
                });
            },
        );
    });

    it("properly navigates to all blog articles from sub group pages and back using breadcrumbs", () => {
        cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
            (discoveredSubGroupPages) => {
                cy.task<string[]>("discoverBlogArticles", ".").then(
                    (discoveredArticles) => {
                        cy.log(
                            `Discovered ${discoveredSubGroupPages.length} sub group pages`,
                        );
                        cy.log(
                            `Discovered ${discoveredArticles.length} blog articles`,
                        );

                        cy.loadPage("/blog-articles");
                        cy.wait(1000);
                        cy.findAllByRole("progressbar").should("not.exist");

                        discoveredSubGroupPages.forEach((subGroupPage) => {
                            cy.log(`Testing sub group page: ${subGroupPage}`);

                            // Navigate to the group page by clicking the link from /blog-articles
                            cy.clickLinkByHref(subGroupPage);
                            cy.location("pathname").should("eq", subGroupPage);

                            // Find all article links on the page (excluding category/group links)
                            cy.findAllByRole("link").then(($links) => {
                                const articleUrls =
                                    extractArticleUrlsFromAllLinks(
                                        $links,
                                        discoveredArticles,
                                    );

                                // Navigate to each article found on this group page
                                articleUrls.forEach((articleUrl) => {
                                    cy.log(
                                        `Navigating to article: ${articleUrl} from ${subGroupPage}`,
                                    );

                                    cy.clickLinkByHref(articleUrl);
                                    cy.location("pathname").should(
                                        "eq",
                                        articleUrl,
                                    );

                                    // Go back to group page using breadcrumbs
                                    cy.clickBreadcrumbByHref(subGroupPage);

                                    cy.location("pathname").should(
                                        "eq",
                                        subGroupPage,
                                    );
                                });
                            });

                            // After testing all articles in this group, go back to /blog-articles
                            cy.clickBreadcrumbByName("Blog Articles");
                            cy.wait(1000);
                            cy.findAllByRole("progressbar").should("not.exist");
                        });
                    },
                );
            },
        );
    });
});
