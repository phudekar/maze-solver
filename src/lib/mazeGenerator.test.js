const { newMaze } = require("./mazeGenerator")

describe('Maze Generator', () => {
    it('should generate random maze with given size', () => {
        const size = 5;
        const maze = newMaze(size);
        expect(maze.length).toBe(size);
        expect(maze[0].length).toBe(size);
        expect(maze[1].length).toBe(size);
    })
})