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
import LinkButton from "@/components/content/LinkButton";

describe("LinkButton", () => {
    it("shows its label to the reader", () => {
        cy.mount(<LinkButton name="Download" href="/file.pdf" />);

        cy.findByRole("link", { name: /download/i }).should("be.visible");
    });

    it("prevents the opened tab from accessing this page via window.opener", () => {
        cy.mount(
            <LinkButton
                name="Open site"
                href="https://example.com"
                target="_blank"
            />,
        );

        // rel="noopener noreferrer" prevents tab-napping by blocking window.opener access from the opened page.
        cy.findByRole("link", { name: /open site/i })
            .should("have.attr", "rel", "noopener noreferrer")
            .and("have.attr", "target", "_blank");
    });

    it("warns screen reader users that the link opens a new tab", () => {
        cy.mount(
            <LinkButton
                name="Visit"
                href="https://example.com"
                target="_blank"
            />,
        );

        // Screen reader users have no visual cue that the link opens a new tab; the sr-only span provides that context.
        cy.get(".sr-only").should("contain.text", "opens in a new tab");
    });

    it("includes the new-tab warning in the accessible name when ariaLabel is set", () => {
        cy.mount(
            <LinkButton
                name="Visit"
                href="https://example.com"
                target="_blank"
                ariaLabel="Visit example"
            />,
        );

        cy.findByRole("link", {
            name: /visit example \(opens in a new tab\)/i,
        }).should("be.visible");

        cy.get(".sr-only").should("not.exist");
    });

    it("shows icons alongside the label text", () => {
        const StartIcon = () => <svg data-testid="start-icon" />;
        const EndIcon = () => <svg data-testid="end-icon" />;
        cy.mount(
            <LinkButton
                name="With Icons"
                href="/page"
                startIcon={StartIcon}
                endIcon={EndIcon}
            />,
        );

        cy.findByTestId("start-icon").should("exist");
        cy.findByTestId("end-icon").should("exist");
        cy.findByRole("link", { name: /with icons/i }).should("be.visible");
    });
});
