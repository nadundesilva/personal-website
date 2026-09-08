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
import { CODE_BLOCK_BLOG_ARTICLE_PATH } from "@/cypress/support/routes";
import { childrenNamed, childText, parseXml } from "@/cypress/support/xml";

// Intentionally not imported from @/constants/metadata: that module
// transitively pulls in constants/logos.ts, which imports raw .png/.svg
// files that Cypress's e2e spec bundler has no loader for. See seo.cy.tsx.
const WEBSITE_PUBLIC_URL = "https://nadundesilva.com";

const ATOM_NAMESPACE = "http://www.w3.org/2005/Atom";
const DUBLIN_CORE_NAMESPACE = "http://purl.org/dc/elements/1.1/";

// Returns { channel, items } from a single request/parse rather than two
// composable Chainable-returning helpers: Cypress's .then() drops a bare
// Element yielded across a command boundary (a foreign/XML DOM node isn't
// something it knows how to re-wrap as the next command's subject), so
// yielding a plain object - never a lone Element - is required here.
const getFeed = (): Cypress.Chainable<{ channel: Element; items: Element[] }> =>
    cy.request("/blog-articles/feed.xml").then((response) => {
        const doc = parseXml(response.body as string);
        const channel = childrenNamed(doc.documentElement, "channel")[0];
        return { channel, items: childrenNamed(channel, "item") };
    });

describe("blog article features", () => {
    describe("RSS feed", () => {
        it("serves the RSS feed as valid XML", () => {
            cy.request("/blog-articles/feed.xml").then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers["content-type"]).to.include("xml");
                parseXml(response.body as string);
            });
        });

        it("contains a feed item for every article", () => {
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                getFeed().then(({ items }) => {
                    expect(items.length).to.eq(articles.length);
                });
            });
        });

        it("identifies itself to feed readers", () => {
            getFeed().then(({ channel }) => {
                void expect(childText(channel, "title")).to.not.be.empty;
                void expect(childText(channel, "description")).to.not.be.empty;
                expect(childText(channel, "language")).to.eq("en-US");
                void expect(childText(channel, "copyright")).to.not.be.empty;

                const selfLink = channel.getElementsByTagNameNS(
                    ATOM_NAMESPACE,
                    "link",
                )[0];
                expect(selfLink.getAttribute("href")).to.eq(
                    `${WEBSITE_PUBLIC_URL}/blog-articles/feed.xml`,
                );
                expect(selfLink.getAttribute("rel")).to.eq("self");
            });
        });

        it("gives every feed item a title and a link back to the article on this site", () => {
            getFeed().then(({ items }) => {
                expect(items.length).to.be.greaterThan(0);
                items.forEach((item) => {
                    void expect(childText(item, "title"), item.outerHTML).to.not
                        .be.empty;
                    expect(childText(item, "link"), item.outerHTML).to.include(
                        WEBSITE_PUBLIC_URL,
                    );
                });
            });
        });

        it("gives every feed item a cover image readers can fetch", () => {
            getFeed().then(({ items }) => {
                expect(items.length).to.be.greaterThan(0);
                items.forEach((item) => {
                    const enclosure = childrenNamed(item, "enclosure")[0];

                    expect(
                        enclosure.getAttribute("url"),
                        item.outerHTML,
                    ).to.include(WEBSITE_PUBLIC_URL);
                    void expect(enclosure.getAttribute("type"), item.outerHTML)
                        .to.not.be.empty;
                });
            });
        });

        it("dates and summarises every feed item so readers can sort and preview it", () => {
            getFeed().then(({ items }) => {
                expect(items.length).to.be.greaterThan(0);
                items.forEach((item) => {
                    const pubDate = childText(item, "pubDate");
                    void expect(pubDate, item.outerHTML).to.not.be.empty;
                    void expect(new Date(pubDate).getTime(), item.outerHTML).to
                        .not.be.NaN;

                    void expect(childText(item, "description"), item.outerHTML)
                        .to.not.be.empty;
                });
            });
        });

        it("credits the author and tags on every feed item", () => {
            getFeed().then(({ items }) => {
                expect(items.length).to.be.greaterThan(0);
                items.forEach((item) => {
                    // Boolean, not the Element itself: Cypress's chai-jquery
                    // integration special-cases `.exist`/`.have.length` for
                    // DOM subjects, and mishandles a foreign (XML) Element
                    // that isn't part of the page's own document.
                    const hasAuthor =
                        item.getElementsByTagNameNS(
                            DUBLIN_CORE_NAMESPACE,
                            "creator",
                        ).length > 0;

                    void expect(hasAuthor, item.outerHTML).to.be.true;
                    void expect(
                        childrenNamed(item, "category").length,
                        item.outerHTML,
                    ).to.be.greaterThan(0);
                });
            });
        });
    });

    describe("blog article listing", () => {
        it("shows the most recently published articles first", () => {
            cy.loadPage("/blog-articles/engineering");

            cy.get("time")
                .then(($times) =>
                    Cypress._.map($times.toArray(), (el) =>
                        el.getAttribute("datetime"),
                    ),
                )
                .then((dates) => {
                    const sorted = [...dates].sort().reverse();
                    expect(dates).to.deep.eq(sorted);
                });
        });

        it("shows the category with the most recently published article first", () => {
            cy.loadPage("/blog-articles");

            // Each category is rendered as its own <section>, with its lead
            // (most recent) article's <time> first — this is the only part
            // of the article grouping/sorting that "shows most recent
            // articles first" above doesn't already cover: the order
            // *between* categories, not just *within* one.
            cy.get("section")
                .then(($sections) =>
                    Cypress._.map($sections.toArray(), (section) =>
                        section.querySelector("time")?.getAttribute("datetime"),
                    ),
                )
                .then((leadDates) => {
                    expect(leadDates.length).to.be.greaterThan(1);
                    for (let i = 1; i < leadDates.length; i++) {
                        // Non-strict: dates are month-precision, so two
                        // categories can legitimately tie.
                        void expect(
                            leadDates[i - 1]! >= leadDates[i]!,
                            `expected category ${i - 1} (${leadDates[i - 1]}) to not be older than category ${i} (${leadDates[i]})`,
                        ).to.be.true;
                    }
                });
        });
    });

    describe("article page content", () => {
        it("shows an article's title, date and body to the reader", () => {
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                cy.loadPage(articles[0]);

                cy.findByRole("heading", { level: 1 }).should("be.visible");
                cy.get("time").should("exist");
                cy.findAllByRole("heading", { level: 2 }).should(
                    "have.length.at.least",
                    1,
                );
            });
        });

        it("carries a build-time reading estimate on every article page", () => {
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                for (const article of articles) {
                    cy.request(article).then((response) => {
                        const minutes =
                            /data-reading-time-minutes="(\d+)"/.exec(
                                response.body as string,
                            )?.[1];
                        expect(Number(minutes), article).to.be.at.least(1);
                    });
                }
            });
        });

        it("gives every article its own search-result identity and BlogPosting record", () => {
            // Each article's page.mdx hand-writes its own `metadata` title and
            // description; only one sample article is checked elsewhere
            // (seo.cy.tsx), so a new or edited article with an empty
            // description, a wrong canonical or a missing BlogPosting would
            // otherwise ship unnoticed. cy.request keeps this to one HTTP hit
            // per article - no page loads.
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                for (const article of articles) {
                    cy.request(article).then((response) => {
                        const doc = new DOMParser().parseFromString(
                            response.body as string,
                            "text/html",
                        );

                        const title = doc.querySelector("title")?.textContent;
                        expect(title, `${article} title`).to.match(
                            /\S.*\| Nadun De Silva$/,
                        );

                        const description = doc
                            .querySelector('meta[name="description"]')
                            ?.getAttribute("content");
                        expect(description, `${article} description`).to.match(
                            /\S/,
                        );

                        const canonical = doc
                            .querySelector('link[rel="canonical"]')
                            ?.getAttribute("href");
                        expect(canonical, `${article} canonical`).to.eq(
                            `${WEBSITE_PUBLIC_URL}${article}`,
                        );

                        const blogPostings = [
                            ...doc.querySelectorAll(
                                'script[type="application/ld+json"]',
                            ),
                        ].filter((script) => {
                            try {
                                return (
                                    (
                                        JSON.parse(
                                            script.textContent ?? "{}",
                                        ) as Record<string, unknown>
                                    )["@type"] === "BlogPosting"
                                );
                            } catch {
                                return false;
                            }
                        });
                        expect(
                            blogPostings.length,
                            `${article} BlogPosting count`,
                        ).to.eq(1);
                    });
                }
            });
        });

        it("gives every article article-typed social preview metadata", () => {
            // buildArticleMetadata (utils/common/blog-article-metadata.ts) sets
            // og:type=article, article:published_time, article:tag and the
            // social images - but Next replaces (not merges) openGraph per
            // segment, so an article's page.mdx that forgets to spread
            // ...buildArticleMetadata(blogMetadata) silently ships the root
            // layout's generic profile preview. seo.cy.tsx only checks the one
            // sample article. The article:tag list is cross-checked against the
            // BlogPosting JSON-LD keywords, which the article layout builds by
            // a separate path from the same source.
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                for (const article of articles) {
                    cy.request(article).then((response) => {
                        const doc = new DOMParser().parseFromString(
                            response.body as string,
                            "text/html",
                        );
                        const meta = (property: string): string | undefined =>
                            doc
                                .querySelector(`meta[property="${property}"]`)
                                ?.getAttribute("content") ?? undefined;

                        expect(meta("og:type"), `${article} og:type`).to.eq(
                            "article",
                        );
                        expect(
                            new Date(
                                meta("article:published_time") ?? "",
                            ).toString(),
                            `${article} article:published_time`,
                        ).to.not.eq("Invalid Date");
                        expect(
                            meta("og:image"),
                            `${article} og:image`,
                        ).to.match(/\S/);
                        expect(
                            doc
                                .querySelector('meta[name="twitter:image"]')
                                ?.getAttribute("content"),
                            `${article} twitter:image`,
                        ).to.match(/\S/);

                        const tags = [
                            ...doc.querySelectorAll(
                                'meta[property="article:tag"]',
                            ),
                        ]
                            .map((el) => el.getAttribute("content"))
                            .sort();
                        const blogPosting = [
                            ...doc.querySelectorAll(
                                'script[type="application/ld+json"]',
                            ),
                        ]
                            .map((script) => {
                                try {
                                    return JSON.parse(
                                        script.textContent ?? "{}",
                                    ) as Record<string, unknown>;
                                } catch {
                                    return {};
                                }
                            })
                            .find((data) => data["@type"] === "BlogPosting");
                        const keywords = [
                            ...((blogPosting?.keywords as string[]) ?? []),
                        ].sort();

                        expect(
                            tags.length,
                            `${article} article:tag count`,
                        ).to.be.greaterThan(0);
                        expect(
                            tags,
                            `${article} article:tag values`,
                        ).to.deep.eq(keywords);
                    });
                }
            });
        });

        it("points every in-article cross-reference at a page that exists", () => {
            // Articles hand-write relative links to sibling articles in their
            // markdown (`[text](./java/some-article)`); mdx-components.tsx
            // rewrites these to absolute `${WEBSITE_PUBLIC_URL}/...` hrefs.
            // Because the resolved href is on the public origin (not the
            // localhost the suite serves), security.cy.tsx's off-site link
            // sweep only checks target/rel on them - nothing verifies the
            // target resolves. A renamed or moved article would ship a 404
            // link unnoticed.
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                const targets = new Set<string>();

                for (const article of articles) {
                    cy.request(article).then((response) => {
                        const doc = new DOMParser().parseFromString(
                            response.body as string,
                            "text/html",
                        );
                        for (const anchor of doc.querySelectorAll<HTMLAnchorElement>(
                            "article a[href]",
                        )) {
                            const href = anchor.getAttribute("href") ?? "";
                            if (href.startsWith(WEBSITE_PUBLIC_URL)) {
                                targets.add(
                                    href.slice(WEBSITE_PUBLIC_URL.length),
                                );
                            }
                        }
                    });
                }

                cy.then(() => {
                    // Fail loudly rather than pass vacuously if link rewriting
                    // or the <article> scoping ever stops producing matches.
                    expect(
                        targets.size,
                        "in-article cross-references found",
                    ).to.be.greaterThan(0);

                    for (const path of targets) {
                        cy.request(path).its("status").should("eq", 200);
                    }
                });
            });
        });

        it("shows the same reading time estimate on the listing card and the article page", () => {
            cy.loadPage("/blog-articles/cellery");
            cy.get(`a[href="${CODE_BLOCK_BLOG_ARTICLE_PATH}"]`)
                .first()
                .invoke("text")
                .then((cardText) => {
                    const cardMinutes = /~(\d+)\s+mins?\s+read/.exec(
                        cardText,
                    )?.[1];
                    void expect(cardMinutes, cardText).to.exist;

                    cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);
                    cy.get("[data-reading-time-minutes]")
                        .should("have.attr", "data-reading-time-minutes")
                        .then((pageMinutes) => {
                            expect(pageMinutes).to.eq(cardMinutes);
                        });
                });
        });

        it("renders the article's markdown content through the site's own components", () => {
            cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);

            cy.get("article").within(() => {
                // Only h2/h3 come out of the MDX body — mdx-components.tsx
                // throws a build error for h4+. The single h1 is
                // ArticleLayout's own Title, not markdown.
                cy.get("h1").should("have.length", 1);
                cy.get("h4, h5, h6").should("not.exist");

                // Fenced code blocks render through CodeBlock, with a working
                // copy button.
                cy.get("pre").should("have.length.at.least", 1);
                cy.get("pre")
                    .first()
                    .parent()
                    .findByRole("button", { name: /copy to clipboard/i })
                    .should("exist");

                // Inline code renders as <code>.
                cy.get("code").should("have.length.at.least", 1);

                // In-article links open in a new tab with rel="noopener noreferrer".
                cy.get("a[href^='http']")
                    .first()
                    .should("have.attr", "target", "_blank")
                    .and("have.attr", "rel")
                    .and("include", "noopener noreferrer");

                // In-body article images (as opposed to the article's
                // decorative hero image, which is intentionally alt="") have
                // non-empty, reader-facing alt text.
                cy.get("figure img").should("have.length.at.least", 1);
                cy.get("figure img").each(($img) => {
                    void expect($img.attr("alt")).to.not.be.empty;
                });
            });
        });

        it("copies a fenced code block's real code to the clipboard", () => {
            cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);

            cy.window().then((win) => {
                const writeText = cy.stub().as("writeText").resolves();
                Object.defineProperty(win.Navigator.prototype, "clipboard", {
                    configurable: true,
                    get: () => ({ writeText }),
                });
            });

            cy.get("pre")
                .first()
                .parent()
                .findByRole("button", { name: /copy to clipboard/i })
                .click({ force: true });

            // Compared against the article's own source, not the rendered
            // <code> element's text - comparing to itself would prove nothing.
            const expectedCode = [
                "cellery:Component helloComponent = {",
                '    name: "hello-api",',
                "    source: {",
                '        image: "wso2cellery/samples-hello-world-api-hello-service:latest"',
                "    },",
                "    ingresses: {",
                "        hello: <cellery:HttpApiIngress>{ port: 9090,",
                '            context: "/hello",',
                "            definition: {",
                "                resources: [",
                "                    {",
                '                        path: "/",',
                '                        method: "GET"',
                "                    }",
                "                ]",
                "            },",
                '            expose: "global"',
                "        }",
                "    }",
                "};",
            ].join("\n");
            cy.get("@writeText")
                .its("firstCall.args.0")
                .should("eq", expectedCode);
        });

        it("successfully loads every image on an article page", () => {
            cy.loadPage(CODE_BLOCK_BLOG_ARTICLE_PATH);

            // Only the currently-visible theme variant of a light/dark image
            // pair is checked - its hidden sibling is "display: none" and
            // browsers never fetch a lazy-loaded image that has no layout box.
            // Each image is scrolled into view first: below-the-fold images
            // use loading="lazy" and are never fetched until then either.
            cy.get("img:visible").each(($img) => {
                cy.wrap($img)
                    .scrollIntoView()
                    .should("have.prop", "complete", true)
                    .and("have.prop", "naturalWidth")
                    .and("be.greaterThan", 0);
            });
        });

        it("tracks how far the reader has scrolled through the article", () => {
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                cy.loadPage(articles[0]);

                // Progressbar is rendered and starts at 0
                cy.findByRole("progressbar", {
                    name: /article reading progress/i,
                })
                    .should("exist")
                    .and("have.attr", "aria-valuenow", "0");

                // After scrolling to the bottom the progress reaches 100
                cy.scrollTo("bottom", {
                    duration: 1000,
                    ensureScrollable: false,
                });

                cy.findByRole("progressbar", {
                    name: /article reading progress/i,
                })
                    .should("have.attr", "aria-valuenow", "100")
                    // Checks the FAB stays inside the viewport (what the
                    // document.body portal in ReadingProgress guarantees
                    // against overflow-x-clip on <main>). Can't use
                    // be.visible: pointer-events-none makes elementFromPoint
                    // skip the FAB, so Cypress falsely reports it as covered.
                    .should(($fab) => {
                        const rect = $fab[0].getBoundingClientRect();
                        expect(rect.width, "fab width").to.be.greaterThan(0);
                        expect(rect.height, "fab height").to.be.greaterThan(0);
                        expect(rect.right, "fab right edge").to.be.at.most(
                            Cypress.config("viewportWidth"),
                        );
                        expect(rect.bottom, "fab bottom edge").to.be.at.most(
                            Cypress.config("viewportHeight"),
                        );
                    });
            });
        });
    });
});
