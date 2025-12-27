import type { MouseEventHandler } from "react";

export function ButtonCTA({label, disabled, clickEvent}
  :{
  label:string, 
  disabled?:boolean,
  clickEvent?: MouseEventHandler<HTMLButtonElement>})
{
  return (
    <button onClick={clickEvent} disabled={disabled} className="bg-accent-lm hover:bg-hover-btn-lm transition text-primary-lm text-base font-medium px-4 py-2 rounded-lg cursor-pointer">{label}</button>
  );
}