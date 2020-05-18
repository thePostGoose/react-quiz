import React from "react";
import classes from "./FinishedQuiz.module.scss";
import Button from "../UI/Button/Button";
import { retryHandlerContext } from "../../containers/Quiz/Quiz";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  const quiz = props.quiz,
    results = props.results;
  let successCount = 0;
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
          const icons = [
            "fa",
            results[index] === "failure" ? "fa-times" : "fa-check",
            classes[results[index]],
          ];
          if (results[index] === "success") successCount++;
          return (
            <li key={index}>
              <strong>{index + 1 + ". "}</strong>
              {quizItem.question}
              <i className={icons.join(" ")} />
            </li>
          );
        })}
      </ul>

      <div className={classes["text-and-btn-container"]}>
        <p>
          Правильно {successCount} из {quiz.length}
        </p>
        <retryHandlerContext.Consumer>
          {(handler) => {
            return (
              <React.Fragment>
                <Button onClick={handler}>Повторить</Button>
                <Link to='/'>
                  <Button type={"success"}>
                  Перейти в список тестов
                </Button>
                </Link>
              </React.Fragment>
            );
          }}
        </retryHandlerContext.Consumer>
      </div>
    </div>
  );
};

export default FinishedQuiz;
