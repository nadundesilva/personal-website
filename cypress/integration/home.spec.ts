/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface Section {
    name: string,
    testIdPrefix: string,
    hasNavBarButton: boolean
}

describe("Test Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.getByTestId("home-page")
            .childrenByTestId("section-loader")
            .should("not.exist");
        cy.log("Loaded Home page");
    });

    it("validates page load", () => {
        cy.getByTestId("view-cv-button")
            .should("be.visible");
    });

    it("validates sections", () => {
        cy.fixture("sections").then((sections: Section[]) => {
            sections.forEach((section) => {
                if (section.hasNavBarButton) {
                    cy.getByTestId(`${section.testIdPrefix}-nav-button`)
                        .should("be.visible")
                        .click()
                        .wait(3000);
                    cy.getByTestId(`${section.testIdPrefix}-section`)
                        .should("be.visible");
                    cy.getByTestId(`${section.testIdPrefix}-section`)
                        .matchImageSnapshot(`home-page-${section.testIdPrefix}-section`);
                }
            });
        });
    });
});
