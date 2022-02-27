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
import { Box, TextField } from "@mui/material";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React, { ChangeEvent, useEffect, useState } from "react";

import useScrollOffset from "./scrolling";

interface ScrollingComponentProps {
    pageHeight: number,
    viewportHeight: number,
    div: {
        top: number,
        height: number,
    },
    isRefAvailable?: boolean,
};

const ScrollingComponent = (props: ScrollingComponentProps): React.ReactElement => {
    const { pageHeight, viewportHeight, div: { top: divTop, height: divHeight }, isRefAvailable = true } = props;

    const { ref, direction, offset } = useScrollOffset<HTMLDivElement>();
    const [viewportTop, setViewportTop] = useState<number>(0);

    const LEFT = 10;
    const WIDTH = 50;

    useEffect((): void => {
        if (ref.current !== null) {
            const refBoxTop = divTop - viewportTop;
            ref.current.getBoundingClientRect = (): DOMRect => ({
                x: LEFT,
                y: refBoxTop,
                width: WIDTH,
                height: divHeight,
                top: refBoxTop,
                right: LEFT + WIDTH,
                bottom: refBoxTop + divHeight,
                left: LEFT,
                toJSON: () => ({ type: "Mocked DOMRect" })
            });
        }

        window.innerHeight = viewportHeight;
        window.pageYOffset = viewportTop;
        jest.spyOn(document.documentElement, "offsetHeight", "get").mockReturnValue(pageHeight);
    }, [pageHeight, divTop, divHeight, viewportTop, viewportHeight, ref]);

    return (
        <Box ref={isRefAvailable ? ref : null}>
            <TextField label="viewport-top" value={viewportTop}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setViewportTop(parseFloat(event.target.value))}/>

            <Box data-testid={"scrolling-data-direction"}>{direction}</Box>
            <Box data-testid={"scrolling-data-offset"}>{offset}</Box>
        </Box>
    );
};

let scrollListeners: Array<() => void> = [];
const triggerScroll = async(viewportTop: number): Promise<void> => {
    if (scrollListeners.length === 0) {
        throw new Error("Listeners not registered");
    }

    const viewportTopTextBox = await screen.findByRole("textbox", {
        name: /viewport-top/i
    });
    fireEvent.change(viewportTopTextBox, {
        target: {
            value: viewportTop
        }
    });

    for (const listener of scrollListeners) {
        listener();
    }
};

const testHook = async(data: { direction: number, offset: number }): Promise<void> => {
    const roundOff = (num: number): number => {
        const DECIMAL_PLACES_COUNT = 13;
        const FACTOR = Math.pow(10, DECIMAL_PLACES_COUNT);
        return Math.round(num * FACTOR) / FACTOR;
    };
    const assertEqual = (numString: string, num: number): void => {
        expect(roundOff(parseFloat(numString))).toBe(roundOff(num));
    };

    const directionDiv = await screen.findByTestId("scrolling-data-direction");
    assertEqual(directionDiv.innerHTML, data.direction);
    const offsetDiv = await screen.findByTestId("scrolling-data-offset");
    assertEqual(offsetDiv.innerHTML, data.offset);
};

beforeEach(() => {
    const requestAnimationFrameMock = jest.fn();
    requestAnimationFrameMock.mockImplementation((func: () => void) => func());
    window.requestAnimationFrame = requestAnimationFrameMock;

    const addEventListenerMock = jest.fn();
    addEventListenerMock.mockImplementation((name: string, func: () => void) => {
        if (name === "scroll") {
            scrollListeners.push(func);
        }
    });
    window.addEventListener = addEventListenerMock;
});

afterEach(() => {
    jest.resetAllMocks();
    scrollListeners = [];
});

const DIV_HEIGHT: number = 2000;

describe.each([
    (() => {
        const pageHeight = DIV_HEIGHT * 4 + 1000;
        return {
            name: "page height greater twice div height, with div at viewport middle",
            pageHeight: pageHeight,
            divTop: pageHeight / 2 - DIV_HEIGHT / 2
        };
    })(),
    {
        name: "page height greater twice div height, with div at top",
        pageHeight: DIV_HEIGHT * 4 + 1000,
        divTop: 0
    }
])("[page height: $pageHeight, div top: $divTop] $name", ({ pageHeight, divTop }: { pageHeight: number, divTop: number }) => {
    // Sanity checks before running tests
    expect(pageHeight).toBeGreaterThanOrEqual(divTop + DIV_HEIGHT);

    interface ViewportData {
        name: string,
        if?: boolean,
        viewportHeight: number,
    };

    const viewportData: ViewportData[] = [
        {
            name: "viewport height greater than twice div height",
            if: DIV_HEIGHT * 2 > 500,
            viewportHeight: DIV_HEIGHT * 2 - 500
        },
        ...(() => Array.from(Array(5).keys()).reverse().map((i) => ({
            name: `viewport height ${i + 1} points higher than twice div height`,
            viewportHeight: DIV_HEIGHT * 2 + (i + 1)
        })))(),
        {
            name: "viewport height equal to twice div height",
            viewportHeight: DIV_HEIGHT * 2
        },
        ...(() => Array.from(Array(5).keys()).map((i) => ({
            name: `viewport height ${i + 1} points smaller than twice div height`,
            if: DIV_HEIGHT * 2 > (i + 1),
            viewportHeight: DIV_HEIGHT * 2 - (i + 1)
        })))(),
        ...(() => Array.from(Array(5).keys()).reverse().map((i) => ({
            name: `viewport height ${i + 1} points higher than (3 / 2) times div height`,
            viewportHeight: DIV_HEIGHT * 1.5 + (i + 1)
        })))(),
        {
            name: "viewport height between div height and twice div height",
            viewportHeight: DIV_HEIGHT * 1.5
        },
        ...(() => Array.from(Array(5).keys()).map((i) => ({
            name: `viewport height ${i + 1} points smaller than (3 / 2) times div height`,
            if: DIV_HEIGHT * 1.5 > (i + 1),
            viewportHeight: DIV_HEIGHT * 1.5 - (i + 1)
        })))(),
        ...(() => Array.from(Array(5).keys()).reverse().map((i) => ({
            name: `viewport height ${i + 1} points higher than div height`,
            viewportHeight: DIV_HEIGHT + (i + 1)
        })))(),
        {
            name: "viewport height equal to div height",
            viewportHeight: DIV_HEIGHT
        },
        ...(() => Array.from(Array(10).keys()).map((i) => ({
            name: `viewport height ${i + 1} points smaller than div height`,
            if: DIV_HEIGHT > (i + 1),
            viewportHeight: DIV_HEIGHT - (i + 1)
        })))(),
        ...(() => Array.from(Array(10).keys()).reverse().map((i) => ({
            name: `viewport height ${i + 1} points higher than (3 / 4) times div height`,
            viewportHeight: DIV_HEIGHT * 0.75 + (i + 1)
        })))(),
        {
            name: "viewport height between half div height and div height",
            viewportHeight: DIV_HEIGHT * 0.75
        },
        ...(() => Array.from(Array(10).keys()).map((i) => ({
            name: `viewport height ${i + 1} points smaller than (3 / 4) times div height`,
            if: DIV_HEIGHT * 0.75 > (i + 1),
            viewportHeight: DIV_HEIGHT * 0.75 - (i + 1)
        })))(),
        ...(() => Array.from(Array(10).keys()).reverse().map((i) => ({
            name: `viewport height ${i + 1} points higher than half div height`,
            viewportHeight: DIV_HEIGHT * 0.5 + (i + 1)
        })))(),
        {
            name: "viewport height equal to half div height",
            viewportHeight: DIV_HEIGHT * 0.5
        },
        ...(() => Array.from(Array(10).keys()).map((i) => ({
            name: `viewport height ${i + 1} points smaller than half div height`,
            if: DIV_HEIGHT * 0.5 > (i + 1),
            viewportHeight: DIV_HEIGHT * 0.5 - (i + 1)
        })))(),
        {
            name: "viewport height smaller than half div height",
            if: DIV_HEIGHT * 0.5 > 500,
            viewportHeight: DIV_HEIGHT * 0.5 - 500
        }
    ];

    describe.each(
        viewportData.filter(datum => (datum.if === undefined || datum.if))
    )("[viewport height: $viewportHeight] $name", ({ viewportHeight }: { viewportHeight: number }) => {
        interface TestData {
            name: string,
            if?: boolean,
            viewportTop: number,
            direction: number,
            offset: number,
        };

        const testData: TestData[] = [
            // viewport bottom at or above div top
            {
                name: "viewport bottom above div completely",
                if: divTop > viewportHeight,
                viewportTop: Math.floor((divTop - viewportHeight) / 2),
                direction: 1,
                offset: 0
            },
            {
                name: "viewport bottom at div top",
                if: divTop >= viewportHeight,
                viewportTop: divTop - viewportHeight,
                direction: 1,
                offset: 0
            },
            // viewport bottom between div top and div halfway point
            (() => {
                const offset = Math.min(viewportHeight / 4, DIV_HEIGHT / 8);
                return {
                    name: "viewport bottom between div top and div halfway point, with div top between viewport halfway point and viewport bottom",
                    if: divTop >= viewportHeight - offset,
                    viewportTop: divTop - viewportHeight + offset,
                    direction: 1,
                    offset: (2 * offset) / viewportHeight
                };
            })(),
            {
                name: "viewport bottom between div top and div halfway point, with div top at viewport halfway point",
                if: viewportHeight < DIV_HEIGHT && divTop >= viewportHeight / 2,
                viewportTop: divTop - viewportHeight / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div top and div halfway point, with div top between viewport top and viewport halfway point",
                if: viewportHeight < DIV_HEIGHT && divTop >= viewportHeight / 2,
                viewportTop: divTop - viewportHeight / 2 + (Math.min(DIV_HEIGHT / 2, divTop) - viewportHeight / 2) / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div top and div halfway point, with div top at viewport top",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop,
                direction: 0,
                offset: 1
            },
            {
                name: "both viewport top and bottom between div top and div halfway point",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop + (DIV_HEIGHT / 2 - viewportHeight) / 2,
                direction: 0,
                offset: 1
            },
            // viewport bottom at div halfway point
            {
                name: "viewport bottom at div halfway point, with div top between viewport halfway point and viewport bottom",
                if: viewportHeight > DIV_HEIGHT && viewportHeight - DIV_HEIGHT / 2 <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT / 2,
                direction: 1,
                offset: DIV_HEIGHT / viewportHeight
            },
            {
                name: "viewport bottom at div halfway point, with div top at viewport halfway point",
                if: viewportHeight === DIV_HEIGHT && viewportHeight / 2 <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div halfway point, with div top between viewport top and viewport halfway point",
                if: viewportHeight < DIV_HEIGHT && (viewportHeight - DIV_HEIGHT / 2) <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div halfway point, with div top at viewport top",
                if: viewportHeight === DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div halfway point, with div top above viewport top",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            // viewport bottom between div halfway point and div bottom
            (() => {
                const offset = viewportHeight / 2 > DIV_HEIGHT
                    ? Math.min(DIV_HEIGHT, divTop + DIV_HEIGHT - viewportHeight) / 2
                    : (DIV_HEIGHT - viewportHeight / 2) + (viewportHeight / 2 - DIV_HEIGHT / 2) / 2;
                return {
                    name: "viewport bottom between div halfway point and div bottom, with div top between viewport halfway point and viewport bottom",
                    if: viewportHeight > DIV_HEIGHT && viewportHeight / 2 <= divTop,
                    viewportTop: divTop - viewportHeight + DIV_HEIGHT - offset,
                    direction: 1,
                    offset: (DIV_HEIGHT - offset) / (viewportHeight / 2)
                };
            })(),
            {
                name: "viewport bottom between div halfway point and div bottom, with div top at viewport halfway point",
                if: viewportHeight > DIV_HEIGHT && viewportHeight / 2 < DIV_HEIGHT && viewportHeight / 2 <= divTop,
                viewportTop: divTop - viewportHeight / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with div top between viewport top and viewport halfway point",
                if: viewportHeight * 0.75 <= divTop + DIV_HEIGHT / 2 && viewportHeight / 2 < DIV_HEIGHT,
                viewportTop: divTop - viewportHeight / 2 + (DIV_HEIGHT - viewportHeight / 2) / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with div top at viewport top",
                if: viewportHeight > DIV_HEIGHT / 2 && viewportHeight < DIV_HEIGHT,
                viewportTop: divTop,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point above div halfway point",
                if: viewportHeight / 2 < DIV_HEIGHT / 2,
                viewportTop: divTop + DIV_HEIGHT / 2 - viewportHeight / 2 + Math.ceil((DIV_HEIGHT - viewportHeight) / 4),
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point at div halfway point",
                if: viewportHeight + 1 < DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT / 2 - viewportHeight / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point below div halfway point",
                if: viewportHeight < DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT / 2 - viewportHeight / 2 - (DIV_HEIGHT - viewportHeight) / 4,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom between div halfway point and div bottom, with viewport top at div halfway point",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "both viewport bottom and viewport top between div halfway point and div bottom",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop + DIV_HEIGHT / 2 + Math.ceil((DIV_HEIGHT / 2 - viewportHeight) * 0.5),
                direction: 0,
                offset: 1
            },
            // viewport bottom at div bottom
            {
                name: "viewport bottom at div bottom, with div top between viewport halfway point and viewport bottom",
                if: viewportHeight / 2 > DIV_HEIGHT && viewportHeight - DIV_HEIGHT <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 1,
                offset: DIV_HEIGHT * 2 / viewportHeight
            },
            {
                name: "viewport bottom at div bottom, with div top at viewport halfway point",
                if: viewportHeight / 2 === DIV_HEIGHT && viewportHeight / 2 <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div bottom, with div top between viewport top and viewport halfway point",
                if: viewportHeight / 2 < DIV_HEIGHT && viewportHeight > DIV_HEIGHT && viewportHeight - DIV_HEIGHT <= divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div bottom, with div top at viewport top",
                if: viewportHeight === DIV_HEIGHT,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div bottom, with viewport top between div top and div halfway point",
                if: viewportHeight < DIV_HEIGHT && viewportHeight > DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div bottom, with viewport top at div halfway point",
                if: viewportHeight === DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom at div bottom, with viewport top between div halfway point and div bottom",
                if: viewportHeight < DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            // viewport bottom below div bottom
            {
                name: "viewport bottom below div bottom, with div top between viewport halfway point and viewport bottom",
                if: viewportHeight / 2 > DIV_HEIGHT && viewportHeight / 2 < divTop,
                viewportTop: divTop - viewportHeight + DIV_HEIGHT + (viewportHeight / 2 - DIV_HEIGHT) / 2,
                direction: 1,
                offset: (DIV_HEIGHT + viewportHeight / 2) / viewportHeight
            },
            {
                name: "viewport bottom below div bottom, with div top at viewport halfway point",
                if: viewportHeight / 2 > DIV_HEIGHT && viewportHeight / 2 <= divTop,
                viewportTop: divTop - viewportHeight / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top between viewport top and viewport halfway point, " +
                    "with viewport halfway point above div halfway point",
                if: viewportHeight > DIV_HEIGHT && (viewportHeight / 2 - DIV_HEIGHT / 2) <= divTop,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT / 2 - (viewportHeight / 2 - DIV_HEIGHT / 2) / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top between viewport top and viewport halfway point, " +
                    "with viewport halfway point at div halfway point",
                if: viewportHeight > DIV_HEIGHT && (viewportHeight / 2 - DIV_HEIGHT / 2) <= divTop,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top between viewport top and viewport halfway point, " +
                    "with viewport halfway point between div halfway point and div bottom",
                if: viewportHeight > DIV_HEIGHT && viewportHeight / 2 < DIV_HEIGHT && viewportHeight / 2 - DIV_HEIGHT / 2 <= divTop,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT / 2 + (viewportHeight / 2 - DIV_HEIGHT / 2) / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top between viewport top and viewport halfway point, " +
                    "with viewport halfway point at div bottom",
                if: viewportHeight > DIV_HEIGHT && viewportHeight / 2 < DIV_HEIGHT,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top between viewport top and viewport halfway point, " +
                    "with viewport halfway point below div bottom",
                if: viewportHeight / 2 > DIV_HEIGHT && divTop > 0,
                viewportTop: Math.max(divTop - viewportHeight / 2 + DIV_HEIGHT + (viewportHeight / 2 - DIV_HEIGHT) / 2, 0),
                direction: -1,
                offset: (viewportHeight / 2 + DIV_HEIGHT) / viewportHeight
            },
            {
                name: "viewport bottom below div bottom, with div top at viewport top, " +
                    "with viewport halfway point between div halfway point and div bottom",
                if: viewportHeight > DIV_HEIGHT && viewportHeight / 2 < DIV_HEIGHT,
                viewportTop: divTop,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top at viewport top, " +
                    "with viewport halfway point at div bottom",
                if: viewportHeight / 2 === DIV_HEIGHT,
                viewportTop: divTop,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with div top at viewport top, " +
                    "with viewport halfway point below div bottom",
                if: viewportHeight / 2 > DIV_HEIGHT,
                viewportTop: divTop,
                direction: -1,
                offset: (2 * DIV_HEIGHT) / viewportHeight
            },
            {
                name: "viewport bottom below div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point between div halfway point and div bottom",
                if: viewportHeight / 2 < DIV_HEIGHT && viewportHeight > DIV_HEIGHT / 2,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT / 2 + Math.max(DIV_HEIGHT / 4, (viewportHeight - DIV_HEIGHT + 1) / 2),
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point at div bottom",
                if: viewportHeight / 2 < DIV_HEIGHT && viewportHeight > DIV_HEIGHT,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with viewport top between div top and div halfway point, " +
                    "with viewport halfway point below div bottom",
                if: viewportHeight > DIV_HEIGHT,
                viewportTop: divTop - viewportHeight / 2 + DIV_HEIGHT + (viewportHeight / 2 - DIV_HEIGHT / 2) / 2,
                direction: -1,
                offset: (viewportHeight / 2 + DIV_HEIGHT / 2) / viewportHeight
            },
            {
                name: "viewport bottom below div bottom, with viewport top at div halfway point, " +
                    "with viewport halfway point between div halfway point and div bottom",
                if: viewportHeight < DIV_HEIGHT && viewportHeight > DIV_HEIGHT / 2,
                viewportTop: divTop + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with viewport top at div halfway point, " +
                    "with viewport halfway point at div bottom",
                if: viewportHeight === DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with viewport top at div halfway point, " +
                    "with viewport halfway point below div bottom",
                if: viewportHeight > DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT / 2,
                direction: -1,
                offset: DIV_HEIGHT / viewportHeight
            },
            {
                name: "viewport bottom below div bottom, with viewport top between div halfway point and div bottom, " +
                    "with viewport halfway point between div halfway point and div bottom",
                if: viewportHeight < DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT - viewportHeight / 2 - (DIV_HEIGHT / 2 - viewportHeight / 2) / 2,
                direction: 0,
                offset: 1
            },
            {
                name: "viewport bottom below div bottom, with viewport top between div halfway point and div bottom, " +
                    "with viewport halfway point at div bottom",
                if: viewportHeight < DIV_HEIGHT,
                viewportTop: divTop + DIV_HEIGHT - viewportHeight / 2,
                direction: 0,
                offset: 1
            },
            (() => {
                const viewportTop = divTop + DIV_HEIGHT - viewportHeight / 2 - (DIV_HEIGHT / 2 - viewportHeight / 2) / 2;
                const isDirectionBelow = divTop - viewportTop + DIV_HEIGHT < viewportHeight / 2;
                return {
                    name: "viewport bottom below div bottom, with viewport top between div halfway point and div bottom, " +
                        "with viewport halfway point below div bottom",
                    viewportTop: viewportTop,
                    direction: isDirectionBelow ? -1 : 0,
                    offset: isDirectionBelow ? (viewportHeight / 2 + DIV_HEIGHT / 2) / viewportHeight : 1
                };
            })(),
            {
                name: "viewport top at div bottom",
                if: divTop + DIV_HEIGHT + viewportHeight <= pageHeight,
                viewportTop: divTop + DIV_HEIGHT,
                direction: -1,
                offset: 0
            },
            {
                name: "viewport top below div bottom",
                if: divTop + DIV_HEIGHT + viewportHeight < pageHeight,
                viewportTop: divTop + DIV_HEIGHT + (pageHeight - divTop - DIV_HEIGHT - viewportHeight) / 2,
                direction: -1,
                offset: 0
            }
        ];

        test.each(
            testData.filter(datum => (datum.if === undefined || datum.if))
        )("[viewport top: $viewportTop, direction: $direction, offset: $offset] $name", async({ viewportTop, direction, offset }: { viewportTop: number, direction: number, offset: number }) => {
            // Sanity checks before running tests
            expect(viewportTop).toBeGreaterThanOrEqual(0);
            expect(offset).toBeGreaterThanOrEqual(0);
            expect(pageHeight).toBeGreaterThanOrEqual(viewportTop + viewportHeight);

            act(() => {
                render(
                    <ScrollingComponent
                        pageHeight={pageHeight}
                        viewportHeight={viewportHeight}
                        div={{
                            top: divTop,
                            height: DIV_HEIGHT
                        }}
                    />
                );
            });

            await act(async() => {
                await triggerScroll(viewportTop);
            });

            await testHook({
                direction: direction,
                offset: offset
            });
        });
    });
});

test("scrolling with ref not set", async() => {
    act(() => {
        render(
            <ScrollingComponent
                pageHeight={10000}
                viewportHeight={500}
                div={{
                    top: 2400,
                    height: 250
                }}
                isRefAvailable={false}
            />
        );
    });

    await act(async() => {
        await triggerScroll(2700);
    });

    await testHook({
        direction: 0,
        offset: 0
    });
});
