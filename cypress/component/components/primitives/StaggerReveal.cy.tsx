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
import StaggerReveal from "@/components/primitives/StaggerReveal";

describe("StaggerReveal", () => {
    it("announces the revealed items as a list to screen readers", () => {
        cy.mount(
            <StaggerReveal element="ul" className="flex flex-wrap">
                <span key="a">Item A</span>
                <span key="b">Item B</span>
            </StaggerReveal>,
        );

        cy.get("ul[role='list']").should("exist");
        cy.contains("Item A").should("be.visible");
        cy.contains("Item B").should("be.visible");
    });

    it("conveys the revealed items' order to assistive tech when ordered", () => {
        cy.mount(
            <StaggerReveal element="ol" className="flex flex-col">
                <span key="1">First</span>
                <span key="2">Second</span>
            </StaggerReveal>,
        );

        cy.get("ol").should("exist");
        cy.findAllByRole("listitem").should(($items) => {
            expect($items).to.have.length(2);
            expect($items.eq(0).text()).to.equal("First");
            expect($items.eq(1).text()).to.equal("Second");
        });
    });

    it("sizes each item to the caller's grid column width", () => {
        // Mounted at the configured 1280px viewport, above the lg breakpoint (1024px),
        // so lg:w-[calc(33.333%-0.667rem)] is the rule in effect - matching real callers
        // such as ContributedProjects.tsx and Certifications.tsx.
        cy.mount(
            <div style={{ width: "900px" }}>
                <StaggerReveal
                    element="ul"
                    className="flex flex-wrap"
                    itemClassName="lg:w-[calc(33.333%-0.667rem)]"
                >
                    <span key="a">Item A</span>
                </StaggerReveal>
            </div>,
        );

        // 900px * 33.333% - 0.667rem (10.672px) = 289.328px
        cy.get("li")
            .invoke("css", "width")
            .then((width) => parseFloat(width as unknown as string))
            .should("be.closeTo", 289.33, 1);
    });

    it("keeps its items hidden until the reader scrolls them into view", () => {
        cy.mount(
            <>
                <div style={{ height: "150vh" }} />
                <StaggerReveal element="ul" className="flex flex-wrap">
                    <span key="a">Below the fold</span>
                </StaggerReveal>
            </>,
        );

        cy.contains("Below the fold")
            .parents("li")
            .should("have.css", "opacity", "0");
        cy.scrollTo("bottom");
        cy.contains("Below the fold")
            .parents("li")
            .should("have.css", "opacity", "1");
    });

    it("exposes the caller-supplied accessible name on the revealed list", () => {
        cy.mount(
            <>
                <h2 id="stagger-reveal-heading">Section Heading</h2>
                <StaggerReveal
                    element="ul"
                    className="flex flex-wrap"
                    aria-labelledby="stagger-reveal-heading"
                >
                    <span key="a">Item A</span>
                </StaggerReveal>
            </>,
        );

        cy.get("ul[role='list']").should(
            "have.attr",
            "aria-labelledby",
            "stagger-reveal-heading",
        );
    });
});
