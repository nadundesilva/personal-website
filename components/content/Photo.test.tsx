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
import { render, screen, waitFor } from "@testing-library/react";

import Photo from "./Photo";

test("renders photo with left float", async () => {
    const { container } = render(
        <Photo
            float={"left"}
            photo={{
                src: "/test-photo-1/photo.png",
                alt: "Test Photo 1 Alt",
                width: 167,
                height: 293,
                blurDataURL: "data:image/webp;base64,Image1",
            }}
        />,
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle(
        "float: left",
    );
    const image = await screen.findByRole("img", {
        name: /test photo 1 alt/i,
    });
    await waitFor(() => {
        expect(image.getAttribute("src")).toMatch(/\/_next\/image/i);
    });
    expect(image).toHaveAttribute(
        "src",
        "/_next/image?url=%2Ftest-photo-1%2Fphoto.png&w=384&q=75",
    );
});

test("renders photo with right float", async () => {
    const { container } = render(
        <Photo
            float={"right"}
            photo={{
                src: "/test-photo-2/photo.png",
                alt: "Test Photo 2 Alt",
                width: 413,
                height: 545,
                blurDataURL: "data:image/webp;base64,Image2",
            }}
        />,
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle(
        "float: right",
    );
    await screen.findByRole("img", {
        name: /test photo 2 alt/i,
    });
});
