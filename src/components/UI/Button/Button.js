import React from "react";
import classes from "./Button.module.scss";
const Button = (props) => {
  const cls = [classes.Button, classes[props.type]];
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls.join(' ')}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
