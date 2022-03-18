import './App.css';
import React, { useState, useEffect } from 'react';
import fileDownload from 'js-file-download';

import LevelPicker from './LevelPicker';
import Level from './Level';
import Bonus from './Bonus';
import Boss from './Boss';
import WaterExit from './WaterExit';

import { levels } from './constants';

function App() {
  const [ rom, setRom ] = useState({path: "", file: null});
  const [ blob, setBlob ] = useState("");
  const [ level, setLevel ] = useState("1A");
  const [ outputURL, setOutputURL ] = useState("");

  const updateBlob = function(index, newBytes){
    setBlob(prev => prev.slice(0, index) + newBytes + prev.slice(index + newBytes.length));
  };

  const outputRom = async function(){
    const buffer = new ArrayBuffer(blob.length);
    const data = new Uint8Array(buffer);

    for (let i=0; i<blob.length; i++){
      data[i] = blob.charCodeAt(i);
    }

    const output = new Blob([buffer]);
    console.log(output);

    fileDownload(output, "newrom.sfc");
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
      <p>Also, not all inputs are properly validated. Just don't be dumb and try to change things that don't really make sense.</p>

      <div>Select your ROM file: <input type="file" id="rom-input" value={rom.path} onChange={event => setRom({path: event.target.value, file: event.target.files[0]})} /></div>
      {blob && <input type="button" value="Save new ROM" onClick={outputRom} />}

      <main className="editor">
        {blob && <LevelPicker value={level} onChange={setLevel}/>}
        {blob && levels[level].type === 1 && <Level blob={blob} level={level} updateBlob={updateBlob} />}
        {blob && levels[level].type === 2 && <Bonus blob={blob} level={level} updateBlob={updateBlob} />}
        {blob && levels[level].type === 3 && <Boss blob={blob} level={level} updateBlob={updateBlob} />}
        {blob && levels[level].type === 6 && <WaterExit blob={blob} level={level} updateBlob={updateBlob} />}
      </main>
    </div>
  );
}

export default App;
