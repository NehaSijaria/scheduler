import React from "react";
import classNames from "classnames";
import "components/Button.scss";
import { actions } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
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
