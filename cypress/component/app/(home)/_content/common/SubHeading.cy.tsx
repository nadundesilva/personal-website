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
import SubHeading from "@/app/(home)/_content/common/SubHeading";

describe("SubHeading", () => {
    it("is a navigable subsection heading", () => {
        cy.mount(<SubHeading>Enterprise Projects</SubHeading>);

        cy.findByRole("heading", {
            level: 3,
            name: "Enterprise Projects",
        }).should("exist");
    });

    it("can be referenced as the label for the list it introduces", () => {
        cy.mount(
            <SubHeading id="enterprise-projects-heading">
                Enterprise Projects
            </SubHeading>,
        );

        cy.findByRole("heading", { level: 3 }).should(
            "have.attr",
            "id",
            "enterprise-projects-heading",
        );
    });
});
