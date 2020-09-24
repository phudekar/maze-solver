import { Block } from "./block"
import { getNeighbors, pickOneRandom, getRandomNumber } from './utils';

export const newMaze = (size) => {
    console.time("maze generation")
    const maze = new Array(size).fill(0)
        .map((_, i) => new Array(size).fill(0).map((_, j) => ({ block: new Block(i, j), visited: false })));
    let candidates = [maze[getRandomNumber(maze.length)][getRandomNumber(maze.length)]];
    do {
        let current = candidates.pop();
        if (!current)
            break;

        current.visited = true;
        const currentBlock = current.block;
        let neighbors = getNeighbors(currentBlock.row, currentBlock.column, maze);
        const unvisited = neighbors.filter(n => !n.visited);
        let next = pickOneRandom(unvisited);
        if (next) {
            candidates.push(current);
            candidates.push(next);
            current.block.breakWallWith(next.block);
        }
    } while (true)
    console.timeEnd("maze generation")

    return maze.map(row => row.map(node => node.block));
}
