import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import Calculator from "./components/Calculator/Calculator";
import Carousel from "./components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Calendar />

      {/* <Calculator/> */}
      <Carousel images={null} duration={3000} />
    </div>
  );
}

export default App;
