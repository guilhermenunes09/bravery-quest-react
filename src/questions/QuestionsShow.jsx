import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { instance } from '../services/QuestionsService';

function QuestionsShow() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    instance.get(`questions\\${questionId}`)
    .then(res => {
      setQuestion(res.data)
    })
  }, []);

  return (
    <>
      <div className='card'>
        <div className='px-6 py-4'>
          <div className='font-bold self-start text-xl mb-2 text-center'>{question.title}</div>
          <p className='text-gray-700 text-base'>
            {question.question}
          </p>
        </div>
        <div className='self-end px-6 pt-4 pb-'>
          <span class="tag">#photography</span>
        </div>
      </div>
    </>
  )
}

export { QuestionsShow }