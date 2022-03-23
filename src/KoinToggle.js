import React from 'react';

export default function KoinToggle(props){
  return (
    <div className="koin-box">
      <input type="button" className={(props.value ? "no-stand" : "stand") + " koin-button"} onClick={props.onClick} />
      <span>{props.value ? "Can't stand on Koins" : "Can stand on Koins"}</span>
    </div>
  );
}