/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
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
import { MutableRefObject, useEffect, useState, useRef } from "react";

type Direction = -1 | 0 | 1;

interface UseScrollOffsetReturnValue<T> {
    ref: MutableRefObject<T | null>,
    direction: Direction,
    offset: number,
}

function useScrollOffset<T extends Element>(): UseScrollOffsetReturnValue<T> {
    const ref = useRef<T>(null);
    const [direction, setDirection] = useState<Direction>(0);
    const [offset, setOffset] = useState<number>(0);

    const updateOffset = (): void => {
        if (ref.current !== null) {
            const refBBox = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            let direction: Direction;
            let newOffset: number;
            if (refBBox.top >= viewportHeight) {
                direction = 1;
                newOffset = 0;
            } else if (refBBox.bottom <= 0) {
                direction = -1;
                newOffset = 0;
            } else if (refBBox.top >= viewportHeight / 2) {
                const fullPageHeight = document.documentElement.offsetHeight;
                const yOffset = window.pageYOffset;
                const pageBottomOffset = (yOffset + viewportHeight * 1.5 - fullPageHeight) / (viewportHeight / 2);
                const clientRectOffset = 2 - refBBox.top / (viewportHeight / 2);

                direction = 1;
                newOffset = pageBottomOffset > clientRectOffset ? pageBottomOffset : clientRectOffset;
            } else if (refBBox.bottom <= viewportHeight / 2) {
                direction = -1;
                newOffset = (refBBox.bottom) / (viewportHeight / 2);
            } else {
                direction = 0;
                newOffset = 1;
            }
            setDirection(direction);
            setOffset(newOffset);
        }
    };

    const handleScroll = (): void => {
        window.requestAnimationFrame(updateOffset);
    };

    useEffect(() => {
        window.requestAnimationFrame(updateOffset);
        window.addEventListener("scroll", handleScroll);
        return (): void => window.removeEventListener("scroll", handleScroll);
    });

    return {
        ref,
        direction,
        offset: Math.min(Math.max(offset, 0), 1)
    };
}

export default useScrollOffset;
