import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { QuestionsShow } from "./questions/QuestionsShow"
import { QuestionsCreate } from "./questions/QuestionsCreate";
import { Questions } from "./questions/Questions"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Teste
        <NavBar />
        <div className="main-container">
          <Router>
            <Routes>
              <Route path="/questions/:questionId" exact element={<QuestionsShow/>} />
              <Route path="/questions/new" exact element={<QuestionsCreate />} />
              <Route path="/" exact element={<Questions/>} />
            </Routes>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
