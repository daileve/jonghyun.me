export interface Position {
    x: number;
    y: number;
}

export interface Vector {
    getPos: () => Position;
    getCenterPos: () => Position;
    getVector: () => Position;
    getVectorsInRadius: () => Vector[];
    setVectorsInRadius: (vectors: Vector[]) => void;
    move: () => void;
}