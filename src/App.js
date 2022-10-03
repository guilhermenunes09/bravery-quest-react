import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { QuestionsShow } from "./questions/QuestionsShow"
import { QuestionsCreate } from "./questions/QuestionsCreate";
import { Questions } from "./questions/Questions"


function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        New Question
        <NavBar />
        <br />
          <div className="main-container">
            <div className="col-span-full lg:col-span-3">
              { location.pathname !== "/questions/new" &&
                <Link to="/questions/new" class="button-new-question">
                  New Question
                </Link>
              }
            </div>
            <div className="col-span-full lg:col-span-1">
              
            </div>
            <div className="col-span-full lg:col-span-1">
              <Routes>
                <Route path="/questions/:questionId" exact element={<QuestionsShow/>} />
                <Route path="/questions/new" exact element={<QuestionsCreate />} />
                <Route path="/questions" exact element={<Questions/>} />
                <Route path="/" exact element={<Questions/>} />
              </Routes>
            </div>
            <div className="col-span-full lg:col-span-1">
              
            </div>
          </div>
      </header>
    </div>
  );
}

export default App;
