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
import { Routes, type Route } from "@/constants/routes";

describe("navigation between pages", () => {
    it("validates navigation between pages", () => {
        cy.loadPage("/");

        const visitSubRoutes = (
            currentRoutes: Record<string, Route>,
            currentRouteName: string,
        ) => {
            Object.values(currentRoutes).forEach((route) => {
                const breadcrumb = cy.findByRole("link", {
                    name: new RegExp(`View ${route.name}`, "i"),
                });
                breadcrumb.should("exist");
                breadcrumb.click({ waitForAnimations: true });
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
        visitNavLink(Routes, "Home");
    });
});
