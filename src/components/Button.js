import React from "react";

import "components/Button.scss";
import { actions } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  } 
  if (props.danger) {
     buttonClass += " button--danger";
  }

  return (
   <button
     className={buttonClass}
     onClick={props.onClick}
     disabled={props.disabled}
   >
     {props.children}
   </button>
 );
}
