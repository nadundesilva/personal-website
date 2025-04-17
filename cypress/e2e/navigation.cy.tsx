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
                    name: new RegExp(`View ${route.name}`, "i"),
                })
                    .as("navlink")
                    .should("be.visible");
                cy.scrollTo(0, 0, { duration: 1000 });
                cy.get("@navlink").click({ waitForAnimations: true });

                cy.wait(1000);
                cy.findByRole("progressbar").should("not.exist");

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
});
