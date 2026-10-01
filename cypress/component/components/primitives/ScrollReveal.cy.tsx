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
import ScrollReveal from "@/components/primitives/ScrollReveal";

describe("ScrollReveal", () => {
    it("shows its content", () => {
        cy.mount(
            <ScrollReveal>
                <p>Revealed content</p>
            </ScrollReveal>,
        );

        cy.contains("Revealed content").should("be.visible");
    });

    it("lets the caller style the revealed content", () => {
        cy.mount(
            <ScrollReveal className="my-custom-class">
                <span>Classy content</span>
            </ScrollReveal>,
        );

        cy.contains("Classy content")
            .parent()
            .should("have.class", "my-custom-class");
    });

    it("shows content already in the initial viewport without requiring a scroll", () => {
        cy.mount(
            <ScrollReveal>
                <p>Above the fold</p>
            </ScrollReveal>,
        );

        cy.contains("Above the fold").should("be.visible");
    });

    // The reveal relies on animation-trigger, which only Chromium-based
    // browsers new enough to ship it support. Elsewhere the @supports gate
    // (app/app.css) leaves content statically visible, so the tests below have
    // nothing to assert.
    describe("where scroll-triggered animations are supported", () => {
        beforeEach(function () {
            if (!CSS.supports("animation-trigger", "--t play-forwards")) {
                this.skip();
            }
        });

        it("keeps its content hidden until the reader scrolls it into view", () => {
            cy.mount(
                <>
                    <div style={{ height: "150vh" }} />
                    <ScrollReveal>
                        <p>Below the fold</p>
                    </ScrollReveal>
                </>,
            );

            cy.contains("Below the fold")
                .parent()
                .should("have.css", "opacity", "0");
            cy.scrollTo("bottom");
            cy.contains("Below the fold")
                .parent()
                .should("have.css", "opacity", "1");
        });

        it("fully reveals content that is only partly in view on load, without requiring a scroll", () => {
            cy.mount(
                <>
                    <div style={{ height: "calc(100vh - 20px)" }} />
                    <ScrollReveal>
                        <div style={{ height: "100vh" }}>
                            Straddling the fold
                        </div>
                    </ScrollReveal>
                </>,
            );

            cy.contains("Straddling the fold")
                .parent()
                .should("have.css", "opacity", "1");
        });
    });
});
