import React, { useEffect, useState } from 'react';
import { clearMaze, highlightPath as findPath } from '../lib/mazeTraversal';
import classnames from 'classnames';

const Maze = ({ maze }) => {
    const [decoratedMaze, setDecoratedMaze] = useState(null);
    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const clear = () => {
        setStart(null);
        setEnd(null);
        setVisited([]);
        setPath([]);
        decoratedMaze && setDecoratedMaze([].concat(clearMaze(decoratedMaze)));
    }

    useEffect(() => {
        clear();
        setDecoratedMaze(maze);
    }, [maze])

    // console.time("Render");
    const mazeDom = (
        <div className="maze">
            {decoratedMaze && decoratedMaze.map((line, i) => <div key={`line-${i}`} className="row">
                {line.map((block, j) =>
                    <Block block={block} key={`block-${i}-${j}`}
                        highlight={visited.indexOf(block) >= 0}
                        path={path.indexOf(block) >= 0}
                        start={start && block.row == start.row && block.column === start.column}
                        end={end && block.row == end.row && block.column === end.column}

                        onClick={() => {
                            if (start && end) {
                                clear();
                                setStart({ row: i, column: j });
                            }else if (start) {
                                setEnd({ row: i, column: j });
                                const result = findPath(maze, start, { row: i, column: j });
                                setVisited(result.visited);
                                setPath(result.path);
                            } else {
                                setStart({ row: i, column: j });
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

const Block = ({ block, onClick, highlight, path, start, end }) => {
    const blockClass = Object.keys(block.walls).filter(k => block.walls[k]).join(" ");
    return (
        <div className={`block ${classnames({ highlight, path, start, end })}`}
            onClick={onClick} >
            <div className={blockClass} />
        </div>
    )
}

export default Maze;