import {useEffect, useState, useRef} from 'react';

export default function useMouseParallax(strength = 30, easeStrength = 0.08) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const targetOffset = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    useEffect(() => {
        // Debounce mouse move handler
        let lastMouseMoveTime = 0;
        const debounceDelay = 16; // ~60fps

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastMouseMoveTime < debounceDelay) return;
            lastMouseMoveTime = now;

            const x = (e.clientX / window.innerWidth - 0.5) * strength;
            const y = (e.clientY / window.innerHeight - 0.5) * strength;
            
            // Update target, but don't directly update offset
            targetOffset.current = { x, y };
        };

        // Smooth interpolation loop using requestAnimationFrame
        const animate = () => {
            setOffset(prev => ({
                x: prev.x + (targetOffset.current.x - prev.x) * easeStrength,
                y: prev.y + (targetOffset.current.y - prev.y) * easeStrength,
            }));
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [strength, easeStrength]);

    return offset;
}