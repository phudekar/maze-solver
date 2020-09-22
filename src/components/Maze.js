import React from 'react';

const Maze = ({ maze }) => {

    return (
        <div className="maze">
            {maze.map((line, i) => <div key={`line-${i}`} className="row">
                {line.map((block, j) => <Block block={block} key={`block-${i}-${j}`} />)}
            </div>)
            }
        </div>
    )
}

const Block = ({ block }) => {
    const blockClass = Object.keys(block.walls).filter(k => block.walls[k]).join(" ");
    return (
        <div className="block" >
            <div className={blockClass} />
        </div>
    )
}

export default Maze;