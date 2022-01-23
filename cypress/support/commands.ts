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
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.1,
    failureThresholdType: "percent",
    customDiffConfig: { threshold: 0.1 },
    capture: "viewport"
});

const testIdSelector = (testId: string) => `[data-testid="${testId}"]`;

Cypress.Commands.add("getByTestId", (testId: string) => cy.get(testIdSelector(testId)));

Cypress.Commands.add("childrenByTestId", { prevSubject: "element" }, (sub: JQuery<HTMLElement>, testId: string) => (
    cy.wrap(sub).children(testIdSelector(testId))
));
