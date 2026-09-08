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
import { WebsiteHome } from "@/constants/routes";
import { CODE_BLOCK_BLOG_ARTICLE_PATH } from "@/cypress/support/routes";

describe("theme toggle", () => {
    it("switches to dark mode and persists across reload", () => {
        cy.loadPage(WebsiteHome.path);

        // loadPage forces light mode via localStorage
        cy.get("html").should("not.have.class", "dark");

        // Switch to dark
        cy.findByRole("button", { name: /switch to dark theme/i }).click({
            waitForAnimations: true,
        });
        cy.get("html").should("have.class", "dark");
        cy.window()
            .its("localStorage")
            .invoke("getItem", "theme")
            .should("eq", "dark");

        // Reload without calling loadPage (so localStorage is not overridden)
        cy.reload();
        cy.wait(1000);
        cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
        cy.get("html").should("have.class", "dark");

        // Switch back to light
        cy.findByRole("button", { name: /switch to light theme/i }).click({
            waitForAnimations: true,
        });
        cy.get("html").should("not.have.class", "dark");
        cy.window()
            .its("localStorage")
            .invoke("getItem", "theme")
            .should("eq", "light");
    });

    it("follows the operating system colour scheme on a first visit", () => {
        // No cy.loadPage here — it force-seeds localStorage.theme="light",
        // which would make next-themes skip the system-preference branch
        // entirely. matchMedia is stubbed in onBeforeLoad, before any page
        // script (including next-themes' inline hydration script) runs.
        const stubMatchMedia =
            (prefersDark: boolean) =>
            (win: Cypress.AUTWindow): void => {
                win.localStorage.removeItem("theme");
                const realMatchMedia = win.matchMedia.bind(win);
                cy.stub(win, "matchMedia").callsFake((query: string) =>
                    query === "(prefers-color-scheme: dark)"
                        ? {
                              matches: prefersDark,
                              addListener: () => {},
                              removeListener: () => {},
                              addEventListener: () => {},
                              removeEventListener: () => {},
                          }
                        : realMatchMedia(query),
                );
            };

        cy.visit("/", { onBeforeLoad: stubMatchMedia(true) });
        cy.get("html").should("have.class", "dark");

        cy.visit("/", { onBeforeLoad: stubMatchMedia(false) });
        cy.get("html").should("not.have.class", "dark");
    });

    it("re-colours code blocks to match the site theme", () => {
        cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);

        cy.get(".code-block-wrapper pre")
            .first()
            .should(($pre) => {
                const backgroundColor = window.getComputedStyle(
                    $pre[0],
                ).backgroundColor;
                expect(backgroundColor).to.not.eq("");
            })
            .then(($pre) => window.getComputedStyle($pre[0]).backgroundColor)
            .as("lightBackground");

        cy.findByRole("button", { name: /switch to dark theme/i }).click({
            waitForAnimations: true,
        });
        cy.get("html").should("have.class", "dark");

        cy.get(".code-block-wrapper pre")
            .first()
            .then(($pre) => window.getComputedStyle($pre[0]).backgroundColor)
            .then(function (darkBackground) {
                expect(darkBackground).to.not.eq(this.lightBackground);
            });
    });

    it("swaps paired light/dark images when the theme changes", () => {
        cy.loadPage(WebsiteHome.path);

        cy.findByTestId("certifications-section")
            .find("img")
            .eq(0)
            .should("be.visible");
        cy.findByTestId("certifications-section")
            .find("img")
            .eq(1)
            .should("not.be.visible");

        cy.findByRole("button", { name: /switch to dark theme/i }).click({
            waitForAnimations: true,
        });
        cy.get("html").should("have.class", "dark");

        cy.findByTestId("certifications-section")
            .find("img")
            .eq(0)
            .should("not.be.visible");
        cy.findByTestId("certifications-section")
            .find("img")
            .eq(1)
            .should("be.visible");
    });
});

describe("web fonts", () => {
    it("applies the site's own fonts instead of falling back to system fonts", () => {
        cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);

        cy.get("html").should(($html) => {
            const style = window.getComputedStyle($html[0]);
            expect(style.getPropertyValue("--font-default").trim()).to.not.eq(
                "",
            );
            expect(style.getPropertyValue("--font-code").trim()).to.not.eq("");
        });

        cy.get("body")
            .then(($body) => window.getComputedStyle($body[0]).fontFamily)
            .then((bodyFontFamily) => {
                cy.get(".code-block-wrapper code[data-theme]")
                    .first()
                    .should(
                        ($code) =>
                            window.getComputedStyle($code[0]).fontFamily !==
                            bodyFontFamily,
                    );
            });
    });
});
