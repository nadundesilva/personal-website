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
export interface Route {
    name: string;
    subRoutes?: { [key: string]: Route };
}

export const ANY_ROUTE = "*";

export const Routes: { [key: string]: Route } = {
    "/experience": {
        name: "Experience",
    },
    "/achievements": {
        name: "Achievements",
    },
    "/education": {
        name: "Education",
        subRoutes: {
            "/certifications": {
                name: "Certifications",
            },
        },
    },
};
