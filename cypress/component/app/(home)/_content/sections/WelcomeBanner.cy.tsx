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
import WelcomeBanner from "@/app/(home)/_content/sections/WelcomeBanner";
import { EnterpriseProjects } from "@/constants/projects";
import Skills from "@/constants/skills";

describe("WelcomeBanner", () => {
    beforeEach(() => {
        cy.mount(<WelcomeBanner />);
    });

    it("shows a key statistic for years of experience, projects and skills", () => {
        cy.get('dl[aria-label="Key statistics"]')
            .find("dt")
            .should("have.length", 3);
        cy.get('dl[aria-label="Key statistics"] dd').should("have.length", 3);
        cy.get('dl[aria-label="Key statistics"]').should(
            "contain.text",
            `${Object.keys(EnterpriseProjects).length}`,
        );
        cy.get('dl[aria-label="Key statistics"]').should(
            "contain.text",
            `${Object.keys(Skills).length}`,
        );
    });

    it("uses purely decorative dividers between statistics, not screen-reader-announced separators", () => {
        // @base-ui/react/separator always forces role="separator" regardless of
        // any role override, so a plain aria-hidden div is used instead — a
        // real <Separator> here would be invalid inside a <dl>.
        cy.get('dl[aria-label="Key statistics"] [role="separator"]').should(
            "not.exist",
        );
    });

    it("offers the CV as a downloadable PDF", () => {
        cy.findByRole("link", { name: /view cv \(pdf document\)/i })
            .should("have.attr", "target", "_blank")
            .and("have.attr", "href")
            .and("include", ".pdf");
    });

    it("links out to the featured social profiles for identity verification", () => {
        for (const name of ["LinkedIn", "GitHub", "Medium", "Instagram"]) {
            cy.findByRole("link", {
                name: new RegExp(`visit ${name} profile`, "i"),
            })
                .should("have.attr", "target", "_blank")
                .and("have.attr", "rel")
                .and("include", "me");
        }
    });

    it("wires its scroll indicator to a target that actually exists in the document", () => {
        cy.findByRole("link", { name: /scroll down/i })
            .should("have.attr", "href")
            .then((href) => {
                const id = (href as unknown as string).replace("#", "");
                cy.get(`#${id}`).should("exist");
            });
    });

    it("keeps the statistics row visible on very short viewports, spilling over into a scrollable page instead of cramming to fit", () => {
        cy.viewport(640, 480);

        cy.get('dl[aria-label="Key statistics"]').should("be.visible");

        cy.document().then((doc) => {
            expect(doc.documentElement.scrollHeight).to.be.greaterThan(480);
        });
    });

    it("keeps every social icon out of the accessibility tree or otherwise named", () => {
        // cy.get('svg[role="img"]:not([aria-hidden="true"])') silently
        // reports a false pass in this Cypress version — .filter() with the
        // same pseudo-selector behaves correctly. Always use this form for
        // this invariant.
        cy.get('svg[role="img"]')
            .filter(':not([aria-hidden="true"])')
            .should("not.exist");
    });
});
