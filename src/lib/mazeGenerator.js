import { Section, Walls } from "./sections"


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

export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const pickOneRandom = (arr) => {
    if (arr.length == 0)
        return null;
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

export const getNeighbors = (i, j, maze) => {
    const neighbors = [
        { row: i - 1, column: j },
        { row: i, column: j - 1 },
        { row: i, column: j + 1 },
        { row: i + 1, column: j },
    ];

    return neighbors.filter(({ row, column }) =>
        row >= 0 && row < maze.length && column >= 0 && column < maze.length)
        .map(({ row, column }) => maze[row][column])
        .filter(x => x);
}
