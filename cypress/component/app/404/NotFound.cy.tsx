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
import NotFound from "@/app/404/NotFound";

describe("NotFound", () => {
    beforeEach(() => {
        cy.mount(<NotFound />);
    });

    it("shows 'Page Not Found' as the page's top-level heading", () => {
        cy.findByRole("heading", {
            level: 1,
            name: /page not found/i,
        }).should("be.visible");
    });

    it("lets a lost visitor get back to the home page", () => {
        cy.findByRole("link", { name: /go to homepage/i })
            .should("be.visible")
            .and("have.attr", "href", "/");
    });

    it("lets a lost visitor get to the blog articles index", () => {
        cy.findByRole("link", { name: /browse blog articles/i })
            .should("be.visible")
            .and("have.attr", "href", "/blog-articles");
    });
});
