import React, { useEffect, useRef, useState } from 'react';
import { findPath } from '../lib/mazeTraversal';
import { Walls } from '../lib/block';

const Maze = ({ maze, showVisited }) => {
    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [canvasImage, setCanvasImage] = useState(null);

    const canvasRef = useRef(null)

    const clear = () => {
        setStart(null);
        setEnd(null);
        setVisited([]);
        setPath([]);
    }

    const size = 20;

    const fillBlock = (ctx, color, block) => {
        ctx.fillStyle = color;
        ctx.fillRect(block.column * size, block.row * size, size, size)
    }

    const drawMaze = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        maze.forEach(r => {
            r.forEach(n => {
                const origin = { x: n.column * size, y: n.row * size }
                ctx.beginPath();
                if (n.walls[Walls.LEFT]) {
                    ctx.moveTo(origin.x, origin.y);
                    ctx.lineTo(origin.x, origin.y + size);
                }
                if (n.walls[Walls.RIGHT]) {
                    ctx.moveTo(origin.x + size, origin.y);
                    ctx.lineTo(origin.x + size, origin.y + size);
                }
                if (n.walls[Walls.TOP]) {
                    ctx.moveTo(origin.x, origin.y);
                    ctx.lineTo(origin.x + size, origin.y);
                }
                if (n.walls[Walls.BOTTOM]) {
                    ctx.moveTo(origin.x, origin.y + size);
                    ctx.lineTo(origin.x + size, origin.y + size);
                }
                ctx.stroke();
            })
        });
        const img = new Image();
        img.src = canvas.toDataURL("image/png");
        setCanvasImage(img);
    }

    useEffect(() => {
        clear();
        drawMaze();
    }, [maze])

    useEffect(() => {
        console.time("rendering")
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (end)
            fillBlock(ctx, 'red', end);

        showVisited && visited.forEach(n => {
            fillBlock(ctx, 'lightskyblue', n);
        })
        path.forEach(n => {
            fillBlock(ctx, 'pink', n);
        })
        if (start)
            fillBlock(ctx, 'green', start);
        if (end)
            fillBlock(ctx, 'red', end);

        if (canvasImage) {
            ctx.drawImage(canvasImage, 0, 0)
        }
        // drawMaze();
        console.timeEnd("rendering")

    }, [start, end, path])

    const setStartPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const column = parseInt((event.clientX - rect.x) / 20);
        const row = parseInt((event.clientY - rect.y) / 20);
        clear();
        setStart({ row, column });
    }

    const setEndPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const column = parseInt((event.clientX - rect.x) / 20);
        const row = parseInt((event.clientY - rect.y) / 20);
        if (start && start.row !== row && start.column !== column) {
            setEnd({ row, column });
            const result = findPath(maze, start, { row, column });
            setVisited(result.visited);
            setPath(result.path);
        }
    }
    return (
        <div>
            <canvas ref={canvasRef} className="maze"
                width={maze.length * size} height={maze.length * size}
                onClick={setStartPosition}
                onMouseMove={setEndPosition} />
        </div>
    )
}

export default Maze;