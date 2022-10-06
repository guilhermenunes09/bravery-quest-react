import React, { useState, useEffect } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from "react-router-dom";

function Questions() {
  const [questions, setQuestions] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    instance.get(`questions`)
    .then(res => {
      setQuestions(res.data)
    })
  },[])

  function handleClick(questionId) {
    console.log('what object', questionId)
    navigate(`/questions/${questionId}`)
  }

  return (
    <>  
      {questions && questions.map(function(question, id) {
        return (
          <div className='card-sm' onClick={() => handleClick(question.id)}>
            <div className='link-index' key={id}>{question.title}</div>
          </div>
        )
      })}
    </>
  )
}

export { Questions }