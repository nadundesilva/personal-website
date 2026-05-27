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
import { type Route, WebsiteHome } from "@/constants/routes";

export const resolveRoute = (path: string): Route => {
    const find = (routes: Record<string, Route>): Route | undefined => {
        const direct = routes[path];
        if (direct !== undefined) return direct;
        for (const route of Object.values(routes)) {
            if (route.subRoutes !== undefined) {
                const found = find(route.subRoutes);
                if (found !== undefined) return found;
            }
        }
        return undefined;
    };
    const route = find(WebsiteHome.subRoutes);
    if (route === undefined) {
        throw new Error(`Route not found: ${path}`);
    }
    return route;
};
