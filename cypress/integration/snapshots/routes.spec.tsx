/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
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

type Routes = { [key: string]: Routes };

const routes: Routes = {
    "/experience": {},
    "/achievements": {},
    "/education": {
        "/certifications": {},
    },
};

describe("Test Routes", () => {
    const generateTests = (
        currentRoutes: Routes,
        currentBasePath: string,
    ): void => {
        Object.entries(currentRoutes).forEach(
            ([currentSubPath, subRoutes]: [string, Routes]) => {
                const currentPath = currentBasePath + currentSubPath;
                let snapshotNamePrefix = currentPath.substring(1);
                if (Object.keys(subRoutes).length > 0) {
                    generateTests(subRoutes, currentPath);
                    snapshotNamePrefix += "/index";
                }
                it(`validates ${currentPath} page load`, () => {
                    cy.loadPage(currentPath);
                    cy.matchImageSnapshot(`${snapshotNamePrefix}-page`, {
                        capture: "fullPage",
                    });
                });
            },
        );
    };
    generateTests(routes, "");
});
