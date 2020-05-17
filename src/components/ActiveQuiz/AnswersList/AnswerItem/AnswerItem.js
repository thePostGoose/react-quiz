import React from "react";
import classes from "./AnswerItem.module.scss";
import { onAnswerClickHandlerContext } from "../../../../containers/quiz/Quiz";

const AnswerItem = (props) => {
  return (
    <onAnswerClickHandlerContext.Consumer>
      {([onAnswerClick, userAnswer]) => {
        let liClasses = [classes.AnswerItem];

        let state = userAnswer ? userAnswer[props.answer.id] : null;
        if (state) {
          liClasses.push(classes[state]);
        }

        return (
          <li
            className={liClasses.join(" ")}
            onClick={() => {
              onAnswerClick(props.answer.id);
            }}
          >
            {props.answer.text}
          </li>
        );
      }}
    </onAnswerClickHandlerContext.Consumer>
  );
};

export default AnswerItem;
