const { newMaze, isTopWallClosed, isBottomWallClosed } = require("./mazeGenerator");
const { Block, Walls } = require("./block");

describe('Maze Generator', () => {
    it('should generate random maze with given size', () => {
        const size = 5;
        const maze = newMaze(size);
        expect(maze.length).toBe(size);
        expect(maze[0].length).toBe(size);
        expect(maze[1].length).toBe(size);
    })

    it('should return true if top wall is closed', () => {
        const maze = [
            [0, new Block(), 0],
            [0, 0, 0],
            [0, 0, 0],

        ]
        expect(isTopWallClosed(1, 1, maze)).toBe(true);
    })

    it('should return false if top wall is not closed', () => {
        const maze = [
            [0, new Block({ [Walls.BOTTOM]: false }), 0],
            [0, 0, 0],
            [0, 0, 0],

        ]
        expect(isTopWallClosed(1, 1, maze)).toBe(false);
    })

    it('should return true if bottom wall is closed', () => {
        const maze = [
            [0, 0, 0],
            [0, 0, 0],
            [0, new Block(), 0]
        ]
        expect(isBottomWallClosed(1, 1, maze)).toBe(true);
    })

    it('should return false if bottom wall is not closed', () => {
        const maze = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],

        ]
        expect(isBottomWallClosed(1, 1, maze)).toBe(false);
    })
})