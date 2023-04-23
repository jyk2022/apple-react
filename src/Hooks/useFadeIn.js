import { useRef, useEffect } from 'react';

function useFadeIn(duration = 1, delay = 0) {
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.opacity = 1;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        }
    }, []);
    return { ref: element, style: { opacity: 0 } };
}

export default useFadeIn;
