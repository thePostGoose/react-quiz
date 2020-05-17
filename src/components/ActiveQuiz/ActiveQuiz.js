import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";
const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.question}>
        <span className={classes["question-wrapper"]}>
          <strong>{props.questionNumber + ") "}</strong>
          {props.question}
        </span>
        <small className={classes["question-counter"]}>
          {props.questionNumber} из {props.quizLength}
        </small>
      </p>

      <AnswersList answers={props.answers} />
    </div>
  );
};

export default ActiveQuiz;
