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
import { type MutableRefObject, useEffect, useState, useRef } from "react";

// -1 -> div partially or completely above viewport
//  0 -> div visible in viewport
//  1 -> div partially or completely below viewport
type Direction = -1 | 0 | 1;

interface UseScrollOffsetReturnValue<T> {
    ref: MutableRefObject<T | null>;
    direction: Direction;
    offset: number;
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
            } else if (refBBox.top > viewportHeight / 2) {
                const fullPageHeight = document.documentElement.offsetHeight;
                const yOffset = window.pageYOffset;
                const pageBottomOffset =
                    (yOffset + viewportHeight * 1.5 - fullPageHeight) /
                    (viewportHeight / 2);
                const clientRectOffset = 2 - refBBox.top / (viewportHeight / 2);

                direction = 1;
                newOffset = Math.max(pageBottomOffset, clientRectOffset);
            } else if (refBBox.bottom < viewportHeight / 2) {
                direction = -1;
                newOffset = refBBox.bottom / (viewportHeight / 2);
            } else {
                direction = 0;
                newOffset = 1;
            }
            setDirection(direction);
            setOffset(newOffset);
        } else {
            setDirection(0);
            setOffset(0);
        }
    };

    const handleScroll = (): void => {
        window.requestAnimationFrame(updateOffset);
    };

    useEffect(() => {
        window.requestAnimationFrame(updateOffset);
        window.addEventListener("scroll", handleScroll);
        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return {
        ref,
        direction,
        offset: Math.min(Math.max(offset, 0), 1),
    };
}

export default useScrollOffset;
