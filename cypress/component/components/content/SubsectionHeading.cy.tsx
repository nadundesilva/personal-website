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
import SubsectionHeading from "@/components/content/SubsectionHeading";

describe("SubsectionHeading", () => {
    it("is a navigable subsection heading", () => {
        cy.mount(<SubsectionHeading>My Subsection</SubsectionHeading>);

        cy.findByRole("heading", { level: 3, name: /my subsection/i }).should(
            "be.visible",
        );
    });

    it("can be linked to directly via a URL anchor", () => {
        cy.mount(
            <SubsectionHeading id="my-section">
                Anchor Section
            </SubsectionHeading>,
        );

        cy.get("h3#my-section").should("exist");
    });

    it("cannot be linked to via a URL anchor when it is not an anchor target", () => {
        cy.mount(<SubsectionHeading>No Id</SubsectionHeading>);

        cy.get("h3").should("not.have.attr", "id");
    });
});
