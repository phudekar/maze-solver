import React from 'react';
import './App.css';
import Maze from './components/Maze';
import { newMaze } from './lib/mazeGenerator';

function App() {
  const maze = newMaze(50);
  return (
    <div className="App">
      <Maze maze={maze} />
    </div>
  );
}

export default App;
