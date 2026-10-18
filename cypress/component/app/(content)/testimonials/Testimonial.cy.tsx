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
import Testimonial from "@/app/(content)/testimonials/Testimonial";
import Testimonials, { Relationship } from "@/constants/testimonials";
import { at } from "@/cypress/support/collections";

// Use a real testimonial from the constants to avoid mocking deeply nested types.
const testimonial = at(Object.values(Testimonials));

describe("Testimonial", () => {
    beforeEach(() => {
        cy.mount(<Testimonial testimonial={testimonial} />);
    });

    it("is announced as a distinct article to screen readers", () => {
        cy.findByRole("article").should("exist");
    });

    it("attributes the quote to its author", () => {
        cy.contains(testimonial.author.person.name).should("be.visible");
    });

    it("shows the quote itself", () => {
        cy.contains(at(testimonial.content).slice(0, 40)).should("be.visible");
    });

    it("opens the LinkedIn source in a new tab", () => {
        cy.findByRole("link", { name: /view on linkedin/i })
            .should("be.visible")
            .and("have.attr", "target", "_blank");
    });

    it("names the article after its author", () => {
        cy.findByRole("article", {
            name: (accessibleName) =>
                accessibleName.includes(testimonial.author.person.name),
        }).should("exist");
    });

    it("announces the heading as a testimonial attribution to screen readers", () => {
        cy.findByRole("heading")
            .find(".sr-only")
            .should("have.text", "Testimonial from ");
    });
});

describe("Testimonial relationship sentence", () => {
    const firstName = at(testimonial.author.person.name.split(" "));

    it("describes a direct-manager relationship", () => {
        cy.mount(
            <Testimonial
                testimonial={{
                    ...testimonial,
                    relationship: Relationship.ManagedDirectly,
                }}
            />,
        );

        cy.contains(`${firstName} managed Nadun directly`).should("be.visible");
    });

    it("describes a mentor relationship", () => {
        cy.mount(
            <Testimonial
                testimonial={{
                    ...testimonial,
                    relationship: Relationship.Mentor,
                }}
            />,
        );

        cy.contains(`${firstName} was Nadun's mentor`).should("be.visible");
    });

    it("describes a same-team relationship", () => {
        cy.mount(
            <Testimonial
                testimonial={{
                    ...testimonial,
                    relationship: Relationship.WorkedOnSameTeam,
                }}
            />,
        );

        cy.contains(`${firstName} worked with Nadun on the same team`).should(
            "be.visible",
        );
    });

    it("describes a senior relationship", () => {
        cy.mount(
            <Testimonial
                testimonial={{
                    ...testimonial,
                    relationship: Relationship.Senior,
                }}
            />,
        );

        cy.contains(`${firstName} was senior to Nadun`).should("be.visible");
    });

    it("describes a junior relationship", () => {
        cy.mount(
            <Testimonial
                testimonial={{
                    ...testimonial,
                    relationship: Relationship.Junior,
                }}
            />,
        );

        cy.contains(`Nadun was senior to ${firstName}`).should("be.visible");
    });
});
