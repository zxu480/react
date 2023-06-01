import React from "react";
import myMemo from "./myMemo";
import MyPureComponent from "./MyPureComponent";

class Counter extends React.Component {
  render() {
    console.log(this.props.name + " Updated");
    return (
      <>
        <h3>
          {this.props.name} {this.props.counter}
        </h3>
      </>
    );
  }
}

class PureCounter extends MyPureComponent {
  render() {
    console.log(this.props.name + " Updated");
    return (
      <>
        <h3>
          {this.props.name} {this.props.counter}
        </h3>
      </>
    );
  }
}

const MemoCounter = myMemo(Counter);

export { Counter, PureCounter, MemoCounter };
