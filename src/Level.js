import { React, useState, useEffect } from 'react';

import BGMPicker from './BGMPicker';
import ParrotToggle from './ParrotToggle';
import KoinToggle from './KoinToggle';

import { levels } from './constants';
import { readLittleEndianBytes, createLittleEndianBytes } from './helpers';

export default function Level(props){
  const [ values, setValues ] = useState({
    address: 0,
    bgm: 0,
    start_param: 0,
    start_x: 0,
    start_y: 0,
    mid_param: 0,
    mid_x: 0,
    mid_y: 0,
    b1_param: 0,
    b1_x: 0,
    b1_y: 0,
    b2_param: 0,
    b2_x: 0,
    b2_y: 0,
    b3_param: 0,
    b3_x: 0,
    b3_y: 0,
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
      mid_param: readLittleEndianBytes(props.blob, address + 20, 1),
      mid_x: readLittleEndianBytes(props.blob, address + 21, 2) - 256,
      mid_y: readLittleEndianBytes(props.blob, address + 23, 2) - 256,
      b1_param: readLittleEndianBytes(props.blob, address + 25, 1),
      b1_x: readLittleEndianBytes(props.blob, address + 26, 2) - 256,
      b1_y: readLittleEndianBytes(props.blob, address + 28, 2) - 256,
      b2_param: readLittleEndianBytes(props.blob, address + 30, 1),
      b2_x: readLittleEndianBytes(props.blob, address + 31, 2) - 256,
      b2_y: readLittleEndianBytes(props.blob, address + 33, 2) - 256,
      b3_param: readLittleEndianBytes(props.blob, address + 35, 1),
      b3_x: readLittleEndianBytes(props.blob, address + 36, 2) - 256,
      b3_y: readLittleEndianBytes(props.blob, address + 38, 2) - 256,
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
        <div className="coords-group midpoint">
          <h3>Midpoint Start</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.mid_param} onChange={(evt) => updateValue(20, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.mid_x} onChange={(evt) => updateValue(21, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.mid_y} onChange={(evt) => updateValue(23, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
        <div className="coords-group bonus1">
          <h3>Bonus 1 Exit</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.b1_param} onChange={(evt) => updateValue(25, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.b1_x} onChange={(evt) => updateValue(26, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.b1_y} onChange={(evt) => updateValue(28, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
        <div className="coords-group bonus2">
          <h3>Bonus 2 Exit</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.b2_param} onChange={(evt) => updateValue(30, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.b2_x} onChange={(evt) => updateValue(31, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.b2_y} onChange={(evt) => updateValue(33, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
        <div className="coords-group bonus3">
          <h3>Bonus 3/Warp Exit</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.b3_param} onChange={(evt) => updateValue(35, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.b3_x} onChange={(evt) => updateValue(36, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.b3_y} onChange={(evt) => updateValue(38, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
      </section>
    </div>
  );
}