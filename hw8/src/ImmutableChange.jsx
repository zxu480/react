import React, { memo } from "react";

class ImmutableChange extends React.Component {
  state = {
    id: "001",
    type: "A",
    value: "aaaaa",
    "data:": {},
    path: ["001"],
    children: [
      {
        id: "003",
        type: "A",
        value: "aaaaa",
        "data:": {},
        path: ["001", "003"],
        children: [
          {
            id: "002",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "003", "002"],
            children: [],
          },
        ],
      },
      {
        id: "004",
        type: "A",
        value: "aaaaa",
        "data:": {},
        path: ["001", "004"],
        children: [
          {
            id: "005",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "004", "005"],
            children: [],
          },
          {
            id: "005",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "004", "005"],
            children: [
              {
                id: "002",
                type: "A",
                value: "aaaaa",
                "data:": {},
                path: ["001", "004", "005", "002"],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };

  changeState = () => {
    const state = this.state;
    this.setState({
      ...state,
      children: [
        {
          ...state.children[0],
          children: [
            {
              ...state.children[0].children[0],
              path: [
                ...state.children[0].children[0].path.slice(0, 1),
                "004",
                ...state.children[0].children[0].path.slice(2),
              ],
            },
            ...state.children[0].children.slice(1),
          ],
        },
        {
          ...state.children[1],
          children: [
            state.children[1].children[0],
            {
              ...state.children[1].children[1],
              children: [
                {
                  ...state.children[1].children[1].children[0],
                  path: [
                    ...state.children[1].children[1].children[0].path.slice(
                      0,
                      2
                    ),
                    "006",
                    ...state.children[1].children[1].children[0].path.slice(3),
                  ],
                },
                ...state.children[1].children[1].children.slice(1),
              ],
            },
            ...state.children[1].children.slice(2),
          ],
        },
        ...state.children.slice(2),
      ],
    });
  };

  render() {
    return (
      <>
        <button onClick={() => this.changeState()}>Change State</button>
        <StateRenderer state={this.state} />;
      </>
    );
  }
}

const StateRenderer = memo(({ state }) => {
  console.log(`Id: ${state.id} has been updated`);
  return (
    <div>
      <p>ID: {state.id}</p>
      <p>Type: {state.type}</p>
      <p>Value: {state.value}</p>
      <p>Data: {JSON.stringify(state.data)}</p>
      <p>Path: {state.path?.join(" -> ")}</p>
      <p>Children:</p>
      <ul>
        {state.children.map((child) => (
          <li key={child.id}>
            <StateRenderer state={child} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ImmutableChange;
