import React, { useState, useEffect } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate, useSearchParams } from "react-router-dom";

function Questions() {
  const [myObj, setMyObj] = useSearchParams({a: 1})
  const [questions, setQuestions] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    myObj.set("b", 2);
    setMyObj(myObj)
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
    {myObj.a}
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

      {questions && questions.map(function(question, identifier) {
        return (
          <div className='card-sm mb-2' onClick={() => handleClick(question.identifier)}>
            <div><span className='link-index' key={identifier}>{question.title}</span><span className='text-sm text-gray-500'> → {question.author && question.author.nickname} • { question.created_at }</span></div>
            <div className='text-gray-500 text-sm'>{stripTags(question.question_truncated)}</div>
          </div>
        )
      })}
    </>
  )
}

export { Questions }