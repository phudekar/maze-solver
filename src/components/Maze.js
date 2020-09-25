import React, { useEffect, useState } from 'react';
import { findPath } from '../lib/mazeTraversal';
import classnames from 'classnames';

const Maze = ({ maze, showVisited }) => {
    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const clear = () => {
        setStart(null);
        setEnd(null);
        setVisited([]);
        setPath([]);
    }

    useEffect(() => {
        clear();
    }, [maze])

    // console.time("Render");
    const mazeDom = (
        <div className="maze">
            {maze && maze.map((line, i) => <div key={`line-${i}`} className="row">
                {line.map((block, j) =>
                    <Block block={block} key={`block-${i}-${j}`}
                        highlight={showVisited && visited.indexOf(block) >= 0}
                        path={path.indexOf(block) >= 0}
                        start={start && block.row === start.row && block.column === start.column}
                        end={end && block.row === end.row && block.column === end.column}
                        onClick={() => {
                            clear();
                            setStart({ row: i, column: j });
                        }}

                        onMouseOver={() => {
                            if (start && start.row !== i && start.column !== j) {
                                setEnd({ row: i, column: j });
                                const result = findPath(maze, start, { row: i, column: j });
                                setVisited(result.visited);
                                setPath(result.path);
                            }
                        }} />
                )}
            </div>)
            }
        </div>
    )

    // console.timeEnd("Render");
    return mazeDom;
}

const Block = ({ block, onClick, highlight, path, start, end, onMouseOver }) => {
    const blockClass = Object.keys(block.walls).filter(k => block.walls[k]).join(" ");
    return (
        <div className={`block ${classnames({ highlight, path, start, end })}`}
            onClick={onClick} onMouseOver={onMouseOver} >
            <div className={blockClass} />
        </div>
    )
}

export default Maze;