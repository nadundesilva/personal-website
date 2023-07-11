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
import { render, screen } from "@testing-library/react";

import Timespan from "./Timespan";
import { Time, TimeRange } from "@/constants/commons";

test("renders timespan with provided time", async () => {
    render(<Timespan value={new Time(2021, "January")} />);

    await screen.findByText("January 2021");
});

test("renders timespan with provided time range", async () => {
    render(
        <Timespan
            value={
                new TimeRange(
                    new Time(2021, "January"),
                    new Time(2022, "March"),
                )
            }
        />,
    );

    await screen.findByText("January 2021 to March 2022");
});
