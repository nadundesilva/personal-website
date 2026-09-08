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
import { MotionConfig } from "motion/react";

import AnimatedStatValue from "@/app/(home)/_content/sections/components/AnimatedStatValue";

// With reducedMotion="always" in the test setup, useReducedMotion() returns
// true and the component skips the count-up animation, showing the final
// value immediately.

describe("AnimatedStatValue", () => {
    it("shows the final value to screen readers immediately", () => {
        cy.mount(<AnimatedStatValue value={42} />);

        // The sr-only span carries the final value independent of animation state.
        cy.get(".sr-only").should("contain.text", "42");
    });

    it("announces the value with its leading qualifier", () => {
        cy.mount(<AnimatedStatValue value={5} prefix="over" />);

        // The sr-only span carries the final value independent of animation state.
        cy.get(".sr-only").should("contain.text", "Over");
        cy.get(".sr-only").should("contain.text", "5");
    });

    it("announces the value with its trailing qualifier", () => {
        cy.mount(<AnimatedStatValue value={10} suffix="+" />);

        // The sr-only span carries the final value independent of animation state.
        cy.get(".sr-only").should("contain.text", "10+");
    });

    it("announces the value with both qualifiers", () => {
        cy.mount(<AnimatedStatValue value={3} prefix="top" suffix="%" />);

        // The sr-only span carries the final value independent of animation state.
        cy.get(".sr-only").should("contain.text", "Top");
        cy.get(".sr-only").should("contain.text", "3%");
    });

    it("formats a decimal value with thousands separator and matching fraction digits", () => {
        cy.mount(<AnimatedStatValue value={1234.5} />);

        // Asserts the visible (aria-hidden) span, not just the always-present sr-only span.
        cy.findByTestId("stat-value").should("contain.text", "1,234.5");
    });

    it("formats an integer value with no decimals and thousands separator", () => {
        cy.mount(<AnimatedStatValue value={1000} />);

        cy.findByTestId("stat-value").should("contain.text", "1,000");
    });

    it("shows the final value with no transition when motion is reduced", () => {
        // Default harness forces reducedMotion="always" - assert this
        // explicitly rather than leaving it implicit in the tests above.
        cy.mount(<AnimatedStatValue value={250} />);

        cy.findByTestId("stat-value").should("contain.text", "250");
    });

    it("counts up to and settles on the final value when motion is not reduced", () => {
        cy.mount(
            <MotionConfig reducedMotion="never">
                <AnimatedStatValue value={1000} />
            </MotionConfig>,
        );

        // The count-up runs over ~1s; retry until it settles on the target
        // without overshooting.
        cy.findByTestId("stat-value", { timeout: 2000 }).should(
            "contain.text",
            "1,000",
        );
        // The sr-only span always carries the final value, animated or not.
        cy.get(".sr-only").should("contain.text", "1,000");
    });

    it("only ever displays values on the step increment while counting up, and settles on the target", () => {
        // WelcomeBanner passes step=0.5 for the years-of-experience stat -
        // every sampled value during the count-up must land exactly on a
        // 0.5 increment (never e.g. 3.2) and must never exceed the target.
        const step = 0.5;
        const value = 7.5;
        const samples: number[] = [];

        cy.mount(
            <MotionConfig reducedMotion="never">
                <AnimatedStatValue value={value} step={step} />
            </MotionConfig>,
        );

        const sample = () =>
            cy.findByTestId("stat-value").then(($el) => {
                samples.push(parseFloat($el.text().replace(/,/g, "")));
            });

        for (let i = 0; i < 8; i++) {
            sample();
            cy.wait(100);
        }

        cy.then(() => {
            for (const sampled of samples) {
                expect(sampled).to.be.at.most(value);
                expect(
                    Math.abs(sampled / step - Math.round(sampled / step)),
                ).to.be.lessThan(1e-9);
            }
        });

        cy.findByTestId("stat-value", { timeout: 2000 }).should(
            "contain.text",
            "7.5",
        );
    });
});
