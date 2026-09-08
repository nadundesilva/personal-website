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
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shadcn/ui";

describe("Breadcrumb", () => {
    it("is announced to screen readers as breadcrumb navigation", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        cy.findByRole("navigation", { name: /breadcrumb/i }).should(
            "be.visible",
        );
    });

    it("conveys the trail's page order to assistive tech", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Blog</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        // The ol's item order is what conveys trail order to assistive tech.
        cy.get("ol").within(() => {
            cy.get("li").eq(0).should("contain.text", "Home");
            cy.get("li").eq(1).should("contain.text", "Blog");
        });
    });

    it("lets the user navigate back to an ancestor page", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        cy.findByRole("link", { name: /home/i })
            .should("exist")
            .and("have.attr", "href", "/home");
    });

    it("identifies the current page within the trail", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        cy.contains("Current Page").should("have.attr", "aria-current", "page");
    });

    it("hides separators between items from screen readers", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Blog</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        cy.get("[data-slot='breadcrumb-separator']").should(
            "have.attr",
            "aria-hidden",
            "true",
        );
    });

    it("links every ancestor page and marks only the deepest item as current", () => {
        cy.mount(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/blog-articles">
                            Blog Articles
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Article</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        );

        cy.findByRole("link", { name: /home/i }).should("exist");
        cy.findByRole("link", { name: /blog articles/i }).should("exist");
        cy.contains("Current Article").should(
            "have.attr",
            "aria-current",
            "page",
        );
    });
});
