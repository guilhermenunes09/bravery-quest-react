import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { instance } from '../services/QuestionsService';

import { TextEditor } from '../components/TextEditor';

function QuestionsShow() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);

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

  function handleAnswer(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('jetsky_token'));
    instance.post(`questions/${questionId}/answers`,
    {
      answers: {
        answer: answer
      }
    }, {
      headers: {
        authorization: `Bearer ${token.token}`
      }
    })
    .then((res) => {
      setIsEditorVisible(false);
      setAnswers([...answers, res.data])
    });
  }
  
  function textData(data) {
    setAnswer(data);
  }

  return (
    <>
      <div className='card'>
        <div className='px-6 py-4'>
          <div className='font-bold self-start text-xl text-left'>{question.title}</div>
          <div className='text-xs text-gray-400 mb-4'>
            By {question.author && question.author.nickname} • {question.created_at}
          </div>
          
          <p className='text-gray-700 text-base'>
            <div dangerouslySetInnerHTML={{__html: question.question}} />
          </p>
        </div>

        <div className='self-end px-6 pt-4 pb-'>
          <span class="tag">#tags</span>
        </div>
      </div>

      { isEditorVisible &&
        <>
          <div class="mt-6">
            <TextEditor text={textData} />
          </div>
        

          <div className='flex justify-end'>
            <button disabled={answer.length > 5 ? false : true} onClick={handleAnswer} className='button-answer'>
              Answer
            </button>
          </div>
        </>
      }

      <div className='grid'>
        { answers.length > 0 &&
          <h1 className='ml-1 mt-10 text-[27px] block'>
            Answers
          </h1>
        }

        {answers && answers.map(function(__answer, identifier)
          {
            return (
              <div className='card-answer mt-4'>
                <div className='text-xs text-gray-400 mb-4'>
                  By {__answer.author && __answer.author.email} • {question.created_at}
                </div>
                <div kkey={`show-${identifier}`} dangerouslySetInnerHTML={{__html: __answer.answer}} />
              </div>
            )
          })
        }
      </div>


    </>
  )
}

export { QuestionsShow }