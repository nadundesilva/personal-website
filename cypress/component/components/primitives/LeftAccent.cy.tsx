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
import LeftAccent from "@/components/primitives/LeftAccent";

describe("LeftAccent", () => {
    it("shows its content", () => {
        cy.mount(
            <LeftAccent>
                <p>Accented content</p>
            </LeftAccent>,
        );

        cy.contains("Accented content").should("be.visible");
    });

    it("draws a thinner accent stripe in its thin form", () => {
        cy.mount(
            <LeftAccent thickness="thin">
                <span>Thin accent</span>
            </LeftAccent>,
        );

        cy.contains("Thin accent")
            .parent()
            .should("have.css", "border-left-width", "2px");
    });
});
