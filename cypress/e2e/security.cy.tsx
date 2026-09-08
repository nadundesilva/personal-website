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
    REPRESENTATIVE_ROUTE_PATHS,
    SAMPLE_BLOG_ARTICLE_PATH,
} from "@/cypress/support/routes";

// Directives that are identical regardless of build type ('unsafe-eval' is
// added to script-src only for dev/test builds, so it is intentionally not
// asserted here in either direction - see app/layout.tsx's createCspValues).
const EXPECTED_CSP_FRAGMENTS = [
    "default-src 'none'",
    "manifest-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "style-src-elem 'self' 'unsafe-inline'",
];

// public/_headers - replayed by .github/scripts/start-server.sh in local/CI runs
// and served by Cloudflare Pages in production.
const EXPECTED_SECURITY_HEADERS: Record<string, string> = {
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

describe("security response headers", () => {
    it("locks pages down to the site's own trusted origins", () => {
        for (const route of REPRESENTATIVE_ROUTE_PATHS) {
            cy.loadPage(route);

            cy.get('meta[http-equiv="Content-Security-Policy"]')
                .should("have.attr", "content")
                .then((content) => {
                    for (const fragment of EXPECTED_CSP_FRAGMENTS) {
                        expect(content).to.include(fragment);
                    }
                    expect(content).to.match(/script-src[^;]*'self'/);
                    expect(content).to.match(
                        /script-src[^;]*https:\/\/static\.cloudflareinsights\.com/,
                    );
                    expect(content).to.match(/connect-src[^;]*'self'/);
                    expect(content).to.match(
                        /connect-src[^;]*https:\/\/o4507214991917056\.ingest\.us\.sentry\.io/,
                    );
                });
        }
    });

    it("forces HTTPS and blocks framing, MIME sniffing and device access on every page", () => {
        for (const route of REPRESENTATIVE_ROUTE_PATHS) {
            cy.request(route).then((response) => {
                for (const [header, value] of Object.entries(
                    EXPECTED_SECURITY_HEADERS,
                )) {
                    expect(response.headers[header]).to.eq(value);
                }
            });
        }
    });
});

describe("off-site links", () => {
    it("opens every off-site link in a new tab with tab-napping protection", () => {
        for (const route of [...ALL_ROUTE_PATHS, SAMPLE_BLOG_ARTICLE_PATH]) {
            cy.loadPage(route);

            cy.location("host").then((host) => {
                // Not every route has an off-site link (e.g. blog group
                // listing pages only link internally), so query via the
                // document directly rather than cy.get, which retries until
                // at least one match exists and would time out on those.
                cy.document().then((doc) => {
                    const offSiteLinks = Array.from(
                        doc.querySelectorAll<HTMLAnchorElement>(
                            'a[href^="http"]',
                        ),
                    ).filter((link) => new URL(link.href).host !== host);

                    for (const link of offSiteLinks) {
                        cy.wrap(link)
                            .should("have.attr", "target", "_blank")
                            .and("have.attr", "rel")
                            .and("include", "noopener")
                            .and("include", "noreferrer");
                    }
                });
            });
        }
    });
});
