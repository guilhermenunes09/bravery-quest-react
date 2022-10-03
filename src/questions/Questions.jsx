import React, { useState, useEffect } from 'react';
import { instance } from '../services/QuestionsService';

function Questions() {
  const [questions, setQuestions] = useState(0);

  
  useEffect(() => {
    instance.get(`questions`)
    .then(res => {
      setQuestions(res.data)
    })
  },[])

  return (
    <>  
      {questions && questions.map(function(question, id) {
        return (
          <ul>
            <li key={id}>{question.title}</li>
            <li>{question.question}</li>
          </ul>
        )
      })}
    </>
  )
}

export { Questions }