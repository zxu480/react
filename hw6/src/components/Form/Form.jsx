import React from "react";
import ListItem from "../ListItem/ListItem";
import API from "../../api";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      todos: [],
    };
    this.updateData();
  }

  updateData = () => {
    API.getTodos().then((data) => this.setState({ todos: data }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    API.postTodo({ content: this.state.inputValue }).then(() =>
      this.updateData()
    );
    this.setState({ inputValue: '' });
  };

  handleDelete = (id) => {
    API.deleteTodo(id).then(() => this.updateData());
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            class="todo-input"
            value={this.state.inputValue}
            onChange={(event) =>
              this.setState({ inputValue: event.target.value })
            }
          />
          <button class="submit-btn" type="submit">
            submit
          </button>
        </form>
        <div class="todolist-container">
          <ul>
            {this.state.todos.map(({ id, content }) => (
              <ListItem
                key={id}
                id={id}
                content={content}
                handleDelete={this.handleDelete}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Form;
