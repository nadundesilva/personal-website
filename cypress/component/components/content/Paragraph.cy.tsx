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
import Paragraph from "@/components/content/Paragraph";

describe("Paragraph", () => {
    it("presents its content as a paragraph of body text", () => {
        cy.mount(<Paragraph>Hello, world!</Paragraph>);

        cy.get("p").should("have.text", "Hello, world!");
    });

    it("preserves inline formatting within the paragraph text", () => {
        cy.mount(
            <Paragraph>
                Text with <strong>bold</strong> content.
            </Paragraph>,
        );

        cy.get("p").contains("bold").should("exist");
    });

    // text-justify / text-start are sm:-scoped, so the viewport must be wide
    // enough (>= 640px) for either alignment to apply - otherwise both
    // variants fall back to the same left alignment and the assertions pass
    // without proving anything.
    describe("at a wide viewport", () => {
        beforeEach(() => {
            cy.viewport(800, 600);
        });

        it("justifies body text by default", () => {
            cy.mount(<Paragraph>Some body copy.</Paragraph>);

            cy.get("p").should("have.css", "text-align", "justify");
        });

        it("aligns to the start edge when the caller opts out of justification", () => {
            cy.mount(<Paragraph textAlign="start">Some body copy.</Paragraph>);

            cy.get("p")
                .should("have.css", "text-align")
                .and("be.oneOf", ["start", "left"]);
        });
    });
});
