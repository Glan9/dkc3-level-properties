import { React, useState, useEffect } from 'react';

import BGMPicker from './BGMPicker';
import ParrotToggle from './ParrotToggle';
import KoinToggle from './KoinToggle';

import { levels } from './constants';
import { readLittleEndianBytes, createLittleEndianBytes } from './helpers';

export default function WaterExit(props){
  const [ values, setValues ] = useState({
    address: 0,
    bgm: 0,
    start_param: 0,
    start_x: 0,
    start_y: 0,
    parrot: 0,
    koin: 0
  });

  const updateValue = function(offset, newValue, length){
    props.updateBlob(values.address + offset, createLittleEndianBytes(newValue, length));
  };

  useEffect(() => {
    const address = parseInt(levels[props.level].address, 16);
    setValues({
      address: address,
      bgm: readLittleEndianBytes(props.blob, address + 2, 1),
      start_param: readLittleEndianBytes(props.blob, address + 15, 1),
      start_x: readLittleEndianBytes(props.blob, address + 16, 2) - 256,
      start_y: readLittleEndianBytes(props.blob, address + 18, 2) - 256,
      parrot: (readLittleEndianBytes(props.blob, address + 13, 1) & 16) >> 4,
      koin: (readLittleEndianBytes(props.blob, address + 14, 1) & 16) >> 4
    });
  }, [props.level, props.blob])

  return (
    <div className="level-box">
      <div className="music-box">
        <span>Music </span>
        <BGMPicker value={values.bgm} onChange={newValue => updateValue(2, newValue, 1)} />
      </div>
      <ParrotToggle value={values.parrot} onClick={() => updateValue(13, readLittleEndianBytes(props.blob, values.address + 13, 1) ^ 16, 1)} />
      <KoinToggle value={values.koin} onClick={() => updateValue(14, readLittleEndianBytes(props.blob, values.address + 14, 1) ^ 16, 1)} />
      <section className="coords-editor">
        <div className="coords-group start">
          <h3>Level Start</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.start_param} onChange={(evt) => updateValue(15, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.start_x} onChange={(evt) => updateValue(16, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.start_y} onChange={(evt) => updateValue(18, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
      </section>
    </div>
  );
}