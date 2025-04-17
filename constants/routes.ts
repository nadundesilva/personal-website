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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import type { Route as NextRoute } from "next";

/*
 * Internal model for type safety starts here
 */

interface _Route {
    name: string;
    path: NextRoute<string>;
    subRoutes?: _Route[];
}

const _Routes: _Route[] = [
    {
        name: "Experience",
        path: "/experience",
    },
    {
        name: "Achievements",
        path: "/achievements",
    },
    {
        name: "Projects",
        path: "/projects",
        subRoutes: [
            {
                name: "Personal Projects",
                path: "/projects/personal",
            },
        ],
    },
    {
        name: "Testimonials",
        path: "/testimonials",
    },
    {
        name: "Blog Articles",
        path: "/blog-articles",
    },
    {
        name: "Education",
        path: "/education",
        subRoutes: [
            {
                name: "Certifications",
                path: "/education/certifications",
            },
        ],
    },
];

/*
 * Internal model for type safety ends here
 */

export interface Route {
    name: string;
    path: NextRoute<string>;
    subRoutes?: Record<string, Route>;
}

const buildRoutes = (currentRoutes: _Route[]): Record<string, Route> => {
    const routesMap: Record<string, Route> = {};
    currentRoutes.forEach((route) => {
        routesMap[route.path] = {
            name: route.name,
            path: route.path,
            subRoutes:
                route.subRoutes === undefined
                    ? undefined
                    : buildRoutes(route.subRoutes),
        };
    });
    return routesMap;
};

export const WebsiteHome: Route = {
    name: "Home",
    path: "/",
    subRoutes: buildRoutes(_Routes),
};
