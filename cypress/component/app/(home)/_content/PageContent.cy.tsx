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
import PageContent from "@/app/(home)/_content/PageContent";

const EXPECTED_SECTION_ORDER = [
    "who-am-i-section",
    "experience-section",
    "contributed-projects-section",
    "achievements-section",
    "skills-section",
    "certifications-section",
    "contact-section",
];

describe("PageContent", () => {
    beforeEach(() => {
        cy.mount(<PageContent />);
    });

    it("labels every section with a heading that actually exists in the document", () => {
        cy.get("section[aria-labelledby]").each(($section) => {
            const headingId = $section.attr("aria-labelledby");
            cy.get(`#${headingId}`).should("exist");
        });
    });

    it("presents every home page section in the documented order", () => {
        cy.get(
            EXPECTED_SECTION_ORDER.map(
                (testId) => `[data-testid="${testId}"]`,
            ).join(","),
        ).then(($sections) => {
            const actualOrder = $sections
                .toArray()
                .map((el) => el.dataset.testid);
            expect(actualOrder).to.deep.equal(EXPECTED_SECTION_ORDER);
        });
    });

    it("separates every section except the last one", () => {
        cy.get("section > [role='separator']").should(
            "have.length",
            EXPECTED_SECTION_ORDER.length - 1,
        );
    });
});
