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
import {
    ALL_ROUTE_PATHS,
    SAMPLE_BLOG_ARTICLE_PATH,
} from "@/cypress/support/routes";

const ROUTES_TO_CHECK = [...ALL_ROUTE_PATHS, SAMPLE_BLOG_ARTICLE_PATH];

describe("accessibility invariants across every page", () => {
    it("gives every page exactly one top-level heading", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.get("h1").should("have.length", 1);
        }
    });

    it("never skips a heading level", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.get("h1, h2, h3, h4, h5, h6").then(($headings) => {
                const levels = $headings
                    .toArray()
                    .map((el) => Number(el.tagName.slice(1)));

                let previousLevel = levels[0];
                for (const level of levels) {
                    expect(
                        level - previousLevel,
                        `heading level jumped from h${previousLevel} to h${level} on ${route}`,
                    ).to.be.at.most(1);
                    previousLevel = level;
                }
            });
        }
    });

    it("gives every image an alt attribute", () => {
        // cy.document().then() rather than cy.get(): several routes legitimately
        // have no <img> (or no svg[role="img"]) at all, and cy.get() fails the
        // test when nothing matches instead of vacuously passing.
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.document().then((doc) => {
                for (const img of doc.querySelectorAll("img")) {
                    void expect(
                        img.getAttribute("alt"),
                        `image without an alt attribute on ${route}: ${img.getAttribute("src")}`,
                    ).to.not.be.null;
                }
            });
        }
    });

    it("keeps every icon-as-image out of the accessibility tree or otherwise named", () => {
        // The generalised guard for the LinkedInIcon class of bug: any
        // svg[role="img"] must either be aria-hidden or have an accessible
        // name (title/aria-label/aria-labelledby).
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.document().then((doc) => {
                const unnamed = Array.from(
                    doc.querySelectorAll(
                        'svg[role="img"]:not([aria-hidden="true"]):not([aria-label]):not([aria-labelledby])',
                    ),
                ).filter((el) => el.querySelector("title") === null);

                expect(
                    unnamed.map((el) => el.outerHTML),
                    `svg[role="img"] with no accessible name and not aria-hidden on ${route}`,
                ).to.deep.equal([]);
            });
        }
    });

    it("points every aria-labelledby and aria-describedby at an element that exists", () => {
        // A dangling IDREF gives assistive tech a broken or fabricated
        // accessible name instead of falling back to no name — invisible in a
        // rendered page and caught by none of the invariants above.
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.document().then((doc) => {
                const dangling: string[] = [];
                for (const attr of ["aria-labelledby", "aria-describedby"]) {
                    for (const el of doc.querySelectorAll(`[${attr}]`)) {
                        for (const idRef of (el.getAttribute(attr) ?? "")
                            .split(/\s+/)
                            .filter(Boolean)) {
                            if (doc.getElementById(idRef) === null) {
                                dangling.push(`${attr}="${idRef}"`);
                            }
                        }
                    }
                }

                expect(dangling, `unresolved IDREF on ${route}`).to.deep.equal(
                    [],
                );
            });
        }
    });

    it("gives every anchor target on a page a unique id", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.document().then((doc) => {
                const ids = Array.from(doc.querySelectorAll("[id]")).map(
                    (el) => el.id,
                );
                const duplicates = ids.filter(
                    (id, index) => ids.indexOf(id) !== index,
                );

                expect(
                    [...new Set(duplicates)],
                    `duplicate element ids on ${route}`,
                ).to.deep.equal([]);
            });
        }
    });

    it("declares the document language on every page", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.get("html").should("have.attr", "lang").and("not.be.empty");
        }
    });

    it("lets the reader zoom on every page", () => {
        for (const route of ROUTES_TO_CHECK) {
            cy.loadPage(route);
            cy.get('meta[name="viewport"]')
                .should("have.attr", "content")
                .and("not.match", /user-scalable=(no|0)/)
                .and("not.match", /maximum-scale=1(\D|$)/);
        }
    });
});
