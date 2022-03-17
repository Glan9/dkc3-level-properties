import './App.css';
import React, { useState, useEffect } from 'react';

import BGMPicker from './BGMPicker';
import LevelPicker from './LevelPicker';

import { levels, levelTypes } from './constants';

function App() {
  const [ rom, setRom ] = useState({path: "", file: null});
  const [ blob, setBlob ] = useState("");

  /*const loadRom = function(path, file) {
    const reader = new FileReader();
    reader.onload = () => {console.log(reader.result.slice(0,200));setRom({path, file});};

    reader.readAsBinaryString(file);
  }*/

  //console.log(stages);

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

      {blob && <LevelPicker onChange={(arg)=>console.log(arg)}/>}
    </div>
  );
}

export default App;
