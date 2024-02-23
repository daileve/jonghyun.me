import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createVectors } from '../../utils/vector';
import { Vector } from '../../interfaces/vector-interfaces';

import './ParticleBackground.css';

interface Size {
    width: number;
    height: number;
}

export default memo(function ParticleBackground() {
    const animationRef = useRef(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const resizeTimer = useRef<number>();
    const vectors =  useRef<Vector[]>([]);

    const [size, setSize] = useState<Size>({width: 0, height: 0});

    const animate = useCallback(() => {
        const ctx = canvasRef.current!.getContext("2d");
        ctx!.strokeStyle = "#555";
        ctx!.fillStyle = "#333";
        ctx!.clearRect(0, 0, size.width, size.height);

        vectors.current.forEach(vector => {
            vector.move();
        });

        vectors.current.forEach(vector => {
            vector.setVectorsInRadius(vectors.current);
        });

        vectors.current.forEach(v => {
            const center_pos = v.getCenterPos();
            const positions_in_radius = Array.from(
                new Set(v.getVectorsInRadius().map(vector => ({base: vector.getPos(), center: vector.getCenterPos()})).map(p => JSON.stringify(p))),
            ).map(p => JSON.parse(p));

            positions_in_radius.forEach(pos => {
                ctx!.beginPath();
                ctx!.moveTo(center_pos.x, center_pos.y);
                ctx!.lineTo(pos.center.x, pos.center.y);
                ctx!.stroke();
            });
        }),

        vectors.current.forEach(v => {
            const base_pos = v.getPos();

            ctx!.fillRect(base_pos.x, base_pos.y, 5, 5);
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [size]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [animate]);

    useEffect(() => {
        const radius = size.width > 700 ? 80 : 50;
        vectors.current = createVectors({x: 0, y: 0}, {x: size.width, y: size.height}, (size.width + size.height) / 30, radius);
    }, [size]);

    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            if (resizeTimer.current) {
                window.clearTimeout(resizeTimer.current);
            }

            resizeTimer.current = window.setTimeout(() => {
                setSize({width: canvasRef.current!.clientWidth, height: canvasRef.current!.clientHeight});
            }, 500);
        });

        setSize({width: canvasRef.current!.clientWidth, height: canvasRef.current!.clientHeight});
    }, []);

    return <>
        <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
    </>;
});