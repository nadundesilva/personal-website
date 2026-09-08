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
import ScrollReveal from "@/components/primitives/ScrollReveal";

describe("ScrollReveal", () => {
    it("shows its content", () => {
        cy.mount(
            <ScrollReveal>
                <p>Revealed content</p>
            </ScrollReveal>,
        );

        cy.contains("Revealed content").should("be.visible");
    });

    it("lets the caller style the revealed content", () => {
        cy.mount(
            <ScrollReveal className="my-custom-class">
                <span>Classy content</span>
            </ScrollReveal>,
        );

        cy.contains("Classy content")
            .parent()
            .should("have.class", "my-custom-class");
    });

    it("keeps its content hidden until the reader scrolls it into view", () => {
        cy.mount(
            <>
                <div style={{ height: "150vh" }} />
                <ScrollReveal>
                    <p>Below the fold</p>
                </ScrollReveal>
            </>,
        );

        cy.contains("Below the fold")
            .parent()
            .should("have.css", "opacity", "0");
        cy.scrollTo("bottom");
        cy.contains("Below the fold")
            .parent()
            .should("have.css", "opacity", "1");
    });
});
