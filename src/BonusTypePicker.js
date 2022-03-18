import React from 'react';

import { bonusTypes } from './constants';

export default function BonusTypePicker(props){
  return (
    <select required value={props.value} onChange={(evt) => props.onChange(parseInt(evt.target.value))}>
      {Object.keys(bonusTypes).sort().map(key => {
        return <option value={key} key={key}>{`${key}: ${bonusTypes[key]}`}</option>
      })}
    </select>
  );
}