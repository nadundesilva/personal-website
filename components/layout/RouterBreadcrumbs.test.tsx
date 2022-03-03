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

jest.mock("next/dist/client/router", () => require("next-router-mock"));

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

test("renders router breadcrumbs in <root>/experience page", async () => {
    const breadcrumbs = await renderBreadcrumbs("/experience");

    const homeLink = await within(breadcrumbs).findByRole("link", {
        name: /home/i,
    });
    expect(homeLink).toHaveAttribute("href", "/");

    const experienceLink = within(breadcrumbs).queryByRole("link", {
        name: /experience/i,
    });
    expect(experienceLink).toBeNull();

    await within(breadcrumbs).findByText("Experience");
});

test("renders router breadcrumbs in <root>/achievements page", async () => {
    const breadcrumbs = await renderBreadcrumbs("/achievements");

    const homeLink = await within(breadcrumbs).findByRole("link", {
        name: /home/i,
    });
    expect(homeLink).toHaveAttribute("href", "/");

    const achievementsLink = within(breadcrumbs).queryByRole("link", {
        name: /achievements/i,
    });
    expect(achievementsLink).toBeNull();

    await within(breadcrumbs).findByText("Achievements");
});
