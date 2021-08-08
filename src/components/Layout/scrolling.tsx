import { MutableRefObject, useEffect, useState, useRef } from "react";
import { useSpring } from "@react-spring/web";

interface UseScrollOffsetProps {
    trackExit?: boolean,
};

function useScrollOffset<T extends Element>(props?: UseScrollOffsetProps): { ref: MutableRefObject<T | undefined>, offset: number } {
    const ref = useRef<T>();
    const [offset, setOffset] = useState<number>(0);
    const { offset: dampenedOffset } = useSpring({ offset: offset });

    const trackExit: boolean = props?.trackExit !== undefined && props.trackExit;
    const updateOffset = (): void => {
        if (ref.current !== undefined) {
            const bBox = ref.current.getBoundingClientRect();
            const newOffset = bBox.top / bBox.height;
            setOffset((!trackExit || newOffset > 0) ? newOffset - 0.5 : -newOffset - 0.5);
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

    const currentOffset = dampenedOffset === undefined ? 0 : dampenedOffset.get();
    return {
        ref,
        offset: Math.min(Math.max(currentOffset, 0), 1)
    };
}

export default useScrollOffset;
