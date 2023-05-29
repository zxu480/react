import React from "react";
import { getTodos } from "../api/TodoApi";

export const withTodos = (Component) => {
  return class NewComponent extends React.Component {
    state = {
      todos: [],
    };
    render() {
      console.log(this.state.todos)
      return <Component todos={this.state.todos} />;
    }

    componentDidMount() {
      getTodos().then((todos) => {
        this.setState({
          todos,
        });
      });
    }
  };
};
