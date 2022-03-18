import { React, useState, useEffect } from 'react';

import BGMPicker from './BGMPicker';
import ParrotToggle from './ParrotToggle';

import { levels } from './constants';
import { readLittleEndianBytes, createLittleEndianBytes } from './helpers';

export default function Boss(props){
  const [ values, setValues ] = useState({
    address: 0,
    bgm: 0,
    has_midpoint: false,
    start_param: 0,
    start_x: 0,
    start_y: 0,
    mid_param: 0,
    mid_x: 0,
    mid_y: 0,
    parrot: 0
  });

  const updateValue = function(offset, newValue, length){
    props.updateBlob(values.address + offset, createLittleEndianBytes(newValue, length));
  };

  useEffect(() => {
    const address = parseInt(levels[props.level].address, 16);
    setValues({
      address: address,
      bgm: readLittleEndianBytes(props.blob, address + 2, 1),
      has_midpoint: readLittleEndianBytes(props.blob, address + 20, 3) !== 16777215, // 16777215 = 0xFFFFFF. If 0xFFFFFF is at offset 20 then there's no midpoint coords.
      start_param: readLittleEndianBytes(props.blob, address + 15, 1),
      start_x: readLittleEndianBytes(props.blob, address + 16, 2) - 256,
      start_y: readLittleEndianBytes(props.blob, address + 18, 2) - 256,
      mid_param: readLittleEndianBytes(props.blob, address + 20, 1),
      mid_x: readLittleEndianBytes(props.blob, address + 21, 2) - 256,
      mid_y: readLittleEndianBytes(props.blob, address + 23, 2) - 256,
      parrot: (readLittleEndianBytes(props.blob, address + 13, 1) & 16) >> 4
    });
  }, [props.level, props.blob])

  return (
    <div className="level-box">
      <div className="music-box">
        <span>Music </span>
        <BGMPicker value={values.bgm} onChange={newValue => updateValue(2, newValue, 1)} />
      </div>
      <ParrotToggle value={values.parrot} onClick={() => updateValue(13, readLittleEndianBytes(props.blob, values.address + 13, 1) ^ 16, 1)} />
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
            <input type="number" value={values.mid_param} disabled={!values.has_midpoint} onChange={(evt) => updateValue(20, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.mid_x} disabled={!values.has_midpoint} onChange={(evt) => updateValue(21, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.mid_y} disabled={!values.has_midpoint} onChange={(evt) => updateValue(23, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
      </section>
    </div>
  );
}