export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const pickOneRandom = (arr) => {
    if (arr.length === 0)
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