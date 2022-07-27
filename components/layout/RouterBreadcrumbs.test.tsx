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
import { act, render, screen, within } from "@testing-library/react";
import singletonRouter from "next/router";

import RouterBreadcrumbs from "./RouterBreadcrumbs";
import { Routes, ANY_ROUTE } from "@/constants/routes";

jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("@/constants/routes", () => ({
    Routes: {
        "/test-page-1": {
            name: "Test Page 1",
        },
        "/test-page-2": {
            name: "Test Page 2",
            subRoutes: {
                "/test-page-2-a": {
                    name: "Test Page 2 A",
                },
            },
        },
        "/test-page-3": {
            name: "Test Page 3",
            subRoutes: {
                "/test-page-3-a": {
                    name: "Test Page 3 A",
                },
                "/test-page-3-b": {
                    name: "Test Page 3 B",
                    subRoutes: {},
                },
                "/test-page-3-c": {
                    name: "Test Page 3 C",
                    subRoutes: {
                        "/test-page-3-c-i": {
                            name: "Test Page 3 C I",
                        },
                    },
                },
            },
        },
        "/test-page-4": {
            name: "Test Page 4",
        },
        "/test-page-5": {
            name: "Test Page 5",
            subRoutes: {
                "*": {
                    name: "Test Any Page 1",
                },
            },
        },
        "*": {
            name: "Test Any Page 2",
        },
    },
    ANY_ROUTE: "*",
}));

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

const renderBreadcrumbs = async (url: string): Promise<HTMLElement> => {
    await act(async () => {
        await singletonRouter.push(url);
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

const levelOneRoutes = Object.entries(Routes).map(([key, value]) => ({
    name: value.name,
    path: key,
}));

describe.each(levelOneRoutes)(
    "level one routes at <root>$path",
    ({ name: levelOneName, path: levelOnePath }: TestRoute) => {
        if (levelOnePath === ANY_ROUTE) {
            test("renders router breadcrumbs any page", async () => {
                const randomPath = `/any-path-${Math.random()}`;
                const breadcrumbs = await renderBreadcrumbs(randomPath);

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
            return;
        }

        const levelOneSubRoutes = Routes[levelOnePath].subRoutes;
        if (levelOneSubRoutes !== undefined) {
            const levelTwoRoutes = Object.entries(levelOneSubRoutes).map(
                ([key, value]) => ({
                    name: value.name,
                    path: levelOnePath + key,
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

                    if (levelTwoPath === levelOnePath + ANY_ROUTE) {
                        test("renders router breadcrumbs any page", async () => {
                            const randomPath = `/any-path-${Math.random()}`;
                            const breadcrumbs = await renderLevelTwoBreadCrumbs(
                                levelOnePath + randomPath,
                            );

                            const levelTwoLink = within(
                                breadcrumbs,
                            ).queryByRole("link", {
                                name: new RegExp(levelTwoName, "i"),
                            });
                            expect(levelTwoLink).toBeNull();

                            await within(breadcrumbs).findByText(levelTwoName);
                        });
                        return;
                    }

                    test("renders router breadcrumbs page", async () => {
                        const breadcrumbs = await renderLevelTwoBreadCrumbs(
                            levelTwoPath,
                        );

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
