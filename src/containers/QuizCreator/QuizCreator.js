import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import axios from "../../axios/axios-quiz";

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
function createFormControls() {
  return {
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
  };
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = (event) => {
    event.preventDefault();
  };
  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const createAnswersItem = (answersCount = 4) => {
      const answers = [];
      for (let i = 0; i < answersCount; i++) {
        answers.push({
          text: this.state.formControls[`option${i + 1}`].value,
          id: this.state.formControls[`option${i + 1}`].id,
        });
      }
      return answers;
    };

    const questionItem = {
      question: this.state.formControls.question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: createAnswersItem(),
    };

    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  createQuizHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "/quizes.json",
        this.state.quiz
      );
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (e) {
      console.log(e);
    }
  };
  selectCangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };
  inputChangeHandler = (value, controlName) => {
    const formControls = JSON.parse(JSON.stringify(this.state.formControls));
    const control = formControls[controlName];

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            validation={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) =>
              this.inputChangeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }
  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onCange={this.selectCangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание тестов</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {select}

            <Button
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              disabled={this.state.quiz.length === 0}
              type={"success"}
              onClick={this.createQuizHandler}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
