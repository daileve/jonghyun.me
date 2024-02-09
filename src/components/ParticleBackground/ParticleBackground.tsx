import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createVectors } from '../../utils/vector';
import { Position, Vector } from '../../interfaces/vector-interfaces';

import './ParticleBackground.css';

const RECT_SIZE = 5;

interface Size {
    width: number;
    height: number;
}

export default memo(function ParticleBackground() {
    const animationRef = useRef(0);
    const svgRef = useRef<SVGSVGElement>(null);
    const resizeTimer = useRef<number>();
    const vectors =  useRef<Vector[]>([]);
    const size = useRef<Size>({width: 0, height: 0});

    const [positions, setPos] = useState<(
        {
            base: Position
            center: Position
            positions_in_radius: {base: Position; center: Position}[]
        }
    )[]>([]);

    const animate = useCallback(() => {
        vectors.current.forEach(vector => {
            vector.move();
        });

        vectors.current.forEach(vector => {
            vector.setVectorsInRadius(vectors.current);
        });

        setPos(
            vectors.current.map(v => ({
                base: v.getPos(),
                center: v.getCenterPos(),
                positions_in_radius:
                    // v.getVectorsInRadius().map(vector => ({base: vector.getPos(), center: vector.getCenterPos()}))
                    Array.from(
                        new Set(v.getVectorsInRadius().map(vector => ({base: vector.getPos(), center: vector.getCenterPos()})).map(p => JSON.stringify(p))),
                    ).map(p => JSON.parse(p))
            })),
        );

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [animate]);

    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            if (resizeTimer.current) {
                window.clearTimeout(resizeTimer.current);
            }

            resizeTimer.current = window.setTimeout(() => {
                size.current = {width: svgRef.current!.clientWidth, height: svgRef.current!.clientHeight};
                vectors.current = createVectors({x: 0, y: 0}, {x: size.current.width, y: size.current.height}, (size.current.width + size.current.height) / 40);
            }, 500);
        });

        size.current = {width: svgRef.current!.clientWidth, height: svgRef.current!.clientHeight};
        vectors.current = createVectors({x: 0, y: 0}, {x: svgRef.current!.clientWidth, y: svgRef.current!.clientHeight}, (svgRef.current!.clientWidth + svgRef.current!.clientHeight) / 40);
    }, []);

    return <>
        <svg ref={svgRef} className='particleSVGWrap'>
            <defs>
                <filter id="f1" x="0" y="0">
                    <feGaussianBlur in='SourceGraphic' stdDeviation='3' />
                </filter>
            </defs>
            <g stroke="#999">
                {positions.map(({center, positions_in_radius}, i) => 
                    positions_in_radius.map((pos, j) => {
                        return <line key={`${i}_${j}_line`} x1={center.x} x2={pos.center.x} y1={center.y} y2={pos.center.y} />;
                    })
                )}
            </g>
            <g fill="#888">
                {positions.map(({base}, i) => {
                    return <rect key={i} x={base.x} y={base.y} width={RECT_SIZE} height={RECT_SIZE} filter='url(#f1)' />;
                })}
            </g>
        </svg>
    </>;
});