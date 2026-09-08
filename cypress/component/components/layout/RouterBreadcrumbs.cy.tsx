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

import RouterBreadcrumbs from "@/components/layout/RouterBreadcrumbs";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import { WebsiteHome } from "@/constants/routes";

const mountAtPath = (pathname: string): void => {
    cy.mount(
        <PathnameContext.Provider value={pathname}>
            <RouterBreadcrumbs topLevelRoutes={WebsiteHome.subRoutes} />
        </PathnameContext.Provider>,
    );
};

describe("RouterBreadcrumbs", () => {
    it("shows no breadcrumb trail on the home page", () => {
        mountAtPath("/");

        cy.findByRole("navigation", { name: /breadcrumb/i }).should(
            "not.exist",
        );
    });

    it("builds the full trail for a nested route", () => {
        mountAtPath("/projects/personal");

        cy.findByRole("navigation", { name: /breadcrumb/i }).within(() => {
            cy.findByRole("link", { name: "Home" }).should("be.visible");
            cy.findByRole("link", { name: "Projects" }).should("be.visible");
            cy.contains("Personal Projects").should("be.visible");
        });
    });

    it("marks the deepest crumb as the current page rather than a link", () => {
        mountAtPath("/projects/personal");

        cy.findByRole("link", { name: "Personal Projects" }).should(
            "not.exist",
        );
        cy.contains("Personal Projects").should(
            "have.attr",
            "aria-current",
            "page",
        );
    });

    it("links every ancestor crumb to its own page", () => {
        mountAtPath("/projects/personal");

        cy.findByRole("link", { name: "Home" }).should(
            "have.attr",
            "href",
            "/",
        );
        cy.findByRole("link", { name: "Projects" }).should(
            "have.attr",
            "href",
            "/projects",
        );
    });

    it("stops the trail at the last known section when the path goes deeper than the route map", () => {
        mountAtPath("/blog-articles/observability/some-article");

        cy.findByRole("navigation", { name: /breadcrumb/i }).within(() => {
            cy.findByRole("link", { name: "Home" }).should("be.visible");
            cy.findByRole("link", { name: "Blog Articles" }).should(
                "be.visible",
            );
            cy.contains("Observability").should(
                "have.attr",
                "aria-current",
                "page",
            );
        });
    });

    it("describes the page's position in the site hierarchy for crawlers", () => {
        mountAtPath("/projects/personal");

        cy.get('script[type="application/ld+json"]#json-ld-breadcrumb').then(
            ($script) => {
                const data = JSON.parse($script.text());
                expect(data["@type"]).to.eq("BreadcrumbList");

                const items = data["itemListElement"] as Record<
                    string,
                    unknown
                >[];
                expect(items).to.have.length(3);
                items.forEach((item, index) => {
                    expect(item["position"]).to.eq(index + 1);
                });

                expect(items[0]["item"]).to.eq(`${WEBSITE_PUBLIC_URL}/`);
                expect(items[1]["item"]).to.eq(
                    `${WEBSITE_PUBLIC_URL}/projects`,
                );
                expect(items[2]["item"]).to.eq(
                    `${WEBSITE_PUBLIC_URL}/projects/personal`,
                );
            },
        );
    });
});
