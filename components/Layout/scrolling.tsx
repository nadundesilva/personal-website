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
