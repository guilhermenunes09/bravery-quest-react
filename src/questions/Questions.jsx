import React, { useState, useEffect } from 'react';
import { instance } from '../services/axios';
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
          <div className='text-center'>
            <h1 className='title-no-questions-yet'>
              Land on sight!
            </h1>
            There is no questions yet, but you can be the first!
          </div>
        </>
      }

      {questions && questions.map(function(question, identifier) {
        return (
          <div className='card-sm' onClick={() => handleClick(question.identifier)}>
            <div className='flex items-center mb-2'>
              <div style={{width: '40px', height: '40px'}} className='avatar-template'>
                { question && question.author && question.author.avatar &&
                  <img alt="avatar" src={`${process.env.REACT_APP_LOCALHOST}/${question.author && question.author.avatar}`} />
                }
              </div> 
              <span className='font-semibold text-sm ml-2'>{question.author && question.author.nickname} </span>
              <span className='text-sm text-gray-500'> →  { question.created_at }</span>
            </div>
            <div><span className='link-index' key={identifier}>{question.title}</span></div>
            <div className='text-gray-500 text-sm'>{stripTags(question.question_truncated)}</div>
          </div>
        )
      })}
    </>
  )
}

export { Questions }