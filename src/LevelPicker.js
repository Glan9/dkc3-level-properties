import React from 'react';

import { levels, levelTypes } from './constants';

export default function LevelPicker(props){
  return (
    <select required value={props.value} onChange={(evt) => props.onChange(evt.target.value)}>
      {Object.keys(levels).sort().map(id => {
        return <option value={id} key={id}>{`${id}: ${levels[id].name}`}</option>
      })}
    </select>
  );
}