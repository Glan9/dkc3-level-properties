import React from 'react';

export default function ParrotToggle(props){
  return (
    <div className="parrot-box">
      <input type="button" className={(props.value ? "quawks" : "squawks") + " parrot-button"} onClick={props.onClick} />
      <span>{props.value ? "Quawks" : "Squawks"}</span>
    </div>
  );
}