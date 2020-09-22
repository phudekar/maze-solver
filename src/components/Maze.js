import React, { useEffect, useState } from 'react';
import { clearMaze, highLightPath } from '../lib/mazeTraversal';

const Maze = ({ maze }) => {
    const [decoratedMaze, setDecoratedMaze] = useState(maze);
    const [start, setStart] = useState(null);

    useEffect(() => {
        setDecoratedMaze(maze);
    }, [maze])

    return (
        <div className="maze">
            {decoratedMaze.map((line, i) => <div key={`line-${i}`} className="row">
                {line.map((block, j) =>
                    <Block block={block} key={`block-${i}-${j}`}
                        onClick={() => {
                            if (start) {
                                setDecoratedMaze([].concat(highLightPath(maze, start, { row: i, column: j })))
                                setStart(null);
                            } else {
                                setDecoratedMaze([].concat(clearMaze(decoratedMaze)));
                                setStart({ row: i, column: j });
                            }
                        }} />
                )}
            </div>)
            }
        </div>
    )
}

const Block = ({ block, onClick }) => {
    const blockClass = Object.keys(block.walls).filter(k => block.walls[k]).join(" ");
    return (
        <div className={`block${block.highlight ? ' highlight' : ''}`} onClick={onClick} >
            <div className={blockClass} />
            {/* {block.highlight && <div className="path" />} */}
        </div>
    )
}

export default Maze;