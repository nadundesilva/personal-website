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
import ReadingProgress from "@/components/blog-articles/ReadingProgress";

// ReadingProgress reads data-reading-time-minutes from the DOM to know the
// article length. It also renders via a portal into document.body. The helpers
// below set up the DOM state the component needs.

const injectReadingTimeAttr = (minutes = 5): void => {
    const el = document.createElement("div");
    el.dataset.readingTimeMinutes = String(minutes);
    document.body.appendChild(el);
};

const injectTallContent = (height = 3000): void => {
    const spacer = document.createElement("div");
    spacer.style.height = `${height}px`;
    document.body.appendChild(spacer);
};

// window.scrollY is an own, configurable accessor on window (not inherited
// from a prototype). The overscroll test below overrides it to simulate
// rubber-band scroll; the descriptor captured there is restored here, in
// afterEach, rather than at the end of that test - a failed assertion stops
// the rest of that test's command chain, but Mocha's afterEach still runs,
// so restoration must live there to be reliable regardless of pass/fail.
let capturedScrollYDescriptor: PropertyDescriptor | undefined;

const cleanup = (): void => {
    document
        .querySelectorAll("[data-reading-time-minutes]")
        .forEach((el) => el.remove());
    document.querySelectorAll("body > div[style]").forEach((el) => el.remove());

    if (capturedScrollYDescriptor) {
        Object.defineProperty(window, "scrollY", capturedScrollYDescriptor);
        capturedScrollYDescriptor = undefined;
    }

    // Removing the tall spacer can clamp a leftover scroll offset from a
    // prior test and fire a native scroll event once the next component
    // mounts, corrupting its initial progress. Reset explicitly so every
    // test starts from a deterministic scroll position.
    window.scrollTo(0, 0);
};

describe("ReadingProgress", () => {
    beforeEach(() => {
        cleanup();
        injectReadingTimeAttr(5);
        injectTallContent(3000);
    });

    afterEach(() => {
        cleanup();
    });

    it("stays invisible when the page has no reading-time element", () => {
        // Undo beforeEach's injectReadingTimeAttr - this covers pages that
        // never render the reading-time marker (e.g. non-article pages),
        // where the component's early-return must keep the FAB invisible
        // rather than showing a stuck "0%" indicator.
        cleanup();

        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        })
            .closest('[data-testid="reading-progress-fab"]')
            .should("have.css", "opacity", "0");
    });

    it("stays hidden on a page too short to scroll", () => {
        // Undo beforeEach's injectTallContent - a page whose content already
        // fits the viewport never fires a scroll event, so a reading-progress
        // indicator can never resolve past its initial state; the FAB hides
        // itself instead of getting stuck showing "0%" forever.
        cleanup();
        injectReadingTimeAttr(5);

        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        })
            .closest('[data-testid="reading-progress-fab"]')
            .should("have.css", "opacity", "0");
    });

    it("reveals itself if a page too short to scroll grows scrollable afterwards", () => {
        // A late-loading image or web font can push a previously-too-short
        // page past the viewport height after mount, with no scroll event to
        // trigger a recheck - the FAB must notice the layout change itself.
        cleanup();
        injectReadingTimeAttr(5);

        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        })
            .closest('[data-testid="reading-progress-fab"]')
            .should("have.css", "opacity", "0");

        cy.then(() => injectTallContent(3000));

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        })
            .closest('[data-testid="reading-progress-fab"]')
            .should("have.css", "opacity", "1");
    });

    it("resumes tracking progress once a previously-too-short page becomes scrollable", () => {
        cleanup();
        injectReadingTimeAttr(5);

        cy.mount(<ReadingProgress />);

        cy.then(() => injectTallContent(3000));

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("have.attr", "aria-valuenow", "0");

        cy.window().then((win) => {
            win.scrollTo(0, win.document.documentElement.scrollHeight);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should(($el) => {
            expect(Number($el.attr("aria-valuenow"))).to.be.gte(95);
        });
    });

    it("recomputes progress when the page grows taller without a scroll event", () => {
        cy.mount(<ReadingProgress />);

        // Anchor to a known, already-verified-reliable state (see "shows
        // full progress once the reader reaches the bottom" above) rather
        // than capturing an intermediate percentage as a moving baseline,
        // which races the same async state update this test exercises.
        cy.window().then((win) => {
            win.scrollTo(0, win.document.documentElement.scrollHeight);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should(($el) => {
            expect(Number($el.attr("aria-valuenow"))).to.be.gte(95);
        });

        // Grow the page taller without scrolling further or firing a scroll
        // event - only the ResizeObserver can pick this up. The same scroll
        // offset (the old bottom) is now far short of the new bottom.
        cy.then(() => injectTallContent(6000));

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should(($el) => {
            expect(Number($el.attr("aria-valuenow"))).to.be.lessThan(50);
        });
    });

    it("shows 0% progress before any scrolling", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", { name: /article reading progress/i })
            .should("exist")
            .and("have.attr", "aria-valuenow", "0");
    });

    it("shows increased progress as the reader scrolls further down", () => {
        cy.mount(<ReadingProgress />);

        // Wait for the FAB to be present (totalReadingMinutes resolved)
        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        cy.window().then((win) => {
            win.scrollTo(0, win.document.documentElement.scrollHeight / 2);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should(($el) => {
            expect(Number($el.attr("aria-valuenow"))).to.be.greaterThan(0);
        });
    });

    it("keeps showing 0% when the browser reports overscroll above the top of the page", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        // Rubber-band overscroll on iOS/macOS reports a negative scrollY,
        // which window.scrollTo cannot reproduce - override the getter
        // directly. Restored in afterEach (see cleanup()), not here, so it
        // still gets undone if the assertion below fails.
        cy.window().then((win) => {
            capturedScrollYDescriptor = Object.getOwnPropertyDescriptor(
                win,
                "scrollY",
            );
            Object.defineProperty(win, "scrollY", {
                value: -120,
                configurable: true,
            });
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("have.attr", "aria-valuenow", "0");
    });

    it("shows full progress once the reader reaches the bottom", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        cy.window().then((win) => {
            win.scrollTo(0, win.document.documentElement.scrollHeight);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should(($el) => {
            expect(Number($el.attr("aria-valuenow"))).to.be.gte(95);
        });
    });

    it("shows 'N mins read' before any scrolling (plural for >1 min)", () => {
        cy.mount(<ReadingProgress />);

        // Wait for rAF callbacks: mounted=true and totalReadingMinutes=5
        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        cy.findAllByText(/\d+ mins read/i, { selector: "span" }).should(
            "have.length",
            1,
        );
    });

    it("shows '1 min read' (singular) when reading time is 1 minute", () => {
        cleanup();
        injectReadingTimeAttr(1);
        injectTallContent(3000);
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        cy.findAllByText(/^1 min read$/, { selector: "span" }).should(
            "have.length",
            1,
        );
    });

    it("shows plural 'N mins left' countdown while reading", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        // Scroll to ~50%: minutesLeft = ceil(5 * 0.5) = 3 → "3 mins left"
        cy.window().then((win) => {
            const total =
                win.document.documentElement.scrollHeight - win.innerHeight;
            win.scrollTo(0, total * 0.5);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findAllByText(/\d+ mins left/i, { selector: "span" }).should(
            "have.length",
            1,
        );
    });

    it("shows a low, singular-or-plural minute countdown when nearly done", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        // Scroll to 80%: minutesLeft = ceil(5 * 0.2) = 1 → "1 min left" (no
        // "s"). 80% is the exact ceil() boundary between 1 and 2 minutes, so
        // a sub-pixel rounding difference in scrollY across browsers can
        // land just under it and legitimately produce "2 mins left" -
        // accept either rather than asserting the single value.
        cy.window().then((win) => {
            const total =
                win.document.documentElement.scrollHeight - win.innerHeight;
            win.scrollTo(0, total * 0.8);
            win.dispatchEvent(new win.Event("scroll"));
        });

        cy.findAllByText(/^(1 min|2 mins) left$/, { selector: "span" }).should(
            "have.length",
            1,
        );
    });

    it("shows 'Thanks for reading!' when done and hides the countdown", () => {
        cy.mount(<ReadingProgress />);

        cy.findByRole("progressbar", {
            name: /article reading progress/i,
        }).should("exist");

        cy.window().then((win) => {
            win.scrollTo(0, win.document.documentElement.scrollHeight);
            win.dispatchEvent(new win.Event("scroll"));
        });

        // Wait for done state, then assert countdown is gone
        cy.findAllByText(/thanks for reading/i, { selector: "span" }).should(
            "have.length",
            1,
        );
        cy.findAllByText(/min.* left/i, { selector: "span" }).should(
            "have.length",
            0,
        );
    });
});
