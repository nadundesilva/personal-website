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
import Profiles, { TWITTER_HANDLE } from "@/constants/profiles";
import Publications from "@/constants/publications";
import { CvPdfPath } from "@/constants/routes";
import Skills, { SkillProficiency } from "@/constants/skills";
import {
    CONTENT_ROUTE_PATHS,
    SAMPLE_BLOG_ARTICLE_PATH,
} from "@/cypress/support/routes";
import { childrenNamed, childText, parseXml } from "@/cypress/support/xml";

// SCHEMA_PERSON_ID/SCHEMA_WEBSITE_ID are intentionally not imported from
// @/constants/metadata: that module transitively pulls in
// constants/logos.ts, which imports raw .png/.svg files that Cypress's e2e
// spec bundler has no loader for. Mirrors the same derivation as
// constants/metadata.ts's WEBSITE_PUBLIC_URL (production builds don't set
// NEXT_PUBLIC_WEBSITE_URL, so it falls back to this default).
const WEBSITE_PUBLIC_URL = "https://nadundesilva.com";
const SCHEMA_PERSON_ID = `${WEBSITE_PUBLIC_URL}/#person`;
const SCHEMA_WEBSITE_ID = `${WEBSITE_PUBLIC_URL}/#website`;

const getPersonJsonLdGraph = (): Cypress.Chainable<Record<string, unknown>[]> =>
    cy
        .get('script[type="application/ld+json"]#json-ld-person')
        .then(($script) => JSON.parse($script.text())["@graph"]);

const getPerson = (
    graph: Record<string, unknown>[],
): Record<string, unknown> => {
    const person = graph.find((e) => e["@type"] === "Person");
    if (!person) {
        throw new Error("Person node not found in home page JSON-LD graph");
    }
    return person;
};

describe("SEO static routes", () => {
    describe("sitemap", () => {
        const getSitemapUrls = (): Cypress.Chainable<
            { loc: string; lastmod: string; changefreq: string }[]
        > =>
            cy.request("/sitemap.xml").then((response) =>
                childrenNamed(
                    parseXml(response.body as string).documentElement,
                    "url",
                ).map((url) => ({
                    loc: childText(url, "loc"),
                    lastmod: childText(url, "lastmod"),
                    changefreq: childText(url, "changefreq"),
                })),
            );

        it("serves the sitemap as valid XML to crawlers", () => {
            cy.request("/sitemap.xml").then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers["content-type"]).to.include("xml");
                parseXml(response.body as string);
            });
        });

        it("lists the site's canonical URL, main sections and CV so crawlers can discover them", () => {
            // The sitemap lists canonical absolute URLs (WEBSITE_PUBLIC_URL),
            // which is independent of where Cypress points (baseUrl differs
            // between local and CI).
            getSitemapUrls().then((urls) => {
                const locations = urls.map((url) => url.loc);
                expect(locations).to.include(`${WEBSITE_PUBLIC_URL}/`);
                expect(locations).to.include(
                    `${WEBSITE_PUBLIC_URL}${CvPdfPath}`,
                );
                for (const path of CONTENT_ROUTE_PATHS) {
                    expect(locations, `sitemap entry for ${path}`).to.include(
                        `${WEBSITE_PUBLIC_URL}${path}`,
                    );
                }
            });
        });

        it("lists every blog article and article group exactly once so crawlers can discover them", () => {
            cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
                cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
                    (subGroups) => {
                        getSitemapUrls().then((urls) => {
                            const locations = urls.map((url) => url.loc);

                            [...articles, ...subGroups].forEach((url) => {
                                const matches = locations.filter(
                                    (loc) =>
                                        loc === `${WEBSITE_PUBLIC_URL}${url}`,
                                );
                                expect(
                                    matches,
                                    `expected exactly one sitemap entry for ${url}`,
                                ).to.have.length(1);
                            });
                        });
                    },
                );
            });
        });

        it("only lists pages that actually exist so crawlers never hit a dead entry", () => {
            // The "lists ..." tests above compare the sitemap against the same
            // route/discovery sources it is built from, so a stale entry from
            // resolveRouteFilePath / buildBlogArticleSitemapEntries (app/sitemap.ts)
            // would pass them. This fetches every <loc> instead.
            getSitemapUrls().then((urls) => {
                expect(urls.length).to.be.greaterThan(0);
                urls.forEach((url) => {
                    const { pathname } = new URL(url.loc);
                    cy.request(pathname).its("status").should("eq", 200);
                });
            });
        });

        it("tells crawlers when each page last changed", () => {
            getSitemapUrls().then((urls) => {
                expect(urls.length).to.be.greaterThan(0);
                urls.forEach((url) => {
                    expect(new Date(url.lastmod).toString(), url.loc).to.not.eq(
                        "Invalid Date",
                    );
                });
            });
        });

        it("tells crawlers that category pages change more often than the articles inside them", () => {
            getSitemapUrls().then((urls) => {
                const categoryEntry = urls.find(
                    (url) =>
                        url.loc ===
                        `${WEBSITE_PUBLIC_URL}/blog-articles/engineering`,
                );
                const articleEntry = urls.find((url) =>
                    url.loc.startsWith(
                        `${WEBSITE_PUBLIC_URL}/blog-articles/engineering/`,
                    ),
                );

                expect(categoryEntry?.changefreq).to.eq("weekly");
                expect(articleEntry?.changefreq).to.eq("yearly");
            });
        });
    });

    describe("robots", () => {
        it("serves robots.txt as plain text to crawlers", () => {
            cy.request("/robots.txt").then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers["content-type"]).to.include(
                    "text/plain",
                );
            });
        });

        it("lets every crawler index the whole site", () => {
            cy.request("/robots.txt").then((response) => {
                expect(response.body).to.match(/User-Agent:\s*\*/i);
                expect(response.body).to.match(/Allow:\s*\//i);
            });
        });

        it("points crawlers at the sitemap", () => {
            cy.request("/robots.txt").then((response) => {
                expect(response.body).to.include(
                    `Sitemap: ${WEBSITE_PUBLIC_URL}/sitemap.xml`,
                );
            });
        });
    });

    describe("PWA manifest", () => {
        it("serves the PWA manifest as valid JSON", () => {
            cy.request("/manifest.webmanifest").then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers["content-type"]).to.include("json");
            });
        });

        it("describes the site well enough to be installed as an app", () => {
            cy.request("/manifest.webmanifest").then((response) => {
                const manifest = response.body as {
                    name: string;
                    short_name: string;
                    description: string;
                    start_url: string;
                    display: string;
                };

                void expect(manifest.name).to.not.be.empty;
                void expect(manifest.short_name).to.not.be.empty;
                void expect(manifest.description).to.not.be.empty;
                expect(manifest.start_url).to.eq("/");
                expect(manifest.display).to.eq("standalone");
            });
        });

        it("supplies icons a home-screen install can use", () => {
            cy.request("/manifest.webmanifest").then((response) => {
                const manifest = response.body as {
                    icons: {
                        src: string;
                        sizes: string;
                        type: string;
                        purpose?: string;
                    }[];
                };

                expect(manifest.icons.length).to.be.greaterThan(0);
                manifest.icons.forEach((icon) => {
                    void expect(icon.sizes).to.not.be.empty;
                    void expect(icon.type).to.not.be.empty;
                });
                expect(
                    manifest.icons.some((icon) => icon.purpose === "maskable"),
                ).to.eq(true);
            });
        });
    });
});

describe("canonical and profile-identity link tags", () => {
    it("points every page at its own URL as the canonical one for search engines", () => {
        // Exact equality, not a substring/prefix match: a wrong metadataBase
        // or a stray canonical override would still pass a loose ".include()"
        // check as long as the path appears somewhere in the href.
        for (const path of ["/", ...CONTENT_ROUTE_PATHS]) {
            cy.request(path).then((response) => {
                const doc = new DOMParser().parseFromString(
                    response.body as string,
                    "text/html",
                );
                const canonical = doc
                    .querySelector('link[rel="canonical"]')
                    ?.getAttribute("href");
                expect(canonical, `canonical on ${path}`).to.eq(
                    path === "/"
                        ? WEBSITE_PUBLIC_URL
                        : `${WEBSITE_PUBLIC_URL}${path}`,
                );
            });
        }
    });

    it("links every social profile as rel=me for identity verification", () => {
        cy.visit("/");
        for (const profile of Object.values(Profiles)) {
            for (const href of [profile.url, ...(profile.urlAliases ?? [])]) {
                cy.get(`link[rel="me"][href="${href}"]`).should("exist");
            }
        }
    });

    it("proves site ownership to Google and Yandex Search Console", () => {
        cy.loadPage("/");
        // The token values are Search Console secrets — assert only that a
        // non-empty verification token is present for each provider.
        cy.get('meta[name="google-site-verification"]')
            .should("have.attr", "content")
            .and("not.be.empty");
        cy.get('meta[name="yandex-verification"]')
            .should("have.attr", "content")
            .and("not.be.empty");
    });

    it("identifies the site's Facebook app and profile for link attribution", () => {
        cy.loadPage("/");
        cy.get('meta[property="fb:app_id"]').should(
            "have.attr",
            "content",
            "567329184466353",
        );
        cy.get('meta[property="fb:profile_id"]').should(
            "have.attr",
            "content",
            "nadunrds",
        );
    });

    it("lets a browser offer the site as an installable app from any page", () => {
        for (const route of ["/", "/experience"]) {
            cy.loadPage(route);
            cy.get('link[rel="manifest"]')
                .should("have.attr", "href")
                .and("include", "/manifest.webmanifest");
            cy.get('link[rel="apple-touch-icon"]').should("have.attr", "href");
            cy.get('meta[name="theme-color"]').should("have.attr", "content");
        }
    });

    it("tells crawlers to index and follow every page", () => {
        for (const route of ["/", "/experience"]) {
            cy.loadPage(route);
            cy.get('meta[name="robots"]')
                .should("have.attr", "content")
                .and("match", /^index, ?follow$/);
        }
    });

    it("lets crawlers show full-size previews and snippets for blog content", () => {
        for (const route of ["/blog-articles", SAMPLE_BLOG_ARTICLE_PATH]) {
            cy.loadPage(route);
            cy.get('meta[name="robots"]')
                .should("have.attr", "content")
                .and("match", /index, ?follow/)
                .and("include", "max-image-preview:large")
                .and("include", "max-snippet:-1")
                .and("include", "max-video-preview:-1");
        }
    });
});

describe("metadata image assets", () => {
    // og:image/twitter:image/apple-touch-icon/manifest icons/Person.image are
    // all absolute URLs built from WEBSITE_PUBLIC_URL (via metadataBase), but
    // cy.request must stay on Cypress's own baseUrl (localhost in dev, the
    // locally-proxied production origin in CI) rather than reaching out to
    // the public internet.
    // Guards against silently firing a real request at the wrong host: an
    // absolute URL must be on this site, or cy.request would otherwise hit
    // whatever domain a regression pointed it at instead of failing loudly.
    const requestAssetPath = (
        absoluteOrRelativeUrl: string,
    ): Cypress.Chainable<Cypress.Response<Buffer>> => {
        if (
            /^https?:\/\//.test(absoluteOrRelativeUrl) &&
            !absoluteOrRelativeUrl.startsWith(WEBSITE_PUBLIC_URL)
        ) {
            throw new Error(
                `Expected an asset URL on ${WEBSITE_PUBLIC_URL}, got ${absoluteOrRelativeUrl}`,
            );
        }
        return cy.request(
            absoluteOrRelativeUrl.replace(WEBSITE_PUBLIC_URL, ""),
        );
    };

    const expectServedAsImage = (response: Cypress.Response<Buffer>): void => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.match(/^image\//);
    };

    it("serves the link-preview image social platforms will request", () => {
        cy.loadPage("/");
        cy.get('meta[property="og:image"]')
            .invoke("attr", "content")
            .then((url) => requestAssetPath(url!))
            .then(expectServedAsImage);

        cy.get('meta[name="twitter:image"]')
            .invoke("attr", "content")
            .then((url) => requestAssetPath(url!))
            .then(expectServedAsImage);
    });

    it("serves every icon a home-screen install and browser tab will request", () => {
        cy.loadPage("/");
        cy.get('link[rel="apple-touch-icon"]')
            .invoke("attr", "href")
            .then((url) => requestAssetPath(url!))
            .then(expectServedAsImage);

        cy.request("/manifest.webmanifest").then((response) => {
            const manifest = response.body as { icons: { src: string }[] };
            manifest.icons.forEach((icon) => {
                requestAssetPath(icon.src).then(expectServedAsImage);
            });
        });
    });

    it("serves the profile photo the knowledge panel will request", () => {
        cy.loadPage("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);
            const image = person.image as { url: string };
            requestAssetPath(image.url).then(expectServedAsImage);
        });
    });
});

describe("RSS feed discovery", () => {
    it("offers the RSS feed for discovery by feed readers", () => {
        cy.loadPage("/blog-articles");
        cy.get('link[rel="alternate"][type="application/rss+xml"]').should(
            "have.attr",
            "href",
            `${WEBSITE_PUBLIC_URL}/blog-articles/feed.xml`,
        );
    });
});

describe("home page JSON-LD structured data", () => {
    it("exposes profile and person data for the knowledge panel", () => {
        cy.visit("/");
        cy.get('script[type="application/ld+json"]#json-ld-person').then(
            ($script) => {
                const data = JSON.parse($script.text());
                expect(data["@graph"]).to.be.an("array");

                const profilePage = (data["@graph"] as unknown[]).find(
                    (e: unknown) =>
                        (e as Record<string, unknown>)["@type"] ===
                        "ProfilePage",
                ) as Record<string, unknown> | undefined;
                void expect(profilePage).to.exist;
                void expect(
                    (profilePage!["mainEntity"] as Record<string, string>)[
                        "@id"
                    ],
                ).to.include("/#person");

                const person = (data["@graph"] as unknown[]).find(
                    (e: unknown) =>
                        (e as Record<string, unknown>)["@type"] === "Person",
                ) as Record<string, unknown> | undefined;
                void expect(person).to.exist;
                void expect(person!["@id"]).to.include("/#person");
                void expect(person!["knowsAbout"])
                    .to.be.an("array")
                    .with.length.at.least(1);
                void expect(person!["award"])
                    .to.be.an("array")
                    .with.length.at.least(1);
                void expect(person!["hasCredential"])
                    .to.be.an("array")
                    .with.length.at.least(1);
                void expect(person!["alumniOf"])
                    .to.be.an("array")
                    .with.length.at.least(1);
            },
        );
    });

    it("links every social profile identity into sameAs and identifier", () => {
        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);

            const expectedSameAs = [
                WEBSITE_PUBLIC_URL,
                ...Object.values(Profiles).flatMap((profile) => [
                    profile.url,
                    ...(profile.urlAliases ?? []),
                ]),
            ];
            expect(person["sameAs"]).to.deep.equal(expectedSameAs);

            const expectedIdentifiers = Object.values(Profiles).map(
                (profile) => ({
                    "@type": "PropertyValue",
                    "propertyID": profile.wikidataPropertyId,
                    "name": profile.name,
                    "value": profile.username,
                    "url": profile.url,
                }),
            );
            expect(person["identifier"]).to.deep.equal(expectedIdentifiers);
        });
    });

    // The Wikidata entity URLs below are the assertion target, so they are
    // kept as local literals rather than imported from @/constants/metadata:
    // importing WIKIDATA_* would make this pass for any QID, and that module
    // also isn't loadable here (same asset-bundling constraint noted above the
    // WEBSITE_PUBLIC_URL literal). These are what disambiguates the person for
    // Google's Knowledge Graph - a wrong-but-well-formed QID is invisible in
    // review and nothing else in the suite would catch it.
    it("links its birthplace, nationality, home location and spoken languages to public entity records", () => {
        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);

            expect(person["birthPlace"]).to.deep.equal({
                "@type": "Place",
                "name": "Colombo, Sri Lanka",
                "sameAs": "https://www.wikidata.org/entity/Q35381",
            });
            expect(person["nationality"]).to.deep.equal({
                "@type": "Country",
                "name": "Sri Lankan",
                "sameAs": "https://www.wikidata.org/entity/Q854",
            });
            expect(person["homeLocation"]).to.deep.equal({
                "@type": "Place",
                "name": "Auckland, New Zealand",
                "sameAs": "https://www.wikidata.org/entity/Q37100",
            });
            expect(person["knowsLanguage"]).to.deep.equal([
                {
                    "@type": "Language",
                    "name": "English",
                    "sameAs": "https://www.wikidata.org/entity/Q1860",
                },
                {
                    "@type": "Language",
                    "name": "Sinhala",
                    "sameAs": "https://www.wikidata.org/entity/Q13267",
                },
            ]);
        });
    });

    it("gives the person a full legal name and the name variants search engines will see", () => {
        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);

            expect(person["givenName"]).to.eq("Nadun");
            expect(person["familyName"]).to.eq("De Silva");
            expect(person["alternateName"]).to.deep.equal([
                "Nadun Rusiru De Silva",
                "Kurukulasuriya Patabandige Nadun Rusiru De Silva",
            ]);
            expect(person["gender"]).to.eq("https://schema.org/Male");
        });
    });

    it("lists only Expert-level skills in knowsAbout and hasOccupation", () => {
        const expectedExpertSkills = Object.values(Skills)
            .filter(
                (skill) => skill.proficiencyLevel === SkillProficiency.Expert,
            )
            .map((skill) => skill.name);

        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);

            expect(person["knowsAbout"]).to.deep.equal(expectedExpertSkills);
            expect(
                (person["hasOccupation"] as Record<string, unknown>)["skills"],
            ).to.eq(expectedExpertSkills.join(", "));
        });
    });

    it("gives the current role no endDate while past roles have one, and keeps jobTitle/worksFor/affiliation in sync with it", () => {
        // @/constants/experience isn't importable here (same asset-bundling
        // constraint as above), so this checks internal consistency instead
        // of cross-checking CurrentExperience.
        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const person = getPerson(graph);
            const memberOf = person["memberOf"] as Record<string, unknown>[];

            expect(memberOf).to.be.an("array").with.length.at.least(1);
            memberOf.forEach((role) => {
                expect(role["@type"]).to.eq("OrganizationRole");
                void expect(role["roleName"]).to.be.a("string").and.not.empty;
                void expect(role["startDate"]).to.be.a("string").and.not.empty;
                const employer = role["memberOf"] as Record<string, unknown>;
                void expect(employer["name"]).to.be.a("string").and.not.empty;
                void expect(employer["sameAs"])
                    .to.be.an("array")
                    .with.length.at.least(1);
            });

            const currentRoles = memberOf.filter(
                (role) => role["endDate"] === undefined,
            );
            // Exactly one role is ongoing - the current job - every other role
            // in the history must have ended.
            expect(currentRoles).to.have.length(1);
            const currentRole = currentRoles[0];
            const currentEmployer = currentRole["memberOf"] as Record<
                string,
                unknown
            >;

            expect(person["jobTitle"]).to.eq(currentRole["roleName"]);
            expect(
                (person["worksFor"] as Record<string, unknown>[])[0]["name"],
            ).to.eq(currentEmployer["name"]);
            expect(
                (person["affiliation"] as Record<string, unknown>)["name"],
            ).to.eq(currentEmployer["name"]);
        });
    });

    it("carries a ScholarlyArticle graph entry for every publication", () => {
        cy.visit("/");
        getPersonJsonLdGraph().then((graph) => {
            const scholarlyArticles = graph.filter(
                (e) => e["@type"] === "ScholarlyArticle",
            );
            expect(scholarlyArticles).to.have.length(
                Object.keys(Publications).length,
            );

            Object.values(Publications).forEach((publication) => {
                const article = scholarlyArticles.find(
                    (a) => a["@id"] === publication.url,
                );
                void expect(
                    article,
                    `missing ScholarlyArticle for ${publication.url}`,
                ).to.exist;
                expect(article!["url"]).to.eq(publication.url);
                expect(article!["headline"]).to.eq(publication.title);
                expect(article!["datePublished"]).to.eq(
                    publication.publishedDate.toISOString(),
                );
                expect(article!["keywords"]).to.deep.equal(
                    publication.keywords,
                );
                expect(article!["author"]).to.deep.equal({
                    "@id": SCHEMA_PERSON_ID,
                });
            });
        });
    });

    it("reports the real published article count as the interaction statistic", () => {
        cy.task<string[]>("discoverBlogArticles", ".").then((articles) => {
            cy.visit("/");
            getPersonJsonLdGraph().then((graph) => {
                const person = getPerson(graph);
                const stat = person["agentInteractionStatistic"] as Record<
                    string,
                    unknown
                >;
                expect(stat["userInteractionCount"]).to.eq(articles.length);
            });
        });
    });
});

describe("site-wide JSON-LD structured data", () => {
    it("identifies the WebSite node every CollectionPage refers back to", () => {
        cy.visit("/");
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            let website: Record<string, unknown> | null = null;
            $scripts.each((_, el) => {
                const data = JSON.parse(
                    (el as HTMLScriptElement).textContent ?? "{}",
                );
                if ((data as Record<string, unknown>)["@type"] === "WebSite") {
                    website = data as Record<string, unknown>;
                }
            });

            void expect(website).to.not.be.null;
            void expect(website!["@id"]).to.eq(SCHEMA_WEBSITE_ID);
            for (const key of [
                "about",
                "author",
                "creator",
                "copyrightHolder",
            ]) {
                void expect(website![key]).to.deep.equal({
                    "@id": SCHEMA_PERSON_ID,
                });
            }
        });
    });
});

describe("content page JSON-LD structured data", () => {
    it("tells crawlers where the page sits in the site hierarchy", () => {
        cy.loadPage("/experience");
        cy.get('script[type="application/ld+json"]#json-ld-breadcrumb').then(
            ($script) => {
                const data = JSON.parse($script.text());
                expect(data["@type"]).to.eq("BreadcrumbList");

                const items = data["itemListElement"] as unknown[];
                expect(items).to.be.an("array").with.length.at.least(2);

                const last = items[items.length - 1] as Record<string, unknown>;
                expect(last["name"]).to.eq("Experience");
            },
        );
    });

    // RouterBreadcrumbs returns null (dropping this JSON-LD with no
    // failure) whenever a route isn't in the map it walks - sweep every
    // statically-declared content route so a route that falls out of that
    // map is caught here rather than silently losing its structured data.
    it("gives every content page a breadcrumb trail for crawlers", () => {
        for (const route of CONTENT_ROUTE_PATHS) {
            cy.loadPage(route);
            cy.get(
                'script[type="application/ld+json"]#json-ld-breadcrumb',
            ).then(($script) => {
                const data = JSON.parse($script.text());
                expect(data["@type"], route).to.eq("BreadcrumbList");

                const items = data["itemListElement"] as unknown[];
                expect(items, route).to.be.an("array").with.length.at.least(2);

                const last = items[items.length - 1] as Record<string, unknown>;
                void expect(last["name"], route).to.be.a("string").and.not
                    .empty;
            });
        }
    });

    // The routes above are statically declared in constants/routes.ts.
    // Blog articles and their groups sit on a separate, dynamically-built
    // branch of the same route tree (see app/layout.tsx) - a broken
    // websiteSubPath there makes RouterBreadcrumbs return null silently,
    // dropping both the visible trail and this JSON-LD with no test failure
    // unless that branch is swept here too.
    it("tells crawlers where a blog article and its group sit in the site hierarchy", () => {
        cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
            (subGroups) => {
                for (const route of [SAMPLE_BLOG_ARTICLE_PATH, subGroups[0]]) {
                    cy.loadPage(route);
                    cy.get(
                        'script[type="application/ld+json"]#json-ld-breadcrumb',
                    ).then(($script) => {
                        const data = JSON.parse($script.text());
                        expect(data["@type"], route).to.eq("BreadcrumbList");

                        const items = data["itemListElement"] as unknown[];
                        expect(items, route)
                            .to.be.an("array")
                            .with.length.at.least(2);
                    });
                }
            },
        );
    });
});

describe("education page JSON-LD structured data", () => {
    it("lists every publication as a scholarly article for crawlers", () => {
        cy.loadPage("/education");
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            const scholarlyArticles: Record<string, unknown>[] = [];
            $scripts.each((_, el) => {
                const data = JSON.parse(
                    (el as HTMLScriptElement).textContent ?? "{}",
                ) as Record<string, unknown>;
                const graph = data["@graph"] as
                    | Record<string, unknown>[]
                    | undefined;
                graph
                    ?.filter((e) => e["@type"] === "ScholarlyArticle")
                    .forEach((e) => scholarlyArticles.push(e));
            });
            expect(scholarlyArticles).to.have.length(
                Object.keys(Publications).length,
            );

            Object.values(Publications).forEach((publication) => {
                const article = scholarlyArticles.find(
                    (a) => a["@id"] === publication.url,
                );
                void expect(
                    article,
                    `missing ScholarlyArticle for ${publication.url}`,
                ).to.exist;
                expect(article!["url"]).to.eq(publication.url);
                expect(article!["headline"]).to.eq(publication.title);
                expect(article!["datePublished"]).to.eq(
                    publication.publishedDate.toISOString(),
                );
                expect(article!["keywords"]).to.deep.equal(
                    publication.keywords,
                );
                expect(article!["author"]).to.deep.equal({
                    "@id": SCHEMA_PERSON_ID,
                });
            });
        });
    });
});

describe("CollectionPage JSON-LD structured data", () => {
    it("attributes a non-blog content page to the site owner for crawlers", () => {
        cy.loadPage("/projects");
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            let collectionPage: Record<string, unknown> | null = null;
            $scripts.each((_, el) => {
                const data = JSON.parse(
                    (el as HTMLScriptElement).textContent ?? "{}",
                );
                if (
                    (data as Record<string, unknown>)["@type"] ===
                    "CollectionPage"
                ) {
                    collectionPage = data as Record<string, unknown>;
                }
            });
            void expect(collectionPage).to.not.be.null;
            void expect(collectionPage!["@id"]).to.include("/projects");
            void expect(collectionPage!["isPartOf"]).to.deep.include({
                "@id": SCHEMA_WEBSITE_ID,
            });
            void expect(collectionPage!["about"]).to.deep.include({
                "@id": SCHEMA_PERSON_ID,
            });
        });
    });

    it("does not attribute the blog index itself to the site owner", () => {
        cy.loadPage("/blog-articles");
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            let collectionPage: Record<string, unknown> | null = null;
            $scripts.each((_, el) => {
                const data = JSON.parse(
                    (el as HTMLScriptElement).textContent ?? "{}",
                );
                if (
                    (data as Record<string, unknown>)["@type"] ===
                    "CollectionPage"
                ) {
                    collectionPage = data as Record<string, unknown>;
                }
            });
            void expect(collectionPage).to.not.be.null;
            void expect(collectionPage!["isPartOf"]).to.deep.include({
                "@id": SCHEMA_WEBSITE_ID,
            });
            void expect(collectionPage!["about"]).to.be.undefined;
        });
    });

    it("identifies every content page by its own URL for crawlers", () => {
        for (const route of CONTENT_ROUTE_PATHS) {
            cy.loadPage(route);
            cy.get('script[type="application/ld+json"]').then(($scripts) => {
                let collectionPage: Record<string, unknown> | null = null;
                $scripts.each((_, el) => {
                    const data = JSON.parse(
                        (el as HTMLScriptElement).textContent ?? "{}",
                    );
                    if (
                        (data as Record<string, unknown>)["@type"] ===
                        "CollectionPage"
                    ) {
                        collectionPage = data as Record<string, unknown>;
                    }
                });
                void expect(collectionPage, `no CollectionPage on ${route}`).to
                    .not.be.null;
                void expect(
                    collectionPage!["@id"],
                    `CollectionPage @id on ${route}`,
                ).to.include(route);
                void expect(
                    collectionPage!["isPartOf"],
                    `CollectionPage isPartOf on ${route}`,
                ).to.deep.include({
                    "@id": SCHEMA_WEBSITE_ID,
                });
            });
        }
    });
});

describe("OpenGraph and Twitter meta tags", () => {
    it("shows a standard link-preview card for content pages", () => {
        cy.loadPage("/experience");

        cy.get('meta[property="og:type"]').should(
            "have.attr",
            "content",
            "website",
        );
        cy.get('meta[name="twitter:card"]').should(
            "have.attr",
            "content",
            "summary",
        );
    });

    it("shows a person-profile link-preview card on the home page", () => {
        cy.loadPage("/");

        cy.get('meta[property="og:type"]').should(
            "have.attr",
            "content",
            "profile",
        );
    });

    it("carries the page's own title and description into the link-preview card", () => {
        cy.loadPage("/experience");

        cy.title().then((title) => {
            cy.get('meta[property="og:title"]').should(
                "have.attr",
                "content",
                title,
            );
            cy.get('meta[name="twitter:title"]').should(
                "have.attr",
                "content",
                title,
            );
        });
        cy.get('meta[name="description"]')
            .invoke("attr", "content")
            .then((description) => {
                cy.get('meta[property="og:description"]').should(
                    "have.attr",
                    "content",
                    description,
                );
                cy.get('meta[name="twitter:description"]').should(
                    "have.attr",
                    "content",
                    description,
                );
            });
    });

    it("attributes every link-preview card to the site's own Twitter account, as both its site and its creator", () => {
        cy.loadPage("/experience");

        // twitter:site (the publication's account) and twitter:creator (this
        // page's author) intentionally carry the same handle - it's a
        // personal site where the site's own account and its sole content
        // creator are the same person.
        cy.get('meta[name="twitter:site"]').should(
            "have.attr",
            "content",
            TWITTER_HANDLE,
        );
        cy.get('meta[name="twitter:creator"]').should(
            "have.attr",
            "content",
            TWITTER_HANDLE,
        );
    });

    it("shows a large-image link-preview card for blog articles", () => {
        cy.visit(SAMPLE_BLOG_ARTICLE_PATH);

        cy.get('meta[property="og:type"]').should(
            "have.attr",
            "content",
            "article",
        );
        cy.get('meta[name="twitter:card"]').should(
            "have.attr",
            "content",
            "summary_large_image",
        );
    });

    it("supplies a preview image for link unfurls", () => {
        cy.loadPage("/projects");

        cy.get('meta[property="og:image"]')
            .should("have.attr", "content")
            .and("not.be.empty");
    });
});

describe("blog article JSON-LD structured data", () => {
    it("avoids duplicating person data by referencing the site owner as blog author", () => {
        cy.visit(SAMPLE_BLOG_ARTICLE_PATH);
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            let blogPosting: Record<string, unknown> | null = null;
            $scripts.each((_, el) => {
                const data = JSON.parse(
                    (el as HTMLScriptElement).textContent ?? "{}",
                );
                if (
                    (data as Record<string, unknown>)["@type"] === "BlogPosting"
                ) {
                    blogPosting = data as Record<string, unknown>;
                }
            });
            void expect(blogPosting).to.not.be.null;
            void expect(
                (blogPosting!["author"] as Record<string, unknown>)["@id"],
            ).to.include("/#person");
            void expect(
                (blogPosting!["author"] as Record<string, unknown>)["@type"],
            ).to.be.undefined;
        });
    });
});
