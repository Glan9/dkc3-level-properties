import React from 'react';

import { levels, levelTypes } from './constants';

export default function LevelPicker(props){
  return (
    <select required value={props.value} onChange={(evt) => props.onChange(evt.target.value)}>
      {levels.map(level => {
        return <option value={level.id} key={level.id}>{`${level.id}: ${level.name}`}</option>
      })}
    </select>
  );
}