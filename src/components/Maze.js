import React from 'react';

const Maze = ({ maze }) => {

    return (
        <div className="maze">
            {maze.map((line, i) => <div key={`line-${i}`} className="row">
                {line.map((section, j) =>
                    <div className="section" key={`section-${i}-${j}`}>
                        <div className={section} />
                    </div>
                )}
            </div>)
            }
        </div>
    )
}

export default Maze;