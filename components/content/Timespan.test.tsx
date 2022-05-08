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
