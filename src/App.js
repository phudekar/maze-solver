import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import CanvasMaze from './components/CanvasMaze';
import { newMaze } from './lib/mazeGenerator';

function App() {
  const [maze, setMaze] = useState(null);
  const [showVisited, setShowVisited] = useState(false);
  const [renderer, setRenderer] = useState('canvas');

  const sizeInput = useRef();
  useEffect(() => {
    setMaze(newMaze(20));
  }, [])
  return (
    <div className="App">

      <div className="input-group">
        Maze Size: <input ref={sizeInput} />
        <button onClick={() => {
          if (parseInt(sizeInput.current.value) && parseInt(sizeInput.current.value) <= 1000)
            setMaze(newMaze(parseInt(sizeInput.current.value)))
        }}>Generate</button>
      </div>
      <div className="input-group">
        <label>Show visited</label><input type="checkbox" onChange={e => setShowVisited(e.target.checked)} />
      </div>

      <div className="input-group">
        <span>Render method</span>
        <input type="radio" name="renderer"
          checked={renderer === 'canvas'}
          onChange={e => setRenderer('canvas')} />
        <label>Canvas</label>

        <input type="radio" name="renderer"
          checked={renderer === 'dom'}
          onChange={e => setRenderer('dom')} />
        <label>DOM</label>
      </div>

      {
        maze ?
          renderer === 'dom'
            ? <Maze maze={maze} showVisited={showVisited} />
            : <CanvasMaze maze={maze} showVisited={showVisited} />
          : null
      }

    </div >
  );
}

export default App;
