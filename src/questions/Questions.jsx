import React, { useState } from 'react';
import { instance } from '../services/QuestionsService';

function Questions() {

  const [questions, setQuestions] = useState(0);


  function handleClick() {
    console.log("clicked")
    instance.get(`questions`)
    .then(res => {
      console.log('res', res)
      setQuestions(res.data)
    })
  }

  return (
    <>
      Questions
      <div className='cursor-pointer hover:text-blue-600' onClick={handleClick}>
        Click me
        
        {questions && questions.map(function(question, id) {
          return (
            <ul>
              <li key={id}>{question.title}</li>
              <li>{question.question}</li>
            </ul>
          )
        })}

      </div>
    </>
  )
}

export { Questions }