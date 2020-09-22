import { Section } from "./sections"
import { getNeighbors, pickOneRandom, getRandomNumber } from './utils';

export const newMaze = (size) => {
    const maze = new Array(size).fill(0)
        .map((_, i) => new Array(size).fill(0).map((_, j) => new Section(i, j)));
    let candidates = [maze[getRandomNumber(maze.length)][getRandomNumber(maze.length)]];
    do {
        let current = candidates.pop();
        if (!current)
            break;

        current.markVisited();
        let neighbors = getNeighbors(current.row, current.column, maze);
        const unvisited = neighbors.filter(n => !n.visited);
        let next = pickOneRandom(unvisited);
        if (next) {
            candidates.push(current);
            candidates.push(next);
            current.breakWallWith(next);
        }
    } while (true)

    return maze;
}
