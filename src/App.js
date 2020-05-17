import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from './containers/quiz/Quiz'

export class App extends Component {
  render() {
    return (
      <Layout>
        <Quiz></Quiz>
      </Layout>
    );
  }
}

export default App;
