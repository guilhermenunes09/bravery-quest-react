import React from 'react';
import Questions from './questions/Questions'
import QuestionsShow from './questions/QuestionsShow'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Questions />
        <QuestionsShow />
      </header>
    </div>
  );
}

export default App;
