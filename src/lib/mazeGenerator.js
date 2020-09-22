import { Section } from "./sections"


export const newMaze = (size) => {
    const maze = new Array(size).fill(0)
        .map((_, i) => new Array(size).fill(0).map((_, j) => new Section(i, j)));
    let current = null;
    while (true) {
        current = getUnvisited(maze);

        if (!current)
            break;

        if (current.visited)
            continue;

        current.markVisited();
        console.log(current);
        let neighbors = getNeighbors(current.row, current.column, maze)

        while (neighbors.find(n => !n.visited)) {
            const unvisited = neighbors.filter(n => !n.visited);
            const next = pickOneRandom(unvisited);
            current.breakWallWith(next);
            next.markVisited();
            current = next;
            neighbors = getNeighbors(current.row, current.column, maze)
        }

    }

    return maze;
}

const getUnvisited = (maze) => {
    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze.length; column++) {
            if (!maze[row][column].visited)
                return maze[row][column];
        }
    }
    return null;
}

export const pickOneRandom = (arr) => {
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
