import { Walls } from "./sections";


export const clearMaze = (maze) => {
    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze.length; column++) {
            if (maze[row][column])
                maze[row][column].highlight = false;
        }
    }
    return maze;
}

export const highLightPath = (maze, from, to) => {
    const nodes = [maze[from.row][from.column]];
    while (true) {
        const current = nodes.pop();

        if (!current)
            break;
        current.highlight = true;

        if (current.row === to.row && current.column === to.column)
            break;

        const connectedNeighbors = Object.keys(current.walls)
            .filter(k => current.walls[k] === false)
            .map(w => getNeighborFromWall(w, maze, current.row, current.column))
            .filter(n => !n.highlight);

        connectedNeighbors.forEach(n => nodes.push(n));

        if (connectedNeighbors.length === 0) {
            current.highlight = false;
        }
    }
    return maze;
}

export const getNeighborFromWall = (wall, maze, row, column) => {
    switch (wall) {
        case Walls.TOP:
            return maze[row - 1][column];
        case Walls.BOTTOM:
            return maze[row + 1][column];
        case Walls.LEFT:
            return maze[row][column - 1];
        default:
            return maze[row][column + 1];
    }
}
