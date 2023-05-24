import React from "react";

class ListItem extends React.Component {
  render() {
    console.log(this.props)
    return (
      <li>
        <span>{this.props.content}</span>
        <button
          class="delete-btn"
          onClick={() => this.props.handleDelete(this.props.id)}
        >
          remove
        </button>
      </li>
    );
  }
}

export default ListItem;
