import "./Todoitem.css";

import React from "react";

class Todoitem extends React.Component {
  constructor(props) {
    super();
    const { todo } = props;
    this.state = {
      todo,
      editing: false,
      inputValue: todo.content,
    };
  }

  handleEdit = () => {
    if (this.state.editing) {
      this.props.onEdit(this.state.todo, this.state.inputValue);
    }
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { onDelete, onComplete } = this.props;
    const { todo, editing } = this.state;
    return (
      <li className="todoitem">
        {editing ? (
          <input
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
        ) : (
          <span>{todo.content}</span>
        )}
        <button onClick={() => this.handleEdit()}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
        <button onClick={() => onComplete(todo)}>Move</button>
      </li>
    );
  }
}

export default Todoitem;
