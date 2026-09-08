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
import { CONTACT_EMAIL, FULL_NAME, TAGLINE } from "@/constants/metadata";
import { CvPdfPath, WebsiteHome } from "@/constants/routes";

describe("home page", () => {
    beforeEach(() => {
        cy.loadPage(WebsiteHome.path);
    });

    it("identifies the site by name and tagline in the browser tab and search results", () => {
        // The home page sets its title as `absolute`, deliberately bypassing the
        // root layout's "%s | Nadun De Silva" template - every other page appends
        // the name, this one leads with it. Asserting the composition (not a
        // literal) catches the template creeping back in.
        cy.title().should("eq", `${FULL_NAME} | ${TAGLINE}`);

        cy.get('meta[name="description"]')
            .should("have.attr", "content")
            .and("not.be.empty");
    });

    it("greets the visitor by name and offers the CV", () => {
        cy.findByRole("heading", { name: FULL_NAME, level: 1 }).should(
            "be.visible",
        );

        cy.findByRole("link", { name: /view cv/i })
            .should("be.visible")
            .and("have.attr", "href", CvPdfPath);
    });

    it("links out to every social profile", () => {
        for (const name of ["LinkedIn", "GitHub", "Medium", "Instagram"]) {
            cy.findByRole("link", {
                name: new RegExp(`visit ${name} profile`, "i"),
            }).should("be.visible");
        }
    });

    it("serves the CV as a real, non-empty PDF file", () => {
        // Status 200 alone would still pass for a corrupt or empty file - the
        // CV is refreshed by an automated commit, making that a live risk.
        cy.request(CvPdfPath).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers["content-type"]).to.match(
                /^application\/pdf/,
            );
            expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it("scrolls past the hero when the scroll cue is used", () => {
        cy.findByRole("link", { name: /scroll down/i })
            .should("be.visible")
            .and("have.attr", "href", "#welcome-banner-end");

        cy.findByRole("link", { name: /scroll down/i }).click();

        cy.location("hash").should("eq", "#welcome-banner-end");
    });

    it("lets a visitor start an email from the contact section", () => {
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        cy.findByRole("link", {
            name: new RegExp(`say hello.*${CONTACT_EMAIL}`, "i"),
        }).should("have.attr", "href", `mailto:${CONTACT_EMAIL}`);
    });

    it("copies the contact email to clipboard when the Copy email button is clicked", () => {
        cy.window().then((win) => {
            const writeText = cy.stub().as("writeText").resolves();
            Object.defineProperty(win.Navigator.prototype, "clipboard", {
                configurable: true,
                get: () => ({ writeText }),
            });
        });

        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        cy.findByRole("button", { name: /copy email/i })
            .should("be.visible")
            .click({ force: true });

        cy.get("@writeText").should("have.been.calledWith", CONTACT_EMAIL);
        cy.findByRole("status").should("have.text", "Copied!");
    });

    it("presents every home page section in order", () => {
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        const expectedOrder = [
            "who-am-i-section",
            "experience-section",
            "contributed-projects-section",
            "achievements-section",
            "skills-section",
            "certifications-section",
            "contact-section",
        ];

        cy.get(
            expectedOrder
                .map((testId) => `[data-testid="${testId}"]`)
                .join(","),
        ).then(($sections) => {
            const actualOrder = $sections
                .toArray()
                .map((el) => el.dataset.testid);
            expect(actualOrder).to.deep.equal(expectedOrder);
        });
    });

    it("successfully loads every image on the page", () => {
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        // Only the currently-visible theme variant of a light/dark image
        // pair is checked - its hidden sibling is "display: none" and
        // browsers never fetch a lazy-loaded image that has no layout box.
        cy.get("img:visible").each(($img) => {
            cy.wrap($img)
                .should("have.prop", "complete", true)
                .and("have.prop", "naturalWidth")
                .and("be.greaterThan", 0);
        });
    });

    it("shows at least one item in each home page section that lists items", () => {
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        for (const testId of [
            "experience-section",
            "contributed-projects-section",
            "achievements-section",
            "skills-section",
            "certifications-section",
        ]) {
            cy.findByTestId(testId)
                .scrollIntoView()
                .within(() => {
                    cy.findAllByRole("listitem").should(
                        "have.length.at.least",
                        1,
                    );
                });
        }
    });

    it("shows every below-the-fold section's content once revealed", () => {
        // Sections start at opacity 0 and are revealed by ScrollReveal /
        // StaggerReveal once scrolled into view. Cypress treats opacity 0 as
        // not visible, so this fails if a reveal never fires and the page
        // renders blank.
        for (const testId of [
            "skills-section", // ScrollReveal
            "contributed-projects-section", // StaggerReveal
            "certifications-section", // StaggerReveal
        ]) {
            cy.findByTestId(testId)
                .scrollIntoView()
                .within(() => {
                    cy.findAllByRole("listitem").first().should("be.visible");
                });
        }
    });

    it("reveals a skill's usage details when its chip is activated", () => {
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        cy.findByTestId("skills-section")
            .scrollIntoView()
            .findAllByRole("button", { name: /level\.$/ })
            .first()
            .as("skillChip")
            .focus()
            .trigger("click");

        cy.get("@skillChip")
            .invoke("attr", "aria-label")
            .then((label) => {
                const skillName = label!.replace(/ - .+ level\.$/, "");
                cy.findByRole("dialog").within(() => {
                    cy.findByText(skillName).should("be.visible");
                });
            });
    });
});
