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
import ScrollIndicator from "@/app/(home)/_content/sections/components/ScrollIndicator";

describe("ScrollIndicator", () => {
    it("scrolls to the target the caller points it at", () => {
        cy.mount(<ScrollIndicator scrollToTargetId="welcome-banner-end" />);

        cy.findByRole("link", { name: /scroll down/i }).should(
            "have.attr",
            "href",
            "#welcome-banner-end",
        );
    });

    it("is reachable by keyboard and screen readers under a fixed name", () => {
        cy.mount(<ScrollIndicator scrollToTargetId="welcome-banner-end" />);

        // The animated dot has no text content, so it cannot add anything to
        // the link's accessible name — this is what actually keeps it out of
        // the accessibility tree, rather than an explicit aria-hidden.
        cy.findByRole("link", { name: "Scroll down" }).should("be.visible");
    });
});
