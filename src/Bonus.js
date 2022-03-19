import { React, useState, useEffect } from 'react';

import ParrotToggle from './ParrotToggle';
import BonusTypePicker from './BonusTypePicker';

import { levels } from './constants';
import { readLittleEndianBytes, createLittleEndianBytes } from './helpers';

export default function Bonus(props){
  const [ values, setValues ] = useState({
    address: 0,
    type: 0,
    goal: 0,
    start_param: 0,
    start_x: 0,
    start_y: 0,
    parrot: 0
  });

  const updateValue = function(offset, newValue, length){
    props.updateBlob(values.address + offset, createLittleEndianBytes(newValue, length));
  };

  // The goals are stored such that 0x30 translates to 30 in decimal, 0x31 would be 31, etc.
  // This is strange, but probably done like this so conversion is easier in the game code.
  const goalToDec = function(goal){
    return ((goal >> 4) * 10) + ((goal & 15));
  };

  const decToGoal = function(goal){
    return (goal / 10 << 4) + (goal % 10);
  };

  useEffect(() => {
    const address = parseInt(levels[props.level].address, 16);
    setValues({
      address: address,
      type: readLittleEndianBytes(props.blob, address + 2, 1),
      goal: goalToDec(readLittleEndianBytes(props.blob, address + 3, 1)),
      start_param: readLittleEndianBytes(props.blob, address + 17, 1),
      start_x: readLittleEndianBytes(props.blob, address + 18, 2) - 256,
      start_y: readLittleEndianBytes(props.blob, address + 20, 2) - 256,
      parrot: (readLittleEndianBytes(props.blob, address + 15, 1) & 16) >> 4
    });
  }, [props.level, props.blob])

  return (
    <div className="level-box">
      <div className="bonus-type">
        <div>
          <span>Bonus Type </span>
          <BonusTypePicker value={values.type} onChange={newValue => updateValue(2, newValue, 1)} />
        </div>
        <div>
          <span>Goal Count </span>
          <input type="number" value={values.goal} onChange={(evt) => updateValue(3, decToGoal(evt.target.value), 1)} />
          {values.type === 1 && <span> Note: Goal count should be 1 for Find the Coin bonuses</span>}
        </div>
      </div>
      <ParrotToggle value={values.parrot} onClick={() => updateValue(15, readLittleEndianBytes(props.blob, values.address + 15, 1) ^ 16, 1)} />
      <section className="coords-editor">
        <div className="coords-group start">
          <h3>Level Start</h3>
          <div className="coords-group-line">
            <span>Param</span>
            <input type="number" value={values.start_param} onChange={(evt) => updateValue(15, evt.target.value, 1)} />
          </div>
          <div className="coords-group-line">
            <span>X</span>
            <input type="number" value={values.start_x} onChange={(evt) => updateValue(18, parseInt(evt.target.value)+256, 2)} />
          </div>
          <div className="coords-group-line">
            <span>Y</span>
            <input type="number" value={values.start_y} onChange={(evt) => updateValue(20, parseInt(evt.target.value)+256, 2)} />
          </div>
        </div>
      </section>
    </div>
  );
}