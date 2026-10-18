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
    subRoutes?: readonly _Route[];
}

const _Routes = [
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
        subRoutes: [
            { name: "Cellery", path: "/blog-articles/cellery" },
            { name: "Data Analytics", path: "/blog-articles/data-analytics" },
            { name: "Engineering", path: "/blog-articles/engineering" },
            { name: "Java", path: "/blog-articles/java" },
            {
                name: "Kubernetes the Right Way",
                path: "/blog-articles/kubernetes-the-right-way",
            },
            { name: "Observability", path: "/blog-articles/observability" },
            { name: "Scala", path: "/blog-articles/scala" },
        ],
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
] as const satisfies readonly _Route[];

/*
 * Internal model for type safety ends here
 */

export interface Route {
    name: string;
    path: NextRoute<string>;
    subRoutes?: Record<string, Route> | undefined;
}

// Keys the map by each route's literal path, so a lookup of a known route is never undefined.
type CompiledRoutes<Routes extends readonly _Route[]> = {
    [R in Routes[number] as R["path"]]: {
        name: R["name"];
        path: R["path"];
        subRoutes: R extends {
            subRoutes: infer SubRoutes extends readonly _Route[];
        }
            ? CompiledRoutes<SubRoutes>
            : undefined;
    };
};

const compileRoutes = <Routes extends readonly _Route[]>(
    currentRoutes: Routes,
): CompiledRoutes<Routes> => {
    const routesMap: Record<string, Route> = {};
    currentRoutes.forEach((route) => {
        routesMap[route.path] = {
            name: route.name,
            path: route.path,
            subRoutes:
                route.subRoutes === undefined
                    ? undefined
                    : compileRoutes(route.subRoutes),
        };
    });
    return routesMap as CompiledRoutes<Routes>;
};

export const CvPdfPath = "/nadundesilva-cv.pdf";

export const WebsiteHome = {
    name: "Home",
    path: "/",
    subRoutes: compileRoutes(_Routes),
};
