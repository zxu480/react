import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import Calculator from './components/Calculator/Calculator';

function App() {
  return (
    <div className="App">
        <Calendar />
          
        <Calculator/>
    </div>
  );
}

export default App;
