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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
export interface Route {
    name: string;
    subRoutes?: Record<string, Route>;
}

export const ANY_ROUTE = "*";

export const Routes: Record<string, Route> = {
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
    "/projects": {
        name: "Projects",
        subRoutes: {
            "/personal": {
                name: "Personal Projects",
            },
        },
    },
};
