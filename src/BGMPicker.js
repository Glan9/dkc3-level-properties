import React from 'react';

import { bgms } from './constants';

export default function BGMPicker(props){
  return (
    <select required value={props.value} onChange={(evt) => props.onChange(parseInt(evt.target.value))}>
      {Object.keys(bgms).sort().map(key => {
        return <option value={parseInt(key, 16)} key={key}>{`${key}: ${bgms[key]}`}</option>
      })}
    </select>
  );
}