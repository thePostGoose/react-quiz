import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import { createControl } from "../../form/formFramework";

function createOptionControl(optionNumber) {
  return createControl(
    {
      label: `Вариант ${optionNumber}`,
      errorMessage: "Значение не может быть пустым",
      id: optionNumber,
    },
    {
      required: true,
    }
  );
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: {
      question: createControl(
        {
          label: "Введите вопрос",
          errorMessage: "Вопрос не может быть пустым",
        },
        {
          required: true,
        }
      ),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4),
    },
  };

  submitHandler = (event) => {
    event.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание тестов</h1>

          <form onSubmit={this.submitHandler}>
            <input type="text" />
            <hr />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />

            <select name="" id=""></select>

            <Button onClick={this.addQuestionHandler}>Добавить вопрос</Button>
            <Button type={"success"} onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
