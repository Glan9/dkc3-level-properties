import React from 'react';

import { bgms } from './constants';

export default function BGMPicker(props){
  return (
    <select required value={props.value} onChange={(evt) => props.onChange(evt.target.value)}>
      {Object.keys(bgms).map(key => {
        return <option value={key} key={key}>{`${key.toString(16)}: ${bgms[key]}`}</option>
      })}
    </select>
  );
}