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
import { act, render, screen, within } from "@testing-library/react";

import RouterBreadcrumbs from "./RouterBreadcrumbs";
import { Routes } from "@/constants/routes";

const singletonRouter = {
    currentRoute: "/",
};
jest.mock("next/navigation", () => ({
    ...require("next-router-mock"),
    usePathname: () => singletonRouter.currentRoute,
}));
jest.mock("@/constants/routes", () => ({
    Routes: {
        "/test-page-1": {
            name: "Test Page 1",
            path: "/test-page-1",
        },
        "/test-page-2": {
            name: "Test Page 2",
            path: "/test-page-2",
            subRoutes: {
                "/test-page-2/test-page-2-a": {
                    name: "Test Page 2 A",
                    path: "/test-page-2/test-page-2-a",
                },
            },
        },
        "/test-page-3": {
            name: "Test Page 3",
            path: "/test-page-3",
            subRoutes: {
                "/test-page-3/test-page-3-a": {
                    name: "Test Page 3 A",
                    path: "/test-page-3/test-page-3-a",
                },
                "/test-page-3/test-page-3-b": {
                    name: "Test Page 3 B",
                    path: "/test-page-3/test-page-3-b",
                    subRoutes: {},
                },
                "/test-page-3/test-page-3-c": {
                    name: "Test Page 3 C",
                    path: "/test-page-3/test-page-3-c",
                    subRoutes: {
                        "/test-page-3/test-page-3-c/test-page-3-c-i": {
                            name: "Test Page 3 C I",
                            path: "/test-page-3/test-page-3-c/test-page-3-c-i",
                        },
                    },
                },
            },
        },
        "/test-page-4": {
            name: "Test Page 4",
            path: "/test-page-4",
        },
    },
}));

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

const renderBreadcrumbs = async (url: string): Promise<HTMLElement> => {
    await act(async () => {
        singletonRouter.currentRoute = url;
    });
    render(<RouterBreadcrumbs />);

    return await screen.findByRole("navigation", {
        name: /breadcrumb/i,
    });
};

test("renders router breadcrumbs in <root> page", async () => {
    const breadcrumbs = await renderBreadcrumbs("");

    const homeLink = within(breadcrumbs).queryByRole("link", {
        name: /home/i,
    });
    expect(homeLink).toBeNull();

    await within(breadcrumbs).findByText("Home");
});

interface TestRoute {
    name: string;
    path: string;
}

const levelOneRoutes = Object.values(Routes).map((value) => ({
    name: value.name,
    path: value.path,
}));

describe.each(levelOneRoutes)(
    "level one routes at <root>$path",
    ({ name: levelOneName, path: levelOnePath }: TestRoute) => {
        const levelOneSubRoutes = Routes[levelOnePath].subRoutes;
        if (levelOneSubRoutes !== undefined) {
            const levelTwoRoutes = Object.values(levelOneSubRoutes).map(
                (value) => ({
                    name: value.name,
                    path: value.path,
                }),
            );

            describe.each(levelTwoRoutes)(
                "level two routes at <root>$path",
                ({ name: levelTwoName, path: levelTwoPath }: TestRoute) => {
                    const renderLevelTwoBreadCrumbs = async (
                        renderPath: string,
                    ): Promise<HTMLElement> => {
                        const breadcrumbs = await renderBreadcrumbs(renderPath);

                        const homeLink = await within(breadcrumbs).findByRole(
                            "link",
                            {
                                name: /home/i,
                            },
                        );
                        expect(homeLink).toHaveAttribute("href", "/");

                        const levelOneLink = await within(
                            breadcrumbs,
                        ).findByRole("link", {
                            name: new RegExp(levelOneName, "i"),
                        });
                        expect(levelOneLink).toHaveAttribute(
                            "href",
                            levelOnePath,
                        );

                        return breadcrumbs;
                    };

                    test("renders router breadcrumbs page", async () => {
                        const breadcrumbs =
                            await renderLevelTwoBreadCrumbs(levelTwoPath);

                        const levelTwoLink = within(breadcrumbs).queryByRole(
                            "link",
                            {
                                name: new RegExp(levelTwoName, "i"),
                            },
                        );
                        expect(levelTwoLink).toBeNull();

                        await within(breadcrumbs).findByText(levelTwoName);
                    });
                },
            );
        }

        test("renders router breadcrumbs page", async () => {
            const breadcrumbs = await renderBreadcrumbs(levelOnePath);

            const homeLink = await within(breadcrumbs).findByRole("link", {
                name: /home/i,
            });
            expect(homeLink).toHaveAttribute("href", "/");

            const levelOneLink = within(breadcrumbs).queryByRole("link", {
                name: new RegExp(levelOneName, "i"),
            });
            expect(levelOneLink).toBeNull();

            await within(breadcrumbs).findByText(levelOneName);
        });
    },
);
