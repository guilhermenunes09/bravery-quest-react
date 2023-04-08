import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { QuestionsShow } from "./questions/QuestionsShow";
import { QuestionsCreate } from "./questions/QuestionsCreate";
import { Questions } from "./questions/Questions";
import { Login } from "./authentication/Login";
import { SignUp } from "./authentication/SignUp";
import { MyAccount } from "./account/MyAccount";
import { NotFoundPage } from "./misc/NotFoundPage";
import LoadingBar from "./components/LoadingBar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  function handleGoBack() {
    navigate(-1)
  }

  return (
    <div className="App">
      <header className="App-header mb-3">
        <NavBar />
        <LoadingBar />
      </header>

      <div className="main-container">
        <div className="flex justify-between cursor-pointer mb-3">
          { location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/login/true" && location.pathname !== "/sign-up" &&
            <div className="arrow-icon" onClick={handleGoBack}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-4.828 11.5l4.608 3.763-.679.737-6.101-5 6.112-5 .666.753-4.604 3.747h11.826v1h-11.828z"/></svg>
            </div>
          }

          { location.pathname === "/" &&
            <div></div>
          }
          
          <div className="self-right cursor-pointer">
            { location.pathname !== "/questions/new" && location.pathname !== "/login" && location.pathname !== "/login/true" && location.pathname !== "/sign-up" &&
              <Link to="/questions/new" className="button-new-question">
                New Question
              </Link>
            }
          </div>
        </div>
        <div className="flex justify-center">
          <div className="md:grow-0">
            <div className="card-menu-category hidden"> 
              REACT
            </div>
          </div>

          <div className={ location.pathname !== '/login' && location.pathname !== '/sign-up' ? `grow content-center` : ``}>
            <Routes>
              <Route path="/questions/:questionId" exact element={<QuestionsShow/>} />
              <Route path="/questions/new" exact element={<QuestionsCreate />} />
              <Route path="/questions" exact element={<Questions/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/login/:goback" element={<Login/>} />
              <Route path="/sign-up" exact element={<SignUp/>} />
              <Route path="/my-account" exact element={<MyAccount/>} />
              <Route path="/" exact element={<Questions/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          <div className="md:grow-0">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
