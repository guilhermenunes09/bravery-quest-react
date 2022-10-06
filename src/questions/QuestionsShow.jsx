import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { instance } from '../services/QuestionsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuestionsShow() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    instance.get(`questions/${questionId}`)
    .then(res => {
      setQuestion(res.data);
    })

    instance.get(`questions/${questionId}/answers`)
    .then(res => {
      setAnswers(res.data);
    })
  }, []);

  function handleAnswer() {
    console.log('handle answer')
    instance.post(`questions/${questionId}/answers`,
    {
      answers: {
        answer: answer
      }
    })
    .then((res) => {
      setAnswers([...answers, res.data])
    });
  }
  

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
          <span class="tag">#tags</span>
        </div>
      </div>

      <div class="mt-6">
        <ReactQuill theme="snow" value={answer} onChange={setAnswer} className="text-area-question" />
      </div>
      <div onClick={handleAnswer} className='button-answer'>
        Answer
      </div>

      {answers && answers.map(function(answer, id)
        {
          return (
            <div className='card-answer mt-4'>
              <div>{answer.answer}</div>
            </div>
          )
        })
      }
    </>
  )
}

export { QuestionsShow }