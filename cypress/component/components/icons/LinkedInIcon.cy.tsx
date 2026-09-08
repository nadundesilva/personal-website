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
import LinkedInIcon from "@/components/icons/LinkedInIcon";

describe("LinkedInIcon", () => {
    it("stays out of the accessibility tree when used decoratively", () => {
        cy.mount(<LinkedInIcon aria-hidden={true} />);

        cy.get("svg").should("have.attr", "aria-hidden", "true");
    });

    it("defaults to a 24px square", () => {
        cy.mount(<LinkedInIcon />);

        cy.get("svg")
            .should("have.attr", "width", "24")
            .and("have.attr", "height", "24");
    });

    it("resizes when a size is given", () => {
        cy.mount(<LinkedInIcon size={20} />);

        cy.get("svg")
            .should("have.attr", "width", "20")
            .and("have.attr", "height", "20");
    });
});
