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
import { FULL_NAME } from "@/constants/metadata";
import { WebsiteHome } from "@/constants/routes";

// Tailwind's shadow-none computes to zero-alpha rgba() layers, not the
// literal string "none", so presence of a shadow must be checked by alpha.
const hasVisibleShadow = (boxShadow: string): boolean =>
    [...boxShadow.matchAll(/,\s*([\d.]+)\)/g)].some(
        ([, alpha]) => parseFloat(alpha) > 0,
    );

describe("scroll-to-top FAB", () => {
    it("does not appear at the top of the page", () => {
        cy.loadPage(WebsiteHome.path);

        // Button is inert: not in tab order and hidden from the accessibility tree
        cy.get('[aria-label="Scroll back to top"]').should(
            "have.attr",
            "tabindex",
            "-1",
        );
        // Wrapper carries aria-hidden and opacity-0 (visually absent)
        cy.get('[aria-label="Scroll back to top"]')
            .parent()
            .should("have.attr", "aria-hidden", "true")
            .and("have.css", "opacity", "0");
    });

    it("appears after scrolling and moves focus to main content when clicked", () => {
        cy.loadPage(WebsiteHome.path);
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });

        cy.findByRole("button", { name: /scroll back to top/i })
            .should("be.visible")
            .parent()
            .should("have.css", "opacity", "1");

        cy.findByRole("button", { name: /scroll back to top/i }).click({
            waitForAnimations: true,
        });

        cy.focused().should("have.attr", "id", "main-content");
        cy.window().its("scrollY").should("eq", 0);
    });
});

describe("skip-to-content link", () => {
    it("lets keyboard and screen reader users jump straight to the main content", () => {
        cy.loadPage(WebsiteHome.path);

        cy.findByRole("link", { name: /skip to content/i }).should(
            "have.attr",
            "href",
            "#main-content",
        );
    });

    it("moves focus to the main content when activated", () => {
        cy.loadPage(WebsiteHome.path);

        cy.findByRole("link", { name: /skip to content/i }).click({
            force: true,
        });

        cy.focused().should("have.attr", "id", "main-content");
    });
});

describe("desktop nav bar navigation", () => {
    it("marks the current page as active in the primary navigation", () => {
        cy.loadPage("/experience");

        cy.findByRole("navigation", {
            name: /primary navigation/i,
        }).within(() => {
            cy.findByRole("link", { name: /^experience$/i }).should(
                "have.attr",
                "aria-current",
                "page",
            );
            cy.findByRole("link", { name: /^achievements$/i }).should(
                "not.have.attr",
                "aria-current",
            );
        });
    });

    it("marks the parent route as active in the primary navigation when on a sub-route", () => {
        cy.loadPage("/projects/personal");

        cy.findByRole("navigation", {
            name: /primary navigation/i,
        }).within(() => {
            cy.findByRole("link", { name: /^projects$/i }).should(
                "have.attr",
                "aria-current",
                "page",
            );
            cy.findByRole("link", { name: /^experience$/i }).should(
                "not.have.attr",
                "aria-current",
            );
        });
    });
});

describe("mobile drawer navigation", () => {
    it("flips the toggle button label and icon when the drawer opens and closes", () => {
        cy.loadPage("/experience");
        cy.viewport("iphone-x");

        // Initially closed
        cy.findByRole("button", { name: /open navigation menu/i })
            .should("be.visible")
            .find("svg")
            .should("have.class", "lucide-menu");

        // Open
        cy.findByRole("button", { name: /open navigation menu/i }).click();
        cy.findByRole("button", { name: /close navigation menu/i })
            .should("be.visible")
            .find("svg")
            .should("have.class", "lucide-x");

        // Close again
        cy.findByRole("button", { name: /close navigation menu/i }).click();
        cy.findByRole("button", { name: /open navigation menu/i })
            .should("be.visible")
            .find("svg")
            .should("have.class", "lucide-menu");
    });

    it("marks the current page as active in the drawer navigation", () => {
        cy.loadPage("/experience");
        cy.viewport("iphone-x");

        cy.findByRole("button", { name: /open navigation menu/i }).click();

        cy.findByRole("navigation", { name: /drawer navigation/i }).within(
            () => {
                cy.findByRole("link", { name: /^experience$/i }).should(
                    "have.attr",
                    "aria-current",
                    "page",
                );
                cy.findByRole("link", { name: /^achievements$/i }).should(
                    "not.have.attr",
                    "aria-current",
                );
            },
        );
    });

    it("marks the parent route as active in the drawer navigation when on a sub-route", () => {
        cy.loadPage("/projects/personal");
        cy.viewport("iphone-x");

        cy.findByRole("button", { name: /open navigation menu/i }).click();

        cy.findByRole("navigation", { name: /drawer navigation/i }).within(
            () => {
                cy.findByRole("link", { name: /^projects$/i }).should(
                    "have.attr",
                    "aria-current",
                    "page",
                );
                cy.findByRole("link", { name: /^experience$/i }).should(
                    "not.have.attr",
                    "aria-current",
                );
            },
        );
    });

    it("closes when the site name link is clicked", () => {
        cy.loadPage("/experience");
        cy.viewport("iphone-x");

        cy.findByRole("button", { name: /open navigation menu/i }).click();
        cy.findByRole("navigation", { name: /drawer navigation/i }).should(
            "exist",
        );

        cy.findByRole("link", {
            name: new RegExp(FULL_NAME, "i"),
        }).click();

        cy.findByRole("navigation", {
            name: /drawer navigation/i,
        }).should("not.exist");
        cy.location("pathname").should("eq", "/");
    });
});

describe("scroll-reset on route change", () => {
    it("resets scroll position to the top when navigating to a new route", () => {
        cy.loadPage("/experience");
        // Explicit behavior:"instant" is required to override the app's global
        // `scroll-behavior: smooth` (app.css): cy.scrollTo() doesn't set this,
        // so it animates here, and its tail end can survive into the next
        // route (client-side nav doesn't cancel it) and nudge scrollY back up
        // after the app's own reset has already run.
        cy.window().then((win) => {
            win.scrollTo({ top: 800, left: 0, behavior: "instant" });
        });

        cy.window().its("scrollY").should("eq", 800);

        cy.clickNavLink("Achievements");

        cy.window().its("scrollY").should("eq", 0);
    });
});

describe("app-bar styling", () => {
    it("has no shadow at the top of the home page", () => {
        cy.loadPage(WebsiteHome.path);

        cy.get('[data-testid="app-bar"]').then(($el) => {
            const style = window.getComputedStyle($el[0]);
            void expect(hasVisibleShadow(style.boxShadow)).to.be.false;
        });
    });

    it("gains a shadow after scrolling down", () => {
        cy.loadPage(WebsiteHome.path);
        cy.scrollTo("bottom", { duration: 500, ensureScrollable: false });

        cy.get('[data-testid="app-bar"]').should(($el) => {
            const style = window.getComputedStyle($el[0]);
            void expect(hasVisibleShadow(style.boxShadow)).to.be.true;
        });
    });

    // The app bar is fixed and only content pages carry a toolbar spacer to
    // clear it (Layout.tsx: `{pathname !== "/" && <div className="h-14 sm:h-16" />}`)
    // - the home page's own hero fills that space instead. Pinning both sides
    // catches the spacer being removed (content page) as well as it becoming
    // unconditional (home page).
    [
        { width: 1280, height: 768, label: "desktop" },
        { width: 375, height: 768, label: "mobile" },
    ].forEach(({ width, height, label }) => {
        it(`keeps the main content clear of the app bar on a content page (${label})`, () => {
            cy.viewport(width, height);
            cy.loadPage(WebsiteHome.subRoutes["/experience"].path);

            cy.get('[data-testid="app-bar"]').then(($appBar) => {
                const appBarBottom = $appBar[0].getBoundingClientRect().bottom;
                cy.get("#main-content").should(($main) => {
                    expect($main[0].getBoundingClientRect().top).to.be.at.least(
                        appBarBottom,
                    );
                });
            });
        });
    });

    it("lets the home page's content run under the fixed app bar", () => {
        cy.loadPage(WebsiteHome.path);

        cy.get("#main-content").should(($main) => {
            expect($main[0].getBoundingClientRect().top).to.eq(0);
        });
    });
});

describe("footer", () => {
    it("shows a complete copyright year range", () => {
        cy.loadPage(WebsiteHome.path);

        cy.get("footer").should(($footer) => {
            expect($footer.text()).to.match(/©\s*2021-\d{4}/);
        });
    });
});

describe("in-page anchor navigation", () => {
    it("moves the reader to the section named in the URL hash on first load", () => {
        // cy.loadPage force-scrolls to the top, which would mask the very
        // behavior under test — visit directly instead.
        cy.visit("/#skills");

        cy.findByRole("heading", { name: /^skills$/i, level: 2 }).should(
            ($heading) => {
                const rect = $heading[0].getBoundingClientRect();
                expect(
                    rect.top,
                    "Skills heading should be within the viewport after loading with #skills in the URL",
                ).to.be.within(0, Cypress.config("viewportHeight"));
            },
        );
    });

    it("lets a keyboard user skip past the skill list", () => {
        cy.loadPage(WebsiteHome.path);

        cy.findByRole("link", { name: /skip skills/i })
            .focus()
            .click();

        cy.focused().should("have.attr", "id", "skip-skills-target");
    });
});
