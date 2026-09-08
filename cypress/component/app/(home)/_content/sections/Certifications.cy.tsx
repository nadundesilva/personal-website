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
import Certifications from "@/app/(home)/_content/sections/Certifications";

describe("Certifications", () => {
    beforeEach(() => {
        cy.mount(<Certifications />);
    });

    it("announces its certifications as a list", () => {
        cy.findByRole("list").should("exist");
        cy.findAllByRole("listitem").should("have.length.greaterThan", 0);
    });

    it("opens each certification's credential in a new tab", () => {
        cy.findAllByRole("listitem")
            .first()
            .find("a")
            .should("have.attr", "target", "_blank");
    });

    it("treats issuer logos as decorative", () => {
        cy.findAllByRole("listitem")
            .first()
            .find("img")
            .should("have.attr", "alt", "");
    });

    it("names the issuer of each certification", () => {
        cy.findAllByRole("listitem")
            .first()
            .findByText("Issued by")
            .should("exist");
    });
});
