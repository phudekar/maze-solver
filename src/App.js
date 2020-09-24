import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import { Block } from './lib/block';
import { newMaze } from './lib/mazeGenerator';

function App() {
  const [maze, setMaze] = useState(null);
  const sizeInput = useRef();
  useEffect(() => {
    // const debugMaze = [[
    //   { "_walls": { "left": true, "right": false, "bottom": true, "top": true }, "_row": 0, "_column": 0, },
    //   { "_walls": { "left": false, "right": false, "bottom": true, "top": true }, "_row": 0, "_column": 1, },
    //   { "_walls": { "left": false, "right": false, "bottom": true, "top": true }, "_row": 0, "_column": 2, },
    //   { "_walls": { "left": false, "right": true, "bottom": false, "top": true }, "_row": 0, "_column": 3, },
    //   { "_walls": { "left": true, "right": true, "bottom": false, "top": true }, "_row": 0, "_column": 4, }],

    // [
    //   { "_walls": { "left": true, "right": false, "bottom": false, "top": true }, "_row": 1, "_column": 0, },
    //   { "_walls": { "left": false, "right": false, "bottom": true, "top": true }, "_row": 1, "_column": 1, },
    //   { "_walls": { "left": false, "right": true, "bottom": true, "top": true }, "_row": 1, "_column": 2, },
    //   { "_walls": { "left": true, "right": false, "bottom": true, "top": false }, "_row": 1, "_column": 3, },
    //   { "_walls": { "left": false, "right": true, "bottom": false, "top": false }, "_row": 1, "_column": 4, }],

    // [
    //   { "_walls": { "left": true, "right": true, "bottom": false, "top": false }, "_row": 2, "_column": 0, },
    //   { "_walls": { "left": true, "right": false, "bottom": false, "top": true }, "_row": 2, "_column": 1, },
    //   { "_walls": { "left": false, "right": false, "bottom": false, "top": true }, "_row": 2, "_column": 2, },
    //   { "_walls": { "left": false, "right": true, "bottom": true, "top": true }, "_row": 2, "_column": 3, },
    //   { "_walls": { "left": true, "right": true, "bottom": false, "top": false }, "_row": 2, "_column": 4, }],

    // [
    //   { "_walls": { "left": true, "right": false, "bottom": false, "top": false }, "_row": 3, "_column": 0, },
    //   { "_walls": { "left": false, "right": true, "bottom": true, "top": false }, "_row": 3, "_column": 1, },
    //   { "_walls": { "left": true, "right": false, "bottom": true, "top": false }, "_row": 3, "_column": 2, },
    //   { "_walls": { "left": false, "right": true, "bottom": false, "top": true }, "_row": 3, "_column": 3, },
    //   { "_walls": { "left": true, "right": true, "bottom": false, "top": false }, "_row": 3, "_column": 4, }],

    // [
    //   { "_walls": { "left": true, "right": false, "bottom": true, "top": false }, "_row": 4, "_column": 0, },
    //   { "_walls": { "left": false, "right": false, "bottom": true, "top": true }, "_row": 4, "_column": 1, },
    //   { "_walls": { "left": false, "right": true, "bottom": true, "top": true }, "_row": 4, "_column": 2, },
    //   { "_walls": { "left": true, "right": false, "bottom": true, "top": false }, "_row": 4, "_column": 3, },
    //   { "_walls": { "left": false, "right": true, "bottom": true, "top": false }, "_row": 4, "_column": 4, }
    // ]]
    // setMaze(debugMaze.map(r => r.map(c => new Block(c._row, c._column, c._walls))))
    setMaze(newMaze(20));
  }, [])
  return (
    <div className="App">
      <div style={{ textAlign: 'left', margin: 20 }}>
        Maze Size: <input ref={sizeInput} />
        <button onClick={() => {
          if (parseInt(sizeInput.current.value))
            setMaze(newMaze(parseInt(sizeInput.current.value)))
        }}>Generate</button>
      </div>
      { maze && <Maze maze={maze} />}
    </div>
  );
}

export default App;
