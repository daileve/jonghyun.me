import { Position } from '../interfaces/vector-interfaces';

export function getRandomInt(from: number, to: number) {
    return Math.round(Math.random() * (to - from)) + from;
}

export function positionsInRadius(pos: Position, another_positions: Position[], radius: number) {
    return another_positions.filter(another_pos => positionIsInRadius(pos, another_pos, radius));
}

export function positionIsInRadius(pos: Position, another_pos: Position, radius: number) {
    const x_min_radius = pos.x - radius;
    const x_max_radius = pos.x + radius;
    const y_min_radius = pos.y - radius;
    const y_max_radius = pos.y + radius;

    return x_min_radius <= another_pos.x && another_pos.x <= x_max_radius && y_min_radius <= another_pos.y && another_pos.y <= y_max_radius;
}