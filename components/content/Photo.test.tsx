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
import { render, screen, waitFor } from "@testing-library/react";

import Photo from "./Photo";

test("renders photo with left float", async() => {
    const { container } = render(
        <Photo float={"left"} photo={{
            src: "/test-photo-1/photo.png",
            alt: "Test Photo 1 Alt",
            width: 167,
            height: 293,
            blurDataURL: "data:image/webp;base64,Image1"
        }}/>
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle("float: left");
    const image = await screen.findByRole("img", {
        name: /test photo 1 alt/i
    });
    await waitFor(() => {
        expect(image.getAttribute("src")).toMatch(/\/_next\/image/i);
    });
    expect(image).toHaveAttribute("src", "/_next/image?url=%2Ftest-photo-1%2Fphoto.png&w=384&q=75");
    expect(image).toHaveStyle("background-image: url(data:image/webp;base64,Image1)");
});

test("renders photo with right float", async() => {
    const { container } = render(
        <Photo float={"right"} photo={{
            src: "/test-photo-2/photo.png",
            alt: "Test Photo 2 Alt",
            width: 413,
            height: 545,
            blurDataURL: "data:image/webp;base64,Image2"
        }}/>
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle("float: right");
    await screen.findByRole("img", {
        name: /test photo 2 alt/i
    });
});
