import { getRandomInt, positionIsInRadius } from './math';
import { Position, Vector } from '../interfaces/vector-interfaces';

export const createVector = (idx: number, min: Position, max: Position, move_times: number, radius: number = 50): Vector => {
    let max_x = max.x;
    let max_y = max.y;
    let pos_x = getRandomInt(min.x, max_x);
    let pos_y = getRandomInt(min.y, max_y);
    let current_move = 1;
    let vector_x = 0;
    let vector_y = 0;
    let vectors_in_radius: Vector[] = [];

    setRandomVector();

    function getPos() {
        return {x: pos_x, y: pos_y};
    }
    
    function getCenterPos() {
        return {x: pos_x + 2.5, y: pos_y + 2.5};
    }
    
    function getVector() {
        return {x: vector_x, y: vector_y};
    }

    function getRandomVector() {
        const rand_array = [0.25, -0.25];

        return {
            vector_x: rand_array[Math.round(Math.random())],
            vector_y: rand_array[Math.round(Math.random())]
        };
    }

    function setRandomVector() {
        const rand_vector = getRandomVector();

        vector_x = rand_vector.vector_x;
        vector_y = rand_vector.vector_y;
    };

    function getVectorsInRadius() {
        return vectors_in_radius;
    }

    function setVectorsInRadius(vectors: Vector[]) {
        vectors_in_radius = vectors.filter(vector => positionIsInRadius(getPos(), vector.getPos(), radius));
    }

    function move() {
        if (
            current_move >= move_times ||
            (pos_x >= max_x || pos_y >= max_y) ||
            (pos_x <= 0 || pos_y <= 0)
        ) {
            current_move = 0;

            setRandomVector();
        } else {
            current_move += 1;
        }

        pos_x = Math.max(0, Math.min(max_x, pos_x + vector_x));
        pos_y = Math.max(0, Math.min(max_y, pos_y + vector_y));
    };

    return {
        move,
        getPos,
        getCenterPos,
        getVector,
        setVectorsInRadius,
        getVectorsInRadius
    };
}

export const createVectors = (min: Position, max: Position, count: number, radius: number): Vector[] => {
    const vectors = [];
    
    for(let i=1; i<=count; i++) {
        vectors.push(createVector(i, min, max, getRandomInt(30, 100), radius));
    }

    return vectors;
}