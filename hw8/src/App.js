import './App.css';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import { Counter, PureCounter, MemoCounter } from './Demo';
import ImmutableChange from './ImmutableChange';


function App() {

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  return (
    <Provider store={store}>
      <div className='App'>
        <div>
          <h1> 1. React.memo and PureComponent </h1>
          <div>
            <button onClick={() => setCounter1(counter1 + 1)}>Add DefaultCounter</button>
            <button onClick={() => setCounter2(counter2 + 1)}>Add DefaultCounter</button>
            <button onClick={() => setCounter3(counter3 + 1)}>Add DefaultCounter</button>
            <button></button>
            <button></button>
          </div>
          <Counter name="Default Counter" counter={counter1}/>
          <PureCounter name="Pure Counter" counter={counter2}/>
          <MemoCounter name="Memo Counter" counter={counter3}/>
        </div>
        <div>
          <h1> 2. Immutable Change </h1>
          <ImmutableChange/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
