import { useState } from 'react';
import { getRandomInt } from '../utils/math';

export function useSVGAnimation() {
    const [coord, setCoord] = useState([
        getRandomInt(10, 300),
        getRandomInt(10, 300)
    ]);

    return coord;
}