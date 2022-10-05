import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { QuestionsShow } from "./questions/QuestionsShow"
import { QuestionsCreate } from "./questions/QuestionsCreate";
import { Questions } from "./questions/Questions"


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <br />
          <div className="main-container">
            <div className="col-span-full lg:col-span-4 flex justify-between cursor-pointer">
              { location.pathname !== "/" &&
                <div className="arrow-icon" onClick={handleGoBack}>
                  <svg xmlns="http://www.w3.org/2/000/svg" transform="scale(-1 1)" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 7.289-12-7.289-12z"/></svg>
                </div>
              }
              { location.pathname === "/" &&
                <div />
              }

              <div className="self-right cursor-pointer">
                { location.pathname !== "/questions/new" &&
                  <Link to="/questions/new" class="button-new-question">
                    New Question
                  </Link>
                }
              </div>
            </div>
          
            <div className="col-span-full lg:col-span-1">
              
            </div>

            <div className="col-span-full lg:col-span-2">
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
