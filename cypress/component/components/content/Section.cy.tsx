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
import Section from "@/components/content/Section";

describe("Section", () => {
    it("marks its content as a distinct document section", () => {
        cy.mount(
            <Section>
                <p>Section content</p>
            </Section>,
        );

        cy.get("section").should("exist");
        cy.contains("Section content").should("be.visible");
    });

    it("separates stacked sections but adds no trailing rule after the last one", () => {
        cy.mount(
            <div>
                <Section>
                    <p>First</p>
                </Section>
                <Section>
                    <p>Last</p>
                </Section>
            </div>,
        );

        cy.get("section")
            .first()
            .find("[data-slot='separator']")
            .should("have.css", "display", "block");
        cy.get("section")
            .last()
            .find("[data-slot='separator']")
            .should("have.css", "display", "none");
    });

    it("takes its accessible name from the heading it is given", () => {
        cy.mount(
            <div>
                <h2 id="section-heading">My Section</h2>
                <Section labelledById="section-heading">
                    <p>Content</p>
                </Section>
            </div>,
        );

        cy.get("section").should(
            "have.attr",
            "aria-labelledby",
            "section-heading",
        );
    });

    it("has no accessible name when it is not given a heading to label it", () => {
        cy.mount(
            <Section>
                <p>Content</p>
            </Section>,
        );

        cy.get("section").should("not.have.attr", "aria-labelledby");
    });
});
