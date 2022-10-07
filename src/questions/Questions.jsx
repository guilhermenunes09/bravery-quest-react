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
    navigate(`/questions/${questionId}`)
  }

  function stripTags(question) {
    const text = question.replace(/(<([^>]+)>)/ig, '');
    return text;
  }

  return (
    <>  
      {questions && questions.map(function(question, id) {
        return (
          <div className='card-sm' onClick={() => handleClick(question.id)}>
            <div className='link-index' key={id}>{question.title}</div>
            <div className='text-gray-400 text-sm'>{stripTags(question.question)}</div>
          </div>
        )
      })}
    </>
  )
}

export { Questions }