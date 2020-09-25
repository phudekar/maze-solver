import { Walls } from "./block";

export const clearMaze = (maze) => {
    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze.length; column++) {
            if (maze[row][column])
                maze[row][column].highlight = false;
        }
    }
    return maze;
}

export const findPath = (maze, from, to) => {
    console.time("findPath");
    const nodes = maze.map(row => row.map(block => ({ block, coveredDistance: 0 })));
    let candidates = [nodes[from.row][from.column]];
    const visited = [];
    const path = [];
    while (true) {
        const current = candidates.pop();
        if (!current)
            break;

        const currentBlock = current.block;
        current.visited = true;
        visited.push(currentBlock);

        if (currentBlock.row === to.row && currentBlock.column === to.column) {
            let node = current;
            do {
                path.push(node.block);
                node = node.previous;
            } while (node)
            break;
        }

        const connectedNeighbors = Object.keys(currentBlock.walls)
            .filter(k => currentBlock.walls[k] === false)
            .map(w => getNeighborFromWall(w, nodes, currentBlock.row, currentBlock.column))
            .filter(n => !n.visited)
            .map(n => {
                n.coveredDistance = current.coveredDistance + 1;
                n.estimatedDistance = getEstimatedDistanceTo(n.block, to);
                n.previous = current;
                return n
            })


        candidates = candidates.concat(connectedNeighbors)
            .sort((a, b) => (a.coveredDistance + a.estimatedDistance) > (b.coveredDistance + b.estimatedDistance)
                ? -1 : ((a.coveredDistance + a.estimatedDistance) < (b.coveredDistance + b.estimatedDistance)
                    ? 1 : 0));
    }
    console.timeEnd("findPath");
    return { visited, path };
}

export const getEstimatedDistanceTo = (a, b) => Math.sqrt(Math.pow(b.row - a.row, 2) + Math.pow(b.column - a.column, 2));

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
