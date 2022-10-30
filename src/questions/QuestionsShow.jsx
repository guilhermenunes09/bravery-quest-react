import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { instance } from '../services/QuestionsService';

import { TextEditor } from '../components/TextEditor';
import { FaBeer } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

function QuestionsShow() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const warrior = JSON.parse(localStorage.getItem('warrior'));
    if (warrior) {
      console.log('loggedin')
      setIsLoggedIn(true);
    }

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

  function handleLoginToAnswer(e) {
    e.preventDefault();
    navigate('/login/true');
  }
  
  function textData(data) {
    setAnswer(data);
  }

  return (
    <>
      <div className='card'>
        <div className='px-6 py-4'>
          <div className='card-header flex justify-between'>
            <div className='group-1'>
              <div className='font-bold self-start text-xl text-left'>{question && question.title}</div>
              <div className='text-xs text-gray-400 mb-4'>
                By {question && question.author && question.author.nickname} • {question && question.created_at}
              </div>
            </div>
            
            <div className='group-2'>
              <div className="header-menu-card">
                <BsThreeDots className='self-center' />
              </div>
              <div id="dropdown-header">
                <ul>
                  <lli></lli>
                  <lli></lli>
                </ul>
              </div>
            </div>
          </div>
          <p className='text-gray-700 text-base'>
            <div dangerouslySetInnerHTML={{__html: question && question.question}} />
          </p>
        </div>

        <div className='self-end px-6 pt-4'>
          {question.tags && question.tags.map((tag) => {
            return <span className='tag'>{tag}</span>
          })}
        </div>
      </div>

      { isEditorVisible && 
        <>
          { isLoggedIn &&
            <div className="mt-6">
              <TextEditor text={textData} />
            </div>
          }

          <div className='flex items-center justify-end'>
            <div className='mr-2 text-gray-500'>Can you help { question && question.author && question.author.nickname }?</div>
            { isLoggedIn &&
              <button disabled={answer.length > 5 && isLoggedIn ? false : true} onClick={handleAnswer} className='button-answer'>
                Answer
              </button>
            }
            { !isLoggedIn &&
              <button onClick={handleLoginToAnswer} className='button-answer'>
                Log in to answer
              </button>
            }
          </div>
        </>
      }

      <div className='grid'>
        { answers && answers.length > 0 &&
          <h1 className='ml-1 mt-10 text-[27px] block'>
            Answers
          </h1>
        }

        {answers && answers.map(function(__answer, identifier)
          {
            return (
              <div className='card-answer mt-4'>
                <div className='text-xs text-gray-400 mb-4'>
                  By {__answer.author && __answer.author.nickname} • {question.created_at}
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