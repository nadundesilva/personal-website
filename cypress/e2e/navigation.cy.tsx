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
import { FULL_NAME } from "@/constants/metadata";
import { WebsiteHome, type Route } from "@/constants/routes";
import {
    ALL_ROUTE_PATHS,
    SAMPLE_BLOG_ARTICLE_PATH,
} from "@/cypress/support/routes";

const MOBILE_VIEWPORT_WIDTH = 375;
const MOBILE_VIEWPORT_HEIGHT = 812;

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
    it("navigates to pages and back using breadcrumbs", () => {
        cy.loadPage(WebsiteHome.path);
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        const visitSubRoutes = (
            currentRoutes: Record<string, Route>,
            currentRouteName: string,
            currentPath: string,
        ) => {
            Object.values(currentRoutes).forEach((route) => {
                cy.findByRole("link", {
                    name: currentPath.startsWith("/blog-articles")
                        ? new RegExp(`^${route.name} articles$`, "i")
                        : new RegExp(`^View ${route.name}$`, "i"),
                })
                    .as("navlink")
                    .scrollIntoView()
                    .should("be.visible");
                cy.scrollTo(0, 0, { duration: 1000, ensureScrollable: false });
                cy.get("@navlink").click({ waitForAnimations: true });

                cy.wait(1000);
                cy.findAllByTestId("route-segment-loading-spinner").should(
                    "not.exist",
                );
                cy.findByRole("heading", { level: 1 }).should("be.visible");
                cy.scrollTo("bottom", {
                    duration: 1000,
                    ensureScrollable: false,
                });

                expect(
                    route.subRoutes,
                    "Sub-routes found in third-level route",
                ).to.equal(undefined);
                cy.clickBreadcrumbByName(currentRouteName);
                cy.location("pathname").should("eq", currentPath);
            });
        };

        const visitNavLink = (
            currentRoutes: Record<string, Route>,
            currentRouteName: string,
            currentPath: string,
        ) => {
            Object.values(currentRoutes).forEach((route) => {
                cy.clickNavLink(route.name);
                cy.wait(1000);
                cy.findAllByTestId("route-segment-loading-spinner").should(
                    "not.exist",
                );
                cy.location("pathname").should("eq", route.path);
                cy.findByRole("heading", { level: 1 }).should("be.visible");
                cy.scrollTo("bottom", {
                    duration: 1000,
                    ensureScrollable: false,
                });

                if (route.subRoutes !== undefined) {
                    visitSubRoutes(route.subRoutes, route.name, route.path);
                }
                cy.clickBreadcrumbByName(currentRouteName);
                cy.location("pathname").should("eq", currentPath);
            });
        };

        visitNavLink(WebsiteHome.subRoutes, WebsiteHome.name, WebsiteHome.path);
    });

    it("respects the browser's own back/forward navigation, not just in-page breadcrumbs and nav links", () => {
        const [route] = Object.values(WebsiteHome.subRoutes);

        const assertOnRoute = (): void => {
            cy.location("pathname").should("eq", route.path);
            cy.findByRole("heading", {
                name: new RegExp(`^${route.name}$`, "i"),
                level: 1,
            }).should("be.visible");
            cy.findByTestId("app-bar").within(() => {
                cy.findByRole("link", { name: route.name }).should(
                    "have.attr",
                    "aria-current",
                    "page",
                );
            });
        };

        const assertOnHome = (): void => {
            cy.location("pathname").should("eq", WebsiteHome.path);

            // Home's <h1> is the person's name (WelcomeBanner), not a route
            // name - there is no WebsiteHome.subRoutes entry for "/" to check
            // a heading against, so this confirms the home page's own
            // content actually rendered rather than just the URL matching.
            cy.findByRole("heading", { name: FULL_NAME, level: 1 }).should(
                "be.visible",
            );
            // WebsiteHome.subRoutes has no entry for "/" itself, so no nav
            // link is ever marked current on the home page - only the
            // absence of the previous page's aria-current is meaningful here.
            cy.findByTestId("app-bar").within(() => {
                cy.findByRole("link", { name: route.name }).should(
                    "not.have.attr",
                    "aria-current",
                );
            });
        };

        cy.loadPage(WebsiteHome.path);
        cy.clickNavLink(route.name);
        assertOnRoute();

        cy.go("back");
        cy.wait(1000);
        cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
        assertOnHome();

        cy.go("forward");
        cy.wait(1000);
        cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
        assertOnRoute();
    });

    describe("mobile drawer navigation", () => {
        afterEach(() => {
            cy.viewport(
                Cypress.config("viewportWidth"),
                Cypress.config("viewportHeight"),
            );
        });

        it("opens the drawer and navigates to a page", () => {
            const firstRoute = Object.values(WebsiteHome.subRoutes)[0];

            cy.loadPage(WebsiteHome.path);
            cy.viewport(MOBILE_VIEWPORT_WIDTH, MOBILE_VIEWPORT_HEIGHT);

            cy.findByRole("button", {
                name: /open navigation menu/i,
            }).click({ waitForAnimations: true });

            cy.findByRole("navigation", {
                name: /drawer navigation/i,
            }).should("be.visible");

            cy.findByRole("navigation", { name: /drawer navigation/i }).within(
                () => {
                    cy.findByRole("link", {
                        name: new RegExp(`^${firstRoute.name}$`, "i"),
                    }).click({ waitForAnimations: true });
                },
            );

            cy.wait(1000);
            cy.findAllByTestId("route-segment-loading-spinner").should(
                "not.exist",
            );
            cy.location("pathname").should("eq", firstRoute.path);

            cy.findByRole("navigation", {
                name: /drawer navigation/i,
            }).should("not.exist");
        });

        // realPress needs CDP to simulate a genuine Tab keypress - a
        // synthetic keydown never triggers the browser's native
        // focus-traversal default action in any browser. Firefox has no
        // CDP, so this can't run there.
        it(
            "puts the mobile menu toggle right after the skip link in tab order",
            { browser: "!firefox" },
            () => {
                cy.loadPage(WebsiteHome.path);
                cy.viewport(MOBILE_VIEWPORT_WIDTH, MOBILE_VIEWPORT_HEIGHT);

                cy.get("body").realPress("Tab");
                cy.focused().should("have.text", "Skip to Content");

                cy.focused().realPress("Tab");
                cy.focused().should(
                    "have.attr",
                    "aria-label",
                    "Open navigation menu",
                );
            },
        );

        // Layout.tsx configures the Drawer with modal={false}, so unlike
        // shadcn/ui/drawer.cy.tsx's Escape-key test (which mounts the
        // component's default modal={true}), this pins the behaviour of
        // the non-modal configuration the site actually ships.
        it("closes the drawer with Escape and returns focus to the toggle button", () => {
            cy.loadPage(WebsiteHome.path);
            cy.viewport(MOBILE_VIEWPORT_WIDTH, MOBILE_VIEWPORT_HEIGHT);

            cy.findByRole("button", {
                name: /open navigation menu/i,
            }).click({ waitForAnimations: true });
            cy.findByRole("navigation", {
                name: /drawer navigation/i,
            }).should("be.visible");

            cy.get("body").type("{esc}");

            cy.findByRole("navigation", {
                name: /drawer navigation/i,
            }).should("not.exist");
            cy.focused().should(
                "have.attr",
                "aria-label",
                "Open navigation menu",
            );
        });
    });

    it("navigates to all blog articles and back using breadcrumbs", () => {
        cy.task<string[]>("discoverBlogArticles", ".").then(
            (discoveredArticles) => {
                cy.log(`Discovered ${discoveredArticles.length} blog articles`);

                cy.loadPage("/blog-articles");
                cy.wait(1000);
                cy.findAllByTestId("route-segment-loading-spinner").should(
                    "not.exist",
                );
                cy.scrollTo("bottom", {
                    duration: 1000,
                    ensureScrollable: false,
                });

                // Find all article links on the page (excluding category links)
                cy.findAllByRole("link").then(($links) => {
                    const articleUrls = extractArticleUrlsFromAllLinks(
                        $links,
                        discoveredArticles,
                    );

                    cy.log(`Found ${articleUrls.length} article links on page`);

                    expect(discoveredArticles.length).to.be.greaterThan(
                        0,
                        "Expected at least one blog article to be discovered",
                    );
                    expect(articleUrls.length).to.equal(
                        discoveredArticles.length,
                        `Expected ${discoveredArticles.length} articles but found ${articleUrls.length}`,
                    );

                    // Navigate to each article found on the page
                    articleUrls.forEach((articleUrl) => {
                        cy.log(`Navigating to article: ${articleUrl}`);

                        cy.clickLinkByHref(articleUrl);
                        cy.location("pathname").should("eq", articleUrl);
                        cy.wait(1000);
                        cy.findAllByTestId(
                            "route-segment-loading-spinner",
                        ).should("not.exist");
                        cy.findByRole("heading", { level: 1 }).should(
                            "be.visible",
                        );
                        cy.findByRole("link", { name: /read on medium/i })
                            .should("be.visible")
                            .and("have.attr", "target", "_blank");
                        cy.scrollTo("bottom", {
                            duration: 1000,
                            ensureScrollable: false,
                        });

                        cy.clickBreadcrumbByName("Blog Articles");
                    });
                });
            },
        );
    });

    it("navigates to all blog articles from sub group pages and back using breadcrumbs", () => {
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
                        cy.findAllByTestId(
                            "route-segment-loading-spinner",
                        ).should("not.exist");
                        cy.scrollTo("bottom", {
                            duration: 1000,
                            ensureScrollable: false,
                        });

                        discoveredSubGroupPages.forEach((subGroupPage) => {
                            cy.log(`Testing sub group page: ${subGroupPage}`);

                            // Navigate to the group page by clicking the link from /blog-articles
                            cy.clickLinkByHref(subGroupPage);
                            cy.location("pathname").should("eq", subGroupPage);
                            cy.wait(1000);
                            cy.findAllByTestId(
                                "route-segment-loading-spinner",
                            ).should("not.exist");
                            cy.scrollTo("bottom", {
                                duration: 1000,
                                ensureScrollable: false,
                            });

                            cy.findByRole("heading", { level: 1 }).should(
                                "be.visible",
                            );

                            // Find all article links on the page (excluding category/group links)
                            cy.findAllByRole("link").then(($links) => {
                                const articleUrls =
                                    extractArticleUrlsFromAllLinks(
                                        $links,
                                        discoveredArticles,
                                    );

                                expect(
                                    articleUrls.length,
                                    `Category page ${subGroupPage} should have at least one article`,
                                ).to.be.greaterThan(0);

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
                                    cy.wait(1000);
                                    cy.findAllByTestId(
                                        "route-segment-loading-spinner",
                                    ).should("not.exist");
                                    cy.scrollTo("bottom", {
                                        duration: 1000,
                                        ensureScrollable: false,
                                    });

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
                            cy.findAllByTestId(
                                "route-segment-loading-spinner",
                            ).should("not.exist");
                        });
                    },
                );
            },
        );
    });
});

describe("link integrity across every page", () => {
    // Static export: every href and id is in the served HTML, so parse the
    // response body directly rather than rendering each route in the browser
    // (same approach as blog-articles.cy.tsx's cross-reference check).
    const PAGES_TO_SWEEP = [...ALL_ROUTE_PATHS, SAMPLE_BLOG_ARTICLE_PATH];

    const parseHtml = (html: string): Document =>
        new DOMParser().parseFromString(html, "text/html");

    it("points every internal link at a page that exists", () => {
        // Off-site links are covered by security.cy.tsx; in-article absolute
        // cross-references by blog-articles.cy.tsx. This fills the remaining
        // gap: same-origin links on content pages that silently 404 after a
        // route rename or a typo'd href.
        const internalPaths = new Set<string>();

        for (const page of PAGES_TO_SWEEP) {
            cy.request(page).then((response) => {
                const anchors = parseHtml(
                    response.body as string,
                ).querySelectorAll<HTMLAnchorElement>("a[href]");
                for (const anchor of anchors) {
                    const href = anchor.getAttribute("href") ?? "";
                    if (!href.startsWith("/")) continue; // skip #, mailto:, tel:, http(s):
                    internalPaths.add(href.split("#")[0]);
                }
            });
        }

        cy.then(() => {
            expect(
                internalPaths.size,
                "internal links found across the swept pages",
            ).to.be.greaterThan(0);

            for (const path of internalPaths) {
                cy.request(path).its("status").should("eq", 200);
            }
        });
    });

    it("points every in-page anchor at a section that exists on the page", () => {
        let fragmentsChecked = 0;

        for (const page of PAGES_TO_SWEEP) {
            cy.request(page).then((response) => {
                const doc = parseHtml(response.body as string);
                for (const anchor of doc.querySelectorAll<HTMLAnchorElement>(
                    'a[href^="#"]',
                )) {
                    const fragment = (anchor.getAttribute("href") ?? "").slice(
                        1,
                    );
                    if (fragment === "") continue;

                    fragmentsChecked += 1;
                    expect(
                        doc.getElementById(fragment),
                        `#${fragment} on ${page} resolves to an element`,
                    ).to.not.equal(null);
                }
            });
        }

        cy.then(() => {
            expect(
                fragmentsChecked,
                "in-page anchors found across the swept pages",
            ).to.be.greaterThan(0);
        });
    });
});
