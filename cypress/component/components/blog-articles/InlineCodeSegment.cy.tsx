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
import InlineCodeSegment from "@/components/blog-articles/InlineCodeSegment";

describe("InlineCodeSegment", () => {
    it("presents the text as inline code", () => {
        cy.mount(<InlineCodeSegment>const x = 1;</InlineCodeSegment>);

        cy.get("code").should("have.text", "const x = 1;");
    });

    it("concatenates multiple children into a single code segment", () => {
        cy.mount(
            <InlineCodeSegment>
                {"npm"}
                {" install"}
            </InlineCodeSegment>,
        );

        cy.get("code").should("have.text", "npm install");
    });
});
