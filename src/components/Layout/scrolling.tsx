import { MutableRefObject, useEffect, useState, useRef } from "react";

interface UseScrollOffsetProps {
    trackExit?: boolean,
};

function useScrollOffset<T extends Element>(props?: UseScrollOffsetProps): { ref: MutableRefObject<T | null>, offset: number } {
    const ref = useRef<T>(null);
    const [offset, setOffset] = useState<number>(0);

    const trackExit: boolean = props?.trackExit !== undefined && props.trackExit;
    const updateOffset = (): void => {
        if (ref.current !== null) {
            const refBBox = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            let newOffset: number;
            if (refBBox.top >= viewportHeight) {
                newOffset = 0;
            } else if (trackExit && refBBox.bottom <= 0) {
                newOffset = 0;
            } else if (refBBox.top >= viewportHeight / 2) {
                newOffset = 2 - (refBBox.top) / (viewportHeight / 2);
            } else if (trackExit && refBBox.bottom <= viewportHeight / 2) {
                newOffset = (refBBox.bottom) / (viewportHeight / 2);
            } else {
                newOffset = 1;
            }
            setOffset(newOffset);
        }
    };

    const handleScroll = (): void => {
        updateOffset();
    };

    useEffect(() => {
        updateOffset();
        window.addEventListener("scroll", handleScroll);
        return (): void => window.removeEventListener("scroll", handleScroll);
    });

    return {
        ref,
        offset: Math.min(Math.max(offset, 0), 1)
    };
}

export default useScrollOffset;
