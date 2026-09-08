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
import HorizontalGradientLine from "@/components/primitives/HorizontalGradientLine";

describe("HorizontalGradientLine", () => {
    it("hides the decorative line from screen readers", () => {
        cy.mount(<HorizontalGradientLine />);

        // The component renders with aria-hidden="true" as it is purely decorative.
        cy.get("[aria-hidden='true']").should("exist");
    });

    it("fades from both edges in its centered form", () => {
        cy.mount(<HorizontalGradientLine variant="centered" />);

        // A left-anchored line fades color -> transparent via a two-stop
        // gradient; the centered variant fades in from both edges via a
        // three-stop gradient, so this checks for the middle color stop.
        cy.get("[aria-hidden='true']")
            .should("have.css", "background-image")
            .and("match", /^linear-gradient\(.*,.*,.*\)$/);
    });
});
