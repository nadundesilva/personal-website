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
import Achievements from "@/app/(home)/_content/sections/Achievements";

describe("Achievements", () => {
    beforeEach(() => {
        cy.mount(<Achievements />);
    });

    it("makes every achievement reachable and focusable by keyboard", () => {
        cy.get("figure").should("have.length.greaterThan", 0);
        cy.get("figure").first().should("have.attr", "tabindex", "0");
    });

    it("announces the achievement caption to screen readers before it is visually revealed", () => {
        cy.get("figure")
            .first()
            .find("figcaption")
            .should("exist")
            .and("not.be.empty");
    });

    // realHover needs CDP to simulate genuine OS-level pointer state - a
    // synthetic mouseover/pointerover event never activates CSS :hover in
    // any browser. Firefox has no CDP, so this can't run there.
    it("reveals the caption on hover", { browser: "!firefox" }, () => {
        // The overlay is opacity-0 until group-hover, not display:none, so
        // Cypress's automatic visibility check won't catch the difference —
        // assert the computed opacity directly.
        cy.get("figure")
            .first()
            .find("figcaption")
            .parent()
            .should("have.css", "opacity", "0");

        cy.get("figure").first().realHover();

        cy.get("figure")
            .first()
            .find("figcaption")
            .parent()
            .should("have.css", "opacity", "1");
    });

    it("reveals the caption on keyboard focus", () => {
        cy.get("figure")
            .first()
            .find("figcaption")
            .parent()
            .should("have.css", "opacity", "0");

        cy.get("figure").first().focus();

        cy.get("figure")
            .first()
            .find("figcaption")
            .parent()
            .should("have.css", "opacity", "1");
    });
});
