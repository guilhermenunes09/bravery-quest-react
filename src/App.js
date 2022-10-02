import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Questions } from './questions/Questions'
import { QuestionsShow } from './questions/QuestionsShow'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        Teste
        <NavBar />
        <Router>
          <Routes>
            <Route path="/question/:questionId" exact element={<QuestionsShow/>} />
            <Route path="/" exact element={<Questions/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
