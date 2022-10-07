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
      { questions &&  questions.length > 0 &&
        <h1 className='ml-1 mb-4 text-[27px] block'>
          Questions
        </h1>
      }

      { questions && questions.length === 0 &&
        <>
          <div className='card text-center'>
            <h1 className='text-blue-600 ml-1 mb-4 text-[27px] block'>
              Land on sight!
            </h1>
            There is no questions yet, but you can be the first!
          </div>
        </>
      }

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