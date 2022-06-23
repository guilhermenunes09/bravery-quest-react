import React from 'react';
import NavBar from './components/NavBar';
import Questions from './questions/Questions'
import QuestionsShow from './questions/QuestionsShow'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Questions />
        <QuestionsShow />
      </header>
    </div>
  );
}

export default App;
