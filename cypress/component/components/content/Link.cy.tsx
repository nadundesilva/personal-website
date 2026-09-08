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
import Link from "@/components/content/Link";

describe("Link", () => {
    it("does not warn about a new tab for internal links", () => {
        cy.mount(<Link href="/about">About</Link>);

        cy.findByRole("link", { name: /about/i })
            .should("be.visible")
            .and(($el) => {
                expect($el).not.to.have.attr("rel");
                expect($el).not.to.have.attr("target");
            });

        cy.get(".sr-only").should("not.exist");
    });

    it("prevents the opened tab from accessing this page via window.opener", () => {
        cy.mount(
            <Link href="https://example.com" target="_blank">
                External
            </Link>,
        );

        // rel="noopener noreferrer" prevents tab-napping by blocking window.opener access from the opened page.
        cy.findByRole("link", { name: /external/i })
            .should("have.attr", "rel", "noopener noreferrer")
            .and("have.attr", "target", "_blank");
    });

    it("warns screen reader users that the link opens a new tab", () => {
        cy.mount(
            <Link href="https://example.com" target="_blank">
                Visit site
            </Link>,
        );

        // Screen reader users have no visual cue that the link opens a new tab; the sr-only span provides that context.
        cy.get(".sr-only").should("contain.text", "opens in a new tab");
    });

    it("keeps the tab-napping protection alongside a caller-supplied rel value", () => {
        cy.mount(
            <Link href="https://example.com" target="_blank" rel="me">
                Profile
            </Link>,
        );

        // Both the caller's semantic rel (e.g. "me" for identity links) and
        // the tab-napping protection must be present together - dropping
        // either would either break identity verification or reopen the
        // window.opener attack surface.
        cy.findByRole("link", { name: /profile/i }).should(
            "have.attr",
            "rel",
            "noopener noreferrer me",
        );
    });

    it("passes through a caller-supplied rel value untouched for same-tab links", () => {
        cy.mount(
            <Link href="/about" rel="nofollow">
                About
            </Link>,
        );

        // No target="_blank" means no tab-napping risk, so the caller's rel
        // is used as-is rather than having noopener/noreferrer injected.
        cy.findByRole("link", { name: /about/i }).should(
            "have.attr",
            "rel",
            "nofollow",
        );
    });

    it("includes the new-tab warning in the accessible name when aria-label is set", () => {
        cy.mount(
            <Link
                href="https://example.com"
                target="_blank"
                aria-label="Visit example"
            >
                Visit site
            </Link>,
        );

        // When aria-label is set, the suffix is appended to the label instead of using a sr-only span to avoid duplicate announcements.
        cy.findByRole("link", { name: /visit example \(opens in a new tab\)/i })
            .should("be.visible")
            .and(
                "have.attr",
                "aria-label",
                "Visit example (opens in a new tab)",
            );

        cy.get(".sr-only").should("not.exist");
    });
});
