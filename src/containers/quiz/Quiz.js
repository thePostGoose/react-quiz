import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export const onAnswerClickHandlerContext = React.createContext();
export const retryHandlerContext = React.createContext();

export class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    userAnswer: null,
    quiz: [
      {
        id: 1,
        rightAnswerId: 2,
        question: "Каков ответ, на вопрос Жизни, Вселенной и Всего Остального?",
        answers: [
          { text: "Аминь", id: 1 },
          { text: "42", id: 2 },
          { text: "Глорзо -- это мир, мир -- это Глорзо", id: 3 },
          { text: "Владимир Путин", id: 4 },
        ],
      },
      {
        id: 2,
        rightAnswerId: 1,
        question: "Ave Maria!",
        answers: [
          { text: "Deus vult!", id: 1 },
          { text: "Das ist gut!", id: 2 },
          { text: "Dusin knut!", id: 3 },
          { text: "Ava Dakedavra!", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.userAnswer) {
      const key = Object.keys(this.state.userAnswer)[0];
      if (this.state.userAnswer[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[this.state.activeQuestion]) {
        results[this.state.activeQuestion] = "success";
      }
      this.setState({
        userAnswer: { [answerId]: "success" },
        results,
      });
      const timeout = setTimeout(() => {
        if (this.state.activeQuestion === this.state.quiz.length - 1) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            userAnswer: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[this.state.activeQuestion] = "failure";
      this.setState({
        userAnswer: { [answerId]: "failure" },
        results,
      });
    }
  };

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      userAnswer: null,
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          {this.state.isFinished ? (
            <retryHandlerContext.Provider value={this.retryHandler}>
              <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
              />
            </retryHandlerContext.Provider>
          ) : (
            <onAnswerClickHandlerContext.Provider
              value={[this.onAnswerClickHandler, this.state.userAnswer]}
            >
              <h1>Ответьте на все вопросы</h1>
              <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                quizLength={this.state.quiz.length}
                questionNumber={this.state.activeQuestion + 1}
              />
            </onAnswerClickHandlerContext.Provider>
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
