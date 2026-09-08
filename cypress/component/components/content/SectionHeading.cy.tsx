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
import SectionHeading from "@/components/content/SectionHeading";
import { Date as FormattableDate } from "@/constants/date";

describe("SectionHeading", () => {
    it("is a navigable section heading", () => {
        cy.mount(<SectionHeading>My Section</SectionHeading>);

        cy.findByRole("heading", { name: /my section/i, level: 2 }).should(
            "be.visible",
        );
    });

    it("shows the section's date alongside its heading", () => {
        const date = new FormattableDate(2022, "March");
        cy.mount(<SectionHeading date={date}>With Date</SectionHeading>);

        cy.contains("March 2022").should("be.visible");
    });

    it("shows no date when the section has none", () => {
        cy.mount(<SectionHeading>No Date</SectionHeading>);

        cy.get("time").should("not.exist");
    });

    it("offers a call-to-action link below the heading", () => {
        cy.mount(
            <SectionHeading
                actionButton={{ name: "View Details", href: "/details" }}
            >
                With Action
            </SectionHeading>,
        );

        cy.findByRole("link", { name: /view details/i }).should("be.visible");
    });

    it("can be linked to directly via a URL anchor", () => {
        cy.mount(<SectionHeading id="my-section-id">Heading</SectionHeading>);

        cy.get("#my-section-id").should("be.visible");
    });

    it("shows a caller-supplied logo alongside the heading", () => {
        cy.mount(
            <SectionHeading
                logo={
                    <span role="img" aria-label="Institute logo">
                        Logo
                    </span>
                }
            >
                With Logo
            </SectionHeading>,
        );

        cy.findByRole("img", { name: /institute logo/i }).should("be.visible");
    });

    it("shows no logo when the section has none", () => {
        cy.mount(<SectionHeading>No Logo</SectionHeading>);

        cy.findByRole("img").should("not.exist");
    });

    it("places the logo after the heading so it lands in the trailing slot", () => {
        cy.mount(
            <SectionHeading
                logo={
                    <span role="img" aria-label="Institute logo">
                        Logo
                    </span>
                }
            >
                With Logo
            </SectionHeading>,
        );

        cy.findByTestId("section-heading-row")
            .children()
            .first()
            .find("h2")
            .should("exist");
        cy.findByTestId("section-heading-row")
            .children()
            .last()
            .find('[role="img"]')
            .should("exist");
    });
});
