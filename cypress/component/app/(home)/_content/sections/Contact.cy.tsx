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
import Contact from "@/app/(home)/_content/sections/Contact";
import { CONTACT_EMAIL } from "@/constants/metadata";
import Profiles from "@/constants/profiles";

describe("Contact", () => {
    beforeEach(() => {
        cy.mount(<Contact />);
    });

    it("links out to every social profile for identity verification", () => {
        cy.findByRole("list", { name: /social profiles/i })
            .find("a")
            .should("have.length", Object.keys(Profiles).length);

        for (const profile of Object.values(Profiles)) {
            cy.findByRole("link", { name: new RegExp(profile.name, "i") })
                .should("have.attr", "href", profile.url)
                .and("have.attr", "target", "_blank")
                .and("have.attr", "rel")
                .and("include", "me");
        }
    });

    it("exposes the email CTA as a link, not a button", () => {
        // next/link mishandles mailto:, and @base-ui/react/button defaults to
        // role="button" for non-native elements — both are overridden here.
        // findByRole("link", ...) only matches if the computed role is "link".
        cy.findByRole("link", {
            name: new RegExp(`say hello.*${CONTACT_EMAIL}`, "i"),
        }).should("have.attr", "href", `mailto:${CONTACT_EMAIL}`);
    });

    it("offers exactly two ways to start an email", () => {
        cy.get(`a[href="mailto:${CONTACT_EMAIL}"]`).should("have.length", 2);
    });

    it("is ready to copy the contact email", () => {
        cy.findByRole("button", { name: /copy email/i }).should("exist");
    });

    it("keeps decorative background blobs out of the way of clicks", () => {
        cy.findAllByTestId("decorative-blob")
            .should("have.length.at.least", 2)
            .and("have.css", "pointer-events", "none");
    });

    it("keeps every profile icon out of the accessibility tree or otherwise named", () => {
        // cy.get('svg[role="img"]:not([aria-hidden="true"])') silently
        // reports a false pass in this Cypress version — .filter() with the
        // same pseudo-selector behaves correctly. Always use this form for
        // this invariant.
        cy.get('svg[role="img"]')
            .filter(':not([aria-hidden="true"])')
            .should("not.exist");
    });
});
