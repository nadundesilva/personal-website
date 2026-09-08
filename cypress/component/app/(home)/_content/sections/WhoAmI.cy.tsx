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
import WhoAmI from "@/app/(home)/_content/sections/WhoAmI";
import { CurrentExperience } from "@/constants/experience";

describe("WhoAmI", () => {
    it("states the years of experience in one of its expected forms", () => {
        cy.mount(<WhoAmI />);

        cy.get("p")
            .contains(/years of experience/i)
            .invoke("text")
            .should("match", /^(nearly )?\d+(\.\d)?\+? years of experience$/i);
    });

    it("tells screen readers this is the current role, not just a role", () => {
        cy.mount(<WhoAmI />);

        cy.get(".sr-only").should("contain.text", "Current role:");
        cy.contains("p", CurrentExperience.name).should("exist");
    });
});
