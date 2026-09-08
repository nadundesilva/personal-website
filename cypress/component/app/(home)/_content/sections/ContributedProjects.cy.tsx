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
import ContributedProjects from "@/app/(home)/_content/sections/ContributedProjects";

describe("ContributedProjects", () => {
    beforeEach(() => {
        cy.mount(<ContributedProjects />);
    });

    it("announces enterprise and personal projects as two separate lists", () => {
        cy.findAllByRole("list").should("have.length", 2);
    });

    it("labels each project list by its visible subheading", () => {
        for (const name of ["Enterprise Projects", "Personal Projects"]) {
            cy.findByRole("heading", { name }).then(($heading) => {
                const headingId = $heading.attr("id");
                cy.get(`ul[aria-labelledby="${headingId}"]`).should("exist");
            });
        }
    });

    it("opens each project in a new tab", () => {
        cy.findAllByRole("listitem")
            .first()
            .find("a")
            .should("have.attr", "target", "_blank");
    });

    it("treats project logos as decorative", () => {
        cy.findAllByRole("listitem")
            .first()
            .find("img")
            .should("have.attr", "alt", "");
    });
});
