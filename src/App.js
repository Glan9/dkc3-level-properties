import './App.css';
import React, { useState, useEffect } from 'react';

import LevelPicker from './LevelPicker';
import Level from './Level';
import Bonus from './Bonus';

import { levels, levelTypes } from './constants';

function App() {
  const [ rom, setRom ] = useState({path: "", file: null});
  const [ blob, setBlob ] = useState("");
  const [ level, setLevel ] = useState("1A");

  let buffer = undefined;

  const updateBlob = function(index, newBytes){
    setBlob(prev => prev.slice(0, index) + newBytes + prev.slice(index + newBytes.length));
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setBlob(reader.result);
    
    if (rom.file){
      reader.readAsBinaryString(rom.file);
    }
  }, [rom]);

  return (
    <div className="App">
      <h1>DKC3 Level Properties Editor</h1>
      <p>I can only guarantee this is compatible with the US version of the game. I CANNOT guarantee this tool is without bugs. Make a backup before using this!</p>
      <p>Select your ROM file: <input type="file" id="rom-input" value={rom.path} onChange={event => setRom({path: event.target.value, file: event.target.files[0]})} /></p>

      {blob && <LevelPicker value={level} onChange={setLevel}/>}
      {blob && levels[level].type === 1 && <Level blob={blob} level={level} updateBlob={updateBlob} />}
      {blob && levels[level].type === 2 && <Bonus blob={blob} level={level} updateBlob={updateBlob} />}
    </div>
  );
}

export default App;
