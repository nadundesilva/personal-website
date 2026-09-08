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
import Certificates from "@/constants/certificates";
import { PersonalProjects } from "@/constants/projects";
import Publications from "@/constants/publications";
import { WebsiteHome } from "@/constants/routes";
import { CONTENT_ROUTE_PATHS } from "@/cypress/support/routes";

describe("every content page's metadata", () => {
    it("identifies each page in the browser tab and search results", () => {
        for (const route of CONTENT_ROUTE_PATHS) {
            cy.loadPage(route);

            cy.title().should("match", /^.+ \| Nadun De Silva$/);
            cy.get('meta[name="description"]')
                .should("have.attr", "content")
                .and("not.be.empty");
        }
    });
});

describe("content pages", () => {
    describe("/experience", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/experience"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^experience$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Experience | Nadun De Silva");
        });

        it("lists at least 3 job roles", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("heading", { level: 2 }).should(
                "have.length.at.least",
                3,
            );
        });
    });

    describe("/achievements", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/achievements"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^achievements$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Achievements | Nadun De Silva");
        });

        it("lists at least 2 achievements", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("heading", { level: 2 }).should(
                "have.length.at.least",
                2,
            );
        });
    });

    describe("/projects", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/projects"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^projects$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Projects | Nadun De Silva");
        });

        it("links through to personal projects and lists at least 3 enterprise projects", () => {
            cy.findByRole("link", {
                name: /view personal projects/i,
            }).should("be.visible");
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("heading", { level: 2 }).should(
                "have.length.at.least",
                3,
            );
        });
    });

    describe("/projects/personal", () => {
        beforeEach(() => {
            cy.loadPage(
                WebsiteHome.subRoutes["/projects"].subRoutes![
                    "/projects/personal"
                ].path,
            );
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^personal projects$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Personal Projects | Nadun De Silva");
        });

        it("links each personal project to its GitHub repository", () => {
            for (const project of Object.values(PersonalProjects)) {
                cy.get(`a[href="${project.link}"]`).should("exist");
            }
        });
    });

    describe("/education", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/education"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^education$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Education | Nadun De Silva");
        });

        it("links through to the certifications page", () => {
            cy.findByRole("link", {
                name: /view certifications/i,
            }).should("be.visible");
        });

        it("lists at least 2 education qualifications", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("heading", { level: 2 }).should(
                "have.length.at.least",
                2,
            );
        });

        it("links each publication to where it was published", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            for (const publication of Object.values(Publications)) {
                cy.get(`a[href="${publication.url}"]`).should("exist");
            }
        });
    });

    describe("/education/certifications", () => {
        beforeEach(() => {
            cy.loadPage(
                WebsiteHome.subRoutes["/education"].subRoutes![
                    "/education/certifications"
                ].path,
            );
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^certifications$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Certifications | Nadun De Silva");
        });

        it("links each certification to its credential", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            for (const certificate of Object.values(Certificates)) {
                cy.get(`a[href="${certificate.link}"]`).should("exist");
            }
        });
    });

    describe("/testimonials", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/testimonials"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^testimonials$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Testimonials | Nadun De Silva");
        });

        it("lists testimonials, each linking to its LinkedIn source", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("article").should("have.length.at.least", 1);
            cy.findAllByRole("link", { name: /view on linkedin/i }).should(
                "have.length.at.least",
                1,
            );
        });
    });

    describe("/blog-articles", () => {
        beforeEach(() => {
            cy.loadPage(WebsiteHome.subRoutes["/blog-articles"].path);
        });

        it("shows the page name as its main heading", () => {
            cy.findByRole("heading", {
                name: /^blog articles$/i,
                level: 1,
            }).should("be.visible");
        });

        it("identifies the page in the browser tab and search results", () => {
            cy.title().should("eq", "Blog Articles | Nadun De Silva");
        });

        it("lists blog articles, each linking to its own page", () => {
            cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
            cy.findAllByRole("link")
                .filter('[href^="/blog-articles/"]')
                .should("have.length.at.least", 5);
        });
    });

    describe("blog article group pages", () => {
        it("shows the group's own name as its main heading, not the blog index title", () => {
            cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
                (groupPages) => {
                    cy.loadPage(groupPages[0]);

                    cy.findByRole("heading", { level: 1 }).should(
                        ($heading) => {
                            expect($heading.text()).to.not.eq("Blog Articles");
                        },
                    );
                },
            );
        });

        it("identifies the group page in the browser tab and search results", () => {
            cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
                (groupPages) => {
                    cy.loadPage(groupPages[0]);

                    cy.title().should("match", /^.+ \| Nadun De Silva$/);
                    cy.get('meta[name="description"]')
                        .should("have.attr", "content")
                        .and("not.be.empty");
                },
            );
        });

        it("lists the group's articles, each linking to its own page", () => {
            cy.task<string[]>("discoverBlogArticleSubGroups", ".").then(
                (groupPages) => {
                    const groupPage = groupPages[0];
                    cy.loadPage(groupPage);

                    cy.findAllByRole("link")
                        .filter(`[href^="${groupPage}/"]`)
                        .should("have.length.at.least", 1);
                },
            );
        });
    });
});
