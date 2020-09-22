import React, { useRef, useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import { newMaze } from './lib/mazeGenerator';

function App() {
  const [maze, setMaze] = useState(newMaze(20));
  const sizeInput = useRef();
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
