import { SectionTypes } from "./sections"


const sections = Object.keys(SectionTypes);

export const newMaze = (size) => {
    const maze = new Array(size).fill(0)
        .map(_ => new Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            maze[i][j] = getSection(i, j, size, maze);
        }
    }
    return maze;
}

const getSection = (i, j, size, maze) => {
    if (i === 0 && j == 0)
        return SectionTypes.TOP_LEFT;

    if (i === 0 && j == size - 1)
        return SectionTypes.TOP_RIGHT;

    if (i === size - 1 && j == 0)
        return SectionTypes.BOTTOM_LEFT;

    if (i === size - 1 && j == size - 1)
        return SectionTypes.BOTTOM_RIGHT;

    if (i === 0)
        return SectionTypes.TOP_WALL;

    if (i === size - 1)
        return SectionTypes.BOTTOM_WALL;

    if (j === 0)
        return SectionTypes.LEFT_WALL;

    if (j === size - 1)
        return SectionTypes.RIGHT_WALL;

    const r = Math.random();
    if (j == 0 && j < size - 1 &&
        (maze[i][j - 1] === SectionTypes.LEFT_WALL || maze[i][j - 1] === SectionTypes.RIGHT_WALL))
        return SectionTypes.SPACE;

    return SectionTypes[sections[Math.floor(r * sections.length)]];
}
